// TODO: Fix this when we turn strict mode on.
import { pricingData } from "@/config/subscriptions";
import { stripe } from "@/lib/stripe";
import { UserSubscriptionPlan } from "types";
import { convex } from "./db";
import { api } from "@/convex/_generated/api";

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await convex.query(api.user.get, {
    id: userId as any,
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Check if user is on a paid plan.
  const isPaid =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd ? new Date(user.stripeCurrentPeriodEnd).getTime() + 86_400_000 > Date.now() : false;

  // Find the pricing data corresponding to the user's plan
  const userPlan =
    pricingData.find((plan) => plan.stripeIds.monthly === user.stripePriceId) ||
    pricingData.find((plan) => plan.stripeIds.yearly === user.stripePriceId);

  const plan = isPaid && userPlan ? userPlan : pricingData[0]

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === user.stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === user.stripePriceId
      ? "year"
      : null
    : null;

  let isCanceled = false;
  if (isPaid && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return {
  ...plan,
  ...user,
  stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd ? new Date(user.stripeCurrentPeriodEnd).getTime() : 0,
  isPaid,
  interval,
  isCanceled,
  stripeCustomerId: user.stripeCustomerId ? user.stripeCustomerId : "default value", // replace "default value" with a suitable default
  }
}

import { headers } from "next/headers"
import Stripe from "stripe"

import { env } from "@/env.mjs"
import { stripe } from "@/lib/stripe"
import { convex } from "@/lib/db"
import { api } from "@/convex/_generated/api"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await convex.mutation(api.user.updateStripePayment, {
      userId: session?.metadata?.userId as any,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the price id and set the new period end.
    await convex.mutation(api.user.updateStripePaymentSucceed, {
      userId: session?.metadata?.userId as any,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
    })
  }

  return new Response(null, { status: 200 })
}

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const authUserRoles = v.union(
  v.literal("User"),
  v.literal("Mod"),
  v.literal("Admin"),
  v.literal("Developer"),
);

/**
 * Convex schema
 * 
 * The [user, account, session, verificationToken] tables are modeled from https://authjs.dev/getting-started/adapters#models
 */
export default defineSchema({
  /**
   * * User table
   * @see https://authjs.dev/getting-started/adapters#user
   */
  user: defineTable({
    email: v.string(),
    username: v.optional(v.string()),
    emailVerified: v.optional(v.string()),
    image: v.optional(v.string()),
    role: authUserRoles,
    stripeSubscriptionId: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    stripeCurrentPeriodEnd: v.optional(v.string()),
  }).index("by_user_email", ["email"]),
  /**
   * * Session table
   * 
   * @see https://authjs.dev/getting-started/adapters#session
   */
  session: defineTable({
    userId: v.id("user"),
    expires: v.optional(v.string()),
    sessionToken: v.string(),
  }).index("by_session_token", ["sessionToken"]),
  /**
   * * Account table
   * 
   * @see https://authjs.dev/getting-started/adapters#account
   */
  account: defineTable({
    userId: v.id("user"),
    type: v.string(),
    provider: v.string(),
    providerAccountId: v.string(),
    refreshToken: v.optional(v.string()),
    accessToken: v.optional(v.string()),
    expires_at: v.optional(v.string()),
    token_type: v.optional(v.string()),
    scope: v.optional(v.string()),
    id_token: v.optional(v.string()),
    session_state: v.optional(v.string()),
  }).index("by_provider_account_id", ["providerAccountId"]),
    /**
   * * VerificationToken table
   * 
   * @see https://authjs.dev/getting-started/adapters#verification-token
   */
  verificationToken: defineTable({
    identifier: v.string(),
    token: v.string(),
    expires: v.string(),
  }).index("by_verification_token", ["token"]),
});

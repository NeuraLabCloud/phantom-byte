import { v } from "convex/values";
import { QueryCtx, mutation, query } from "./_generated/server";
import { IConvexError, isAuthenticated } from "./_shared";

/**
 * Stores an authenticated user in the database. This runs whenever the auth state is changed on the client side (by clerk).
 *
 * If the user does not exist, then a new user is created.
 * If they due exist, all clerk metadata is updated and the rest of the user data is saved as is.
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await isAuthenticated(ctx.auth);

    if (!identity.email) {
      throw new IConvexError({
        code: "Unauthorized",
        message: "No email found for identity",
      });
    }

    if (!identity.name) {
      throw new IConvexError({
        code: "Unauthorized",
        message: "No name found for identity",
      });
    }

    const user = await getUserWithId(ctx, identity.subject);

    if (user !== null) {
      if (
        user.username !== identity.nickname ||
        identity.preferredUsername ||
        identity.name ||
        identity.familyName ||
        user.email !== identity.email
      ) {
        const newUser = {
          ...user,
          tokenIdentifier: identity.tokenIdentifier,
          issuer: identity.issuer,
          user_id: identity.subject,
          username: identity.nickname || identity.name,
          email: identity.email,
          emailVerified: identity.emailVerified ?? false,
        };

        await ctx.db.patch(user._id, newUser).catch((err) => {
          console.error(err);
          throw new IConvexError({
            code: "DatabaseError",
            message: err.message,
            severity: "High",
            where: "convex/auth.ts",
          });
        });
      }
      return user._id;
    }

    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("auth", {
      tokenIdentifier: identity.tokenIdentifier,
      issuer: identity.issuer,
      username: identity.nickname || identity.name,
      user_id: identity.subject,
      email: identity.email,
      emailVerified: identity.emailVerified ?? false,
      role: "User",
      tombstoned: false,
      projects: [],
      joined_projects: [],
    });
  },
});

export const get = query({
  args: {
    user_id: v.string(),
  },
  handler: async (ctx, { user_id }) => {
    return await getUserWithId(ctx, user_id);
  },
});

/**
 * Gets a user by there clerk user_id
 * @param ctx The Convex Query Context
 * @param user_id The clerk user_id
 * @returns The user or null if not found
 */
export async function getUserWithId(ctx: QueryCtx, user_id: string) {
  return await ctx.db
    .query("auth")
    .withIndex("by_user_id", (q) => q.eq("user_id", user_id))
    .unique()
    .catch((err) => {
      console.error(err);
      return null;
    });
}

/**
 * Gets a user by there email
 * @param ctx The Convex Query Context
 * @param email The email to search for
 * @returns
 */
export async function getUserWithEmail(ctx: QueryCtx, email: string) {
  return await ctx.db
    .query("auth")
    .filter((q) => q.eq(q.field("email"), email))
    .unique()
    .catch((err) => {
      console.error(err);
      return null;
    });
}

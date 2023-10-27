import { v } from 'convex/values';
import { QueryCtx, mutation, query } from './_generated/server';

/**
 * Stores an authenticated user in the database. This runs whenever the auth state is changed on the client side (by clerk).
 *
 * If the user does not exist, then a new user is created.
 * If they due exist, all clerk metadata is updated and the rest of the user data is saved as is.
 */
export const store = mutation({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Unauthorized');
		}

		if (!identity.email) {
			throw new Error('Unauthorized - No email address');
		}

		if (!identity.name) {
			throw new Error('Unauthorized - no name');
		}

		const user = await getUser(ctx, identity.email!);

		if (user !== null) {
			if (
				user.username !== identity.nickname ||
				identity.name ||
				user.email !== identity.email
			) {
				const newUser = {
					...user,
					tokenIdentifier: identity.tokenIdentifier,
					issuer: identity.issuer,
					username: identity.nickname || identity.name,
					clerkUserId: identity.subject,
					email: identity.email,
					emailVerified: identity.emailVerified ?? false,
				};
				await ctx.db.patch(user._id, newUser);
			}
			return user._id;
		}

		// If it's a new identity, create a new `User`.
		return await ctx.db.insert('auth', {
			tokenIdentifier: identity.tokenIdentifier,
			issuer: identity.issuer,
			username: identity.nickname || identity.name,
			clerkUserId: identity.subject,
			email: identity.email,
			emailVerified: identity.emailVerified ?? false,
		});
	},
});

export const get = query({
	args: {
		email: v.string(),
	},
	handler: async (ctx, args) => {
		return await getUser(ctx, args.email);
	},
});

export async function getUser(ctx: QueryCtx, email: string) {
	return await ctx.db
		.query('auth')
		.filter((q) => q.eq(q.field('email'), email))
		.unique();
}

import { v } from 'convex/values';
import { QueryCtx, mutation, query } from './_generated/server';

export const store = mutation({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not Authenticated');
		}

		if (!identity.email) {
			throw new Error('No email address');
		}

		if (!identity.name) {
			throw new Error('No email address');
		}

		console.log('identity', identity);

		const user = await getUser(ctx, identity.email!);

		const newUser = {
			tokenIdentifier: identity.tokenIdentifier,
			issuer: identity.issuer,
			username: identity.nickname || identity.name,
			clerkUserId: identity.subject,
			email: identity.email,
			emailVerified: identity.emailVerified ?? false,
		};

		if (user !== null) {
			if (
				user.username !== identity.nickname ||
				identity.name ||
				user.email !== identity.email
			) {
				await ctx.db.patch(user._id, newUser);
			}
			return user._id;
		}

		// If it's a new identity, create a new `User`.
		return await ctx.db.insert('users', newUser);
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
		.query('users')
		.filter((q) => q.eq(q.field('email'), email))
		.unique();
}

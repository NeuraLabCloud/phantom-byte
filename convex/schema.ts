import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	/**
	 * Users table
	 *
	 * Most data here comes from the clerk identity.
	 */
	auth: defineTable({
		// Clerk data
		tokenIdentifier: v.string(),
		issuer: v.string(),
		clerkUserId: v.string(),
		username: v.string(),
		email: v.string(),
		emailVerified: v.boolean(),
		// End clerk data
	}),
});
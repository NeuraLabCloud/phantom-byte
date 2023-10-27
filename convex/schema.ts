import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	users: defineTable({
		tokenIdentifier: v.string(),
        issuer: v.string(),
        clerkUserId: v.string(),
        username: v.string(),
        email: v.string(),
        emailVerified: v.boolean(),
	}),
});
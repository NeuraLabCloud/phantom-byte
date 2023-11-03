import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserAndSession = query({
   args: {
    sessionToken: v.string(),
  },
  async handler(ctx, args) {
    const session =  await ctx.db.query("session")
      .withIndex("by_session_token", (q) => q.eq("sessionToken", args.sessionToken))
      .unique()

    if(!session) return null

    const user = await ctx.db.get(session.userId)

    return {
      session,
      user,
    }
  }
})

export const create = mutation({
    args: {
        userId: v.id("user"),
        sessionToken: v.string(),
        expires: v.string(),
    },
    async handler(ctx, args) {
        return await ctx.db.insert("session", {
            userId: args.userId,
            sessionToken: args.sessionToken,
            expires: args.expires,
        })
    },
})

export const updateSession = mutation({
    args: {
        sessionToken: v.string(),
        expires: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const ses = await ctx.db.query("session")
            .withIndex("by_session_token", (q) => q.eq("sessionToken", args.sessionToken))
            .unique()
        if(!ses) return null
        return await ctx.db.patch(ses._id, {
            sessionToken: args.sessionToken,
            expires: args.expires,
        })
    },
})

export const deleteSession = mutation({
    args: {
        sessionToken: v.string(),
    },
    async handler(ctx, args) {
        const ses = await ctx.db.query("session")
            .withIndex("by_session_token", (q) => q.eq("sessionToken", args.sessionToken))
            .unique()
        if(!ses) return null
        return await ctx.db.delete(ses._id)
    },
})
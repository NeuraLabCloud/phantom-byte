import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserByAccount = query({
   args: {
    providerAccountId: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db.query("account").withIndex("by_provider_account_id", (q) => q.eq("providerAccountId", args.providerAccountId)).unique()
  }
})

export const create = mutation({
    args: {
        userId: v.id("user"),
        providerAccountId: v.string(),
        provider: v.string(),
        type: v.string(),
    },
    async handler(ctx, args) {
        return await ctx.db.insert("account", {
            userId: args.userId,
            providerAccountId: args.providerAccountId,
            provider: args.provider,
            type: args.type,
        })
    },
})

export const deleteAccount = mutation({
    args: {
        providerAccountId: v.string(),
    },
    async handler(ctx, args) {
        const acc = await ctx.db.query("account").withIndex("by_provider_account_id", (q) => q.eq("providerAccountId", args.providerAccountId)).unique()
        if(!acc) return null
        return await ctx.db.delete(acc._id)
    },
})
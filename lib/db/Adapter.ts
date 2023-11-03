import { api as API } from "@/convex/_generated/api"
import { Adapter } from "next-auth/adapters"
import { ConvexHttpClient } from "convex/browser"

export function ConvexAdapter(db: ConvexHttpClient, api: typeof API): Adapter {
  return {
    async createUser(user) {
        const id =  await db.mutation(api.user.create, {
            email: user.email,
            emailVerified: user.emailVerified ? user.emailVerified.toISOString() : undefined,
            image: user.image ?? undefined,
            username: user.name ?? undefined,
        })

        if(!id) throw new Error("Failed to create user")

        return {
            ...user,
            // Pass back the id to be used by the session and verificationToken tables
            id
        }
    },
    async getUser(userID) {
      console.log("getUser", userID)
      return db.query(api.user.get, {
        id: userID as any
      }) as any
    },
    async getUserByEmail(email) {
      return db.query(api.user.getByEmail, {
        email
      }) as any
    },
    async getUserByAccount({ providerAccountId, provider }) {
      return await db.query(api.account.getUserByAccount, {
        providerAccountId,
      }) as any
    },
    async updateUser({ id, ...user}) {
      return await db.mutation(api.user.update, {
        id: id as any,
        email: user.email as string,
        emailVerified: user.emailVerified ? user.emailVerified.toISOString() : undefined,
        image: user.image ?? undefined,
        username: user.name ?? undefined,
      }) as any
    },
    async deleteUser(userId) {
      return await db.mutation(api.user.deleteUser, {
        id: userId as any
      }) as any
    },
    async linkAccount(account) {
      return await db.mutation(api.account.create, {
        userId: account.userId as any,
        providerAccountId: account.providerAccountId,
        provider: account.provider,
        type: account.type,
      }) as any
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return await db.mutation(api.account.deleteAccount, {
        providerAccountId,
      }) as any
    },
    async createSession({ sessionToken, userId, expires }) {
      return await db.mutation(api.session.create, {
        sessionToken: sessionToken as any,
        userId: userId as any,
        expires: expires.toISOString(),
      }) as any
    },
    async getSessionAndUser(sessionToken) {
        return await db.query(api.session.getUserAndSession, {
            sessionToken: sessionToken as any
        }) as any
    },
    async updateSession({ sessionToken, ...data }) {
      return await db.mutation(api.session.updateSession, {
        sessionToken,
        expires: data.expires ? data.expires.toISOString() : undefined,
      })
    },
    async deleteSession(sessionToken) {
      return await db.mutation(api.session.deleteSession, {
        sessionToken,
      }) as any
    },
    // ignored as i don't want to use email verification
    async createVerificationToken({ identifier, expires, token }) {
      return null
    },
    // ignored as i don't want to use email verification
    async useVerificationToken({ identifier, token }) {
      return null
    },
  }
}
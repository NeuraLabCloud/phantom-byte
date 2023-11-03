import { NextAuthOptions } from "next-auth"
import { env } from "@/env.mjs"

import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"

import { ConvexAdapter } from "./db/Adapter"
import { convex } from "./db"
import { api } from "@/convex/_generated/api"

export const authOptions: NextAuthOptions = {
  adapter: ConvexAdapter(convex, api),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      // console.log(user)
      // console.log(token)

      //@ts-ignore - this is one the user type 
      const id = user ? user.userId : token.id as any


      const dbUser = await convex.query(api.user.get, { id })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser._id,
        name: dbUser.username,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
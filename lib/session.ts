import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  if(!session) return null
  if(!session.user) return null

  // fix for the name to username type
  const _user = {
    ...session.user,
    username: session.user.name ? session.user.name : undefined,
  }

  // just avoiding type conflict's as this is testing next-auth with convex
  return _user as any
} 

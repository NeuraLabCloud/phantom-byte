import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { userNameSchema } from "@/lib/validations/user"
import { convex } from "@/lib/db"
import { api } from "@/convex/_generated/api"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = userNameSchema.parse(body)

    await convex.mutation(api.user.updateUsername, {
      userId: payload.userId as any,
      username: payload.name,
    })


    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

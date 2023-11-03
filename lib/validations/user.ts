import * as z from "zod"

export const userNameSchema = z.object({
  userId: z.string(),
  name: z.string().min(3).max(32),
})

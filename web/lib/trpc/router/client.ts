import { protectedProcedure, router } from "@/lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";

export const clientRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const { id: user_id } = ctx.session.user!;

    if (!user_id)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No user session found",
      });

    let { data: client, error } = await ctx.supabase
      .from("clients")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message,
      });
    }

    return client;
  }),
});

import { GithubMetadata, GoogleMetadata } from "@/lib/supabase/types";
import { protectedProcedure, router } from "@/lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";

export const metaRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const { provider } = ctx.session.user?.app_metadata!;
    const { user_metadata } = ctx.session.user!;

    switch (provider) {
      case "github":
        return user_metadata as GithubMetadata;
      case "google":
        return user_metadata as GoogleMetadata;
      default:
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid provider",
        });
    }
  }),
});

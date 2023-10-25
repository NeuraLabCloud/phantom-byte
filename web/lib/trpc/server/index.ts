import {protectedProcedure, publicProcedure, router} from "@/lib/trpc/server/trpc"
import {wait} from "@/lib/utils";

import projects from "../../data/mock/projects"

export const appRouter = router({
    getClientProjects: protectedProcedure.query(async({ ctx }) => {
        // todo - fetch this from supabase
        // we will only return the projects that the user is a member.
        // We can get the current user data from the session cookie like so: ctx.session.user.id
        await wait(500)
        return projects
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
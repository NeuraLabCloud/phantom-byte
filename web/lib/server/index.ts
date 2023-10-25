import {protectedProcedure, publicProcedure, router} from './trpc';
import projects from "./projects"
import {wait} from "@/lib/utils";

export const appRouter = router({
    getClientProjects: protectedProcedure.query(async() => {
        await wait(500)
        return projects
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
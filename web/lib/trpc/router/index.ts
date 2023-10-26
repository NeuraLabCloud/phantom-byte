import { router} from "@/lib/trpc/server/trpc"

import projects from "../../data/mock/projects"
import { projectsRouter } from "./projects";
import { clientRouter } from "./client";
import { metaRouter } from "./meta";

export const appRouter = router({
	projects: projectsRouter,
    client: clientRouter,
    meta: metaRouter
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
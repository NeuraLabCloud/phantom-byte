import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/lib/trpc/router"

export const trpc = createTRPCReact<AppRouter>({})
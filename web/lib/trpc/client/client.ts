import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/lib/trpc/server"

export const trpc = createTRPCReact<AppRouter>({})
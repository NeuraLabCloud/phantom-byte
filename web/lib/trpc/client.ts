import { createTRPCReact } from "@trpc/react-query";
import {AppRouter} from "@/lib/server";

export const trpc = createTRPCReact<AppRouter>({})
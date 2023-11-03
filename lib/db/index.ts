import { env } from "@/env.mjs";
import { ConvexHttpClient } from "convex/browser";

export const convex = new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL)
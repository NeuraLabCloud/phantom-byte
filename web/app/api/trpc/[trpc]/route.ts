import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/lib/trpc/router";
import { createContext } from "@/lib/trpc/server/context";

// todo - test edge runtime
// export const runtime = 'edge';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    // todo - try to fix this type error
    //@ts-expect-error
    createContext,
  });

export const GET = handler;
export const POST = handler;

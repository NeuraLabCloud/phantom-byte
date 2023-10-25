import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import {appRouter} from "@/lib/server";
import { createContext } from "@/lib/server/context";

// todo - test edge runtime
// export const runtime = 'edge';

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext
    });

export const GET = handler;
export const POST = handler;
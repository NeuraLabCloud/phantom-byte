import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { headers } from 'next/headers';
import { experimental_createServerActionHandler } from '@trpc/next/app-dir/server';
import {createClient} from "@/lib/supabase/server";
import { Context } from '@/lib/trpc/server/context';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter(opts) {
        const { shape, error } = opts;
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use((opts) => {
    const { session } = opts.ctx;

    if (!session?.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
        });
    }

    return opts.next({ ctx: { session } });
});

export const createAction = experimental_createServerActionHandler(t, {
    async createContext() {
        const client = createClient()

        const { data: { session }} = await client.auth.getSession()

        return {
            session,
            headers: {
                // Pass the cookie header to the API
                cookies: headers().get('cookie') ?? '',
            },
        };
    },
});
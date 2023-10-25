import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { headers } from 'next/headers';
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
export const middleware = t.middleware;

export const protectedProcedure = publicProcedure.use((opts) => {
	const { session } = opts.ctx;

	if (!session?.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
            cause: new Error('No session user found'),
		});
	}

	return opts.next({ ctx: { session } });
});

const isAdmin = middleware(async (opts) => {
	const { ctx } = opts;

	if (!ctx.session.client) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			cause: new Error('No session client found'),
		});
	}

	if (ctx.session.client?.role !== 'Admin') {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			cause: new Error('Missing Admin Permissions'),
		});
	}

	// https://trpc.io/docs/server/middlewares#context-extension
	return opts.next({
		ctx: {
			session: {
				client: ctx.session.client,
			},
		},
	});
});

export const adminProcedure = publicProcedure.use(isAdmin);
import { loggerLink } from '@trpc/client';
import { experimental_nextHttpLink } from '@trpc/next/app-dir/links/nextHttp';
import { experimental_createTRPCNextAppDirServer } from '@trpc/next/app-dir/server';
import { cookies } from 'next/headers';
import superjson from 'superjson';
import { getUrl } from '@/lib/trpc/shared';
import { AppRouter } from '@/lib/trpc/server';

export const trpc = experimental_createTRPCNextAppDirServer<AppRouter>({
	config() {
		return {
			transformer: superjson,
			links: [
				loggerLink({
					enabled: (opts) =>
						(process.env.NODE_ENV === 'development' &&
							typeof window !== 'undefined') ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				experimental_nextHttpLink({
					batch: true,
					url: getUrl(),
					headers() {
						return {
							cookie: cookies().toString(),
							'x-trpc-source': 'rsc-http',
						};
					},
				}),
			],
		};
	},
});

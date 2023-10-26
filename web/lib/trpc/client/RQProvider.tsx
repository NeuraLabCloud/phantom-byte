'use client';

import React, { FC, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { getUrl } from '@/lib/trpc/shared';
import { trpc } from '@/lib/trpc/client/client';

interface ReactQueryProviderProps {
	children: React.ReactNode;
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			transformer: superjson,
			links: [
				httpBatchLink({
					url: getUrl(),
				}),
			],
		})
	);

	return (
		<trpc.Provider
			client={trpcClient}
			queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
};

export default ReactQueryProvider;

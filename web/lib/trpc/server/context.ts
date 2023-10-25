import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { createClient } from '@/lib/supabase/route';

export async function createContext(opts?: FetchCreateContextFnOptions) {
	const client = createClient();

	const { data } = await client.auth.getSession();

	const clientData = await client
		.from('clients')
		.select('*')
		.eq('user_id', data.session?.user?.id ?? '')
		.single();

	const session = {
		...data.session,
		client: clientData.data,
	};

	return {
		session,
		headers: opts && Object.fromEntries(opts.req.headers),
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;

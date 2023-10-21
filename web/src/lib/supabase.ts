import {
	Session,
	SupabaseClientOptions,
	createClient,
} from '@supabase/supabase-js';
import { Database } from './schema';

const projectUrl = import.meta.env.VITE_SUPABASE_AUTH_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

console.log('projectUrl', projectUrl);
console.log('anonKey', anonKey);

if (!projectUrl) {
	throw new Error(
		'VITE_SUPABASE_AUTH_URL is not defined as an environment variable'
	);
}

if (!anonKey) {
	throw new Error(
		'VITE_SUPABASE_ANON_KEY is not defined as an environment variable'
	);
}

const options = {
	db: {
		schema: 'public' as const,
	},
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
	},
} as SupabaseClientOptions<'public'>;

export const supabase = createClient<Database>(projectUrl, anonKey, options);

export async function getSession(): Promise<Session | null> {
	return supabase.auth
		.getSession()
		.then(({ data: { session } }) => session)
		.catch(() => null);
}

export async function isAuthenticated(): Promise<boolean> {
	const session = await getSession();
	return session !== null;
}

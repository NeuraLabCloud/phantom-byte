import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://tasjmfdrczejuqxdnpql.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhc2ptZmRyY3planVxeGRucHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0NzQ3NDQsImV4cCI6MjAxMzA1MDc0NH0.JMjSybMkJvI5tapTKCgpPaFiy5fUvLPbD-P6sh5GZyE'
);

export async function isAuthenticated(): Promise<boolean> {
	return supabase.auth
		.getSession()
		.then((result) => result.data.session !== null)
		.catch(() => false);
}

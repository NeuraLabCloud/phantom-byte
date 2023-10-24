import { createClient } from '@/lib/supabase/route';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	// The `/auth/callback` route is required for the server-side auth flow implemented
	// by the Auth Helpers package. It exchanges an auth code for the user's session.
	// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	if (code) {
		const supabase = createClient();
		await supabase.auth.exchangeCodeForSession(code);
	} else {
		// If no code is present, this is an unexpected state. Redirect to the homepage.
		return NextResponse.redirect('/', { status: 302 });
	}

 	// URL to redirect to after sign in process completes
	const toDashboard = new URL('/dashboard', requestUrl.origin);
	return NextResponse.redirect(toDashboard, { status: 301 });
}

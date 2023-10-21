import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '../lib/types';

export default () => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data: { session } }) => {
				setSession(session);
				setLoading(false);
			})
			.catch(() => {
				setSession(null);
				setLoading(false);
			});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	return { session, loading };
};

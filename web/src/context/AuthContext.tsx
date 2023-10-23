import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getClientAccount, getUser, supabase } from '../lib/supabase';
import { useUserStore } from '../lib/stores/user';
import { Client, Payload } from '../lib/types';
import { useClientAuthStore, useClientStore } from '../lib/stores/client';
import LoadSpinner from '../components/ui/animations/loading/LoadSpinner';

interface Auth {
	isAuthenticated: boolean;
	user: User | null;
	client: Client | null;
}

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState(true);
	const userStore = useUserStore(); // Access the global user store
	const clientStore = useClientStore(); // Access the global client store
	const clientAuthStore = useClientAuthStore(); // Access the global client auth store

	useEffect(() => {
		setLoading(true);

		getUser().then((user) => {
			if (user) {
				clientAuthStore.setAuthenticated('authenticated');
				userStore.setUser(user);
				getClientAccount({ user_id: user.id }).then((client) => {
					if (client) {
						clientStore.setClient(client);
					} else {
						console.error('No client found for user!');
					}
				});
			} else {
				clientAuthStore.setAuthenticated('unauthenticated');
			}
		});

		const realtimeClient = supabase
			.channel('clients')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'clients' },
				(payload) => {
					const data = payload as Payload; // Adding type support to payload
					clientStore.setClient(data.new);
				}
			)
			.subscribe();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			const user = session?.user ?? null;
			if (user) {
				clientAuthStore.setAuthenticated('authenticated');
				userStore.setUser(user); // Set or unset the user in the global store
			} else {
				clientAuthStore.setAuthenticated('unauthenticated');
			}
		});

		setLoading(false);

		return () => {
			subscription.unsubscribe();
			realtimeClient.unsubscribe();
		};
	}, []);

	if (loading) {
		return <LoadSpinner />;
	}

	const authObject = {
		isAuthenticated: clientAuthStore.isAuthenticated(),
		user: userStore.getUser(),
		client: clientStore.getClient(),
	};

	return (
		<AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
	);
};

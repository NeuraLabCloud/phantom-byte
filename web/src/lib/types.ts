export interface IdentityData {
	avatar_url: string;
	email: string;
	email_verified: boolean;
	iss: string;
	preferred_username: string;
	provider_id: string;
	sub: string;
	user_name: string;
}

export interface Identity {
	id: string;
	user_id: string;
	identity_data: IdentityData;
	provider: string;
	last_sign_in_at: string;
	created_at: string;
	updated_at: string;
}

export interface UserMetadata {
	avatar_url: string;
	email: string;
	email_verified: boolean;
	iss: string;
	preferred_username: string;
	provider_id: string;
	sub: string;
	user_name: string;
}

export interface AppMetadata {
	provider: string;
	providers: string[];
}

/**
 * The user object from the github oauth provider.
 */
export interface User {
	id: string;
	aud: string;
	role: string;
	email: string;
	email_confirmed_at: string;
	phone: string;
	confirmed_at: string;
	last_sign_in_at: string;
	app_metadata: AppMetadata;
	user_metadata: UserMetadata;
	identities: Identity[];
	created_at: string;
	updated_at: string;
}

/**
 * The User session object returned by the Supabase Auth API.
 */
export interface Session {
	access_token: string;
	token_type: string;
	expires_in: number;
	expires_at: number;
	refresh_token: string;
	user: User;
}

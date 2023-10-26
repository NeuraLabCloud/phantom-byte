import {Database} from "@/lib/supabase/database-types";

type _Project = Database["public"]["Tables"]["projects"]["Row"];
export type Projects = _Project[];

export type Client = Database["public"]["Tables"]["clients"]["Row"];
export type Clients = Client[];

/** UserMeta Taken from consoling the object */
export type GoogleMetadata = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  provider_id: string;
  sub: string;
};

/** UserMeta Taken from consoling the object */
export type GithubMetadata = {
	avatar_url: string;
	email: string;
	email_verified: boolean;
	iss: string;
	preferred_username?: string;
	provider_id: string;
	sub: string;
	user_name: string;
};
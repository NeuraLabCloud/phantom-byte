import { Database } from "./schema";

export type { Session, User } from "@supabase/supabase-js";

export type Client = Database["public"]["Tables"]["clients"]["Row"];

/** Payload returned on the `clients` table realtime subscriptions */
export type Payload = {
  schema: string;
  table: string;
  commit_timestamp: string;
  eventType: string;
  new: Client;
  old: {
    id: number;
  };
  errors: null | any;
};

export type AuthState = 'authenticated' | 'unauthenticated' | 'loading';
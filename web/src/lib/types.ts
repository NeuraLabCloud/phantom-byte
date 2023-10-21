import { Database } from "./schema";

export type { Session, User } from "@supabase/supabase-js"

export type Client = Database['public']['Tables']['clients']['Row'];
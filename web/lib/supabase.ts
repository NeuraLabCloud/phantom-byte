import {
  PostgrestError,
  createClient,
  SupabaseClientOptions,
} from "@supabase/supabase-js";
import { Client } from "./types";
import {Database} from "@/lib/schema";

const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL as
  | string
  | undefined;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

const options = {
  db: {
    schema: "public" as const,
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
} as SupabaseClientOptions<"public">;

if (!projectUrl) {
  throw new Error(
      "NEXT_PUBLIC_SUPABASE_AUTH_URL is not defined as an environment variable",
  );
}

if (!anonKey) {
  throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined as an environment variable",
  );
}

export const supabaseConfig = {
  supabaseUrl: projectUrl,
  supabaseKey: anonKey,
  supabaseOptions: options
}

/** The client used in client side react components */
export const supabaseClient = createClient<Database>(projectUrl, anonKey, options);


/**
 * Updates the client's username
 * @param user_id The user_id of the client
 * @returns "success" if the update was successful, "error" otherwise
 */
export async function updateClientUsername(
  user_id: string,
  newUsername: string,
) {
  try {
    let { data: client, error } = await supabaseClient
      .from("clients")
      .update({ username: newUsername })
      .eq("user_id", user_id)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating client username:", error);
      return {
        result: "error",
        pg_error: createCleanError(error),
        client: null,
      };
    }

    if (!client) {
      console.error("No client found with the specified user_id");
      return {
        result: "error",
        pg_error: null,
        client: null,
      };
    }

    return {
      result: "success",
      pg_error: null,
      client,
    };
  } catch (error) {
    console.error(
      "An error occurred while updating the client username:",
      error,
    );
    return {
      result: "error",
      pg_error: null,
      client: null,
    };
  }
}

function createCleanError(error: PostgrestError) {
  return `Error ${error.code}: ${error.message}`;
}

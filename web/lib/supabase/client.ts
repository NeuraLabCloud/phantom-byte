import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database-types";
import { useCallback } from "react";

export const createClient = () =>
  useCallback(
    () =>
      createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      ),
    [],
  )();

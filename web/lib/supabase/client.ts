import { Database } from "./database-types";
import { useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createClient = () =>
  useCallback(
    () =>
      createClientComponentClient<Database>(
        {
          supabaseKey,
          supabaseUrl
        }
      ),
    [],
  )();

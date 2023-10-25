import 'server-only';

import { cookies } from "next/headers";
import { Database } from "./database-types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const createClient = () => {
  return createServerComponentClient<Database>({ cookies })
};
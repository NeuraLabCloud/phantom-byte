import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./database-types";

export const createClient = () => {
  const cookieStore = cookies();
  return createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
};

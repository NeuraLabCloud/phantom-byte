import { createClient } from "@/lib/supabase/route";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Session } from "@supabase/auth-helpers-nextjs";

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null;
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    supabase: createClient(),
  };
}

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContext(opts?: CreateNextContextOptions) {
  const contextInner = await createContextInner();

  const { data } = await contextInner.supabase.auth.getSession();

  const clientData = await contextInner.supabase
    .from("clients")
    .select("*")
    .eq("user_id", data.session?.user?.id ?? "")
    .single();

  const session = {
    ...data.session,
    client: clientData.data,
  };

  return {
    ...contextInner,
    session,
    headers: opts?.req.headers,
    cookies: opts?.req.cookies,
    req: opts?.req,
    res: opts?.res,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

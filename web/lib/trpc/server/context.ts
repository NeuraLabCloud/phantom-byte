import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import {createClient} from "@/lib/supabase/route";

export async function createContext(opts?: FetchCreateContextFnOptions) {
    const client = createClient()

    const { data: { session }} = await client.auth.getSession()

    return {
        session,
        headers: opts && Object.fromEntries(opts.req.headers),
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
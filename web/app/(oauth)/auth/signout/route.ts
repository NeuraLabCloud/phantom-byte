import { NextRequest, NextResponse } from 'next/server'
import {supabaseConfig} from "@/lib/supabase";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
export async function POST(req: NextRequest) {
    const cookieStore = cookies()

    const supabaseRouteClient = createRouteHandlerClient({ cookies: () => cookieStore }, {
        supabaseUrl: supabaseConfig.supabaseUrl,
        supabaseKey: supabaseConfig.supabaseUrl,
        options: supabaseConfig.supabaseOptions
    })

    // Check if we have a user
    const {
        data: { session },
    } = await supabaseRouteClient.auth.getSession()

    if (session) {
        await supabaseRouteClient.auth.signOut()
    }

    return NextResponse.redirect(new URL('/', req.url), {
        status: 302,
    })
}
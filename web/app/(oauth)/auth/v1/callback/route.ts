import { NextRequest, NextResponse } from 'next/server'
import {supabaseConfig} from "@/lib/supabase";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
    const cookieStore = cookies()

    const supabaseRouteClient = createRouteHandlerClient({ cookies: () => cookieStore }, {
        supabaseUrl: supabaseConfig.supabaseUrl,
        supabaseKey: supabaseConfig.supabaseUrl,
        options: supabaseConfig.supabaseOptions
    })

    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')

    if (code) {
        await supabaseRouteClient.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(new URL('/dashboard', req.url))
}
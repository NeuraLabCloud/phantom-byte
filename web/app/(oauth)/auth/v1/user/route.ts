import { type NextRequest, NextResponse } from 'next/server'
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

    const { data: { user }} = await supabaseRouteClient.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'No user found' }, { status: 404 })
    }

    return NextResponse.json(user, { status: 200 })
}
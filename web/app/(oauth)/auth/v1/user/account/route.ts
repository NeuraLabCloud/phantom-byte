import { NextRequest, NextResponse } from 'next/server'
import {supabaseConfig} from "@/lib/supabase";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import {Database} from "@/lib/schema";

type Body = {
    user_id: string | null
}

export async function POST(req: NextRequest) {
    const cookieStore = cookies()

    const supabaseRouteClient = createRouteHandlerClient<Database>({ cookies: () => cookieStore }, {
        supabaseUrl: supabaseConfig.supabaseUrl,
        supabaseKey: supabaseConfig.supabaseUrl,
        options: supabaseConfig.supabaseOptions
    })

    const body = await req.json() as Body

    if(!body.user_id) {
        return NextResponse.json({ error: "Missing user_id in fequest body!"}, { status: 400 })
    }

    let { data: client, error } = await supabaseRouteClient.from("clients")
        .select("*")
        .eq("user_id", body.user_id)
        .single();

    if (error) {
        console.error("Error fetching client:", error);
        return NextResponse.json({ error: "Error fetching client!"}, { status: 500 })
    }

    if (!client) {
        console.log("No client found with the specified user_id");
        return NextResponse.json({ error: "No client found with the specified user_id!"}, { status: 404 })
    }

    return NextResponse.json(client, { status: 200 })
}
import { NextRequest, NextResponse } from 'next/server'
import {supabaseConfig} from "@/lib/supabase";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import {
    PostgrestError,
} from "@supabase/supabase-js";

type Body = {
    user_id: string | null
    newUsername: string | null
}

export async function POST(req: NextRequest) {
    const cookieStore = cookies()

    const supabaseRouteClient = createRouteHandlerClient({ cookies: () => cookieStore }, {
        supabaseUrl: supabaseConfig.supabaseUrl,
        supabaseKey: supabaseConfig.supabaseUrl,
        options: supabaseConfig.supabaseOptions
    })

    const body = await req.json() as Body

    if(!body.user_id) {
        return NextResponse.json({ error: "No user_id provided in POST request" }, { status: 400 })
    } else if(!body.newUsername) {
        return NextResponse.json({ error: "No newUsername provided in POST request" }, { status: 400 })
    }

    let { data: updatedClient, error } = await supabaseRouteClient
        .from("clients")
        .update({ username: body.newUsername })
        .eq("user_id", body.user_id)
        .select("*")
        .single();

    if (error) {
        console.error("Error updating client username:", error);
        return NextResponse.json({ error: createCleanError(error) }, { status: 500 })
    }

    if(!updatedClient) {
        console.error("No client found with that user_id");
        return NextResponse.json({ error: "No client found with that user_id" }, { status: 404 })
    }

    return NextResponse.json(updatedClient)
}

function createCleanError(error: PostgrestError) {
    return `Error ${error.code}: ${error.message}`;
}
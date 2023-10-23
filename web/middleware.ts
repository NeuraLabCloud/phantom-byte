import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import {supabaseConfig} from "@/lib/supabase";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    const supabase = createMiddlewareClient({ req, res }, {
        supabaseUrl: supabaseConfig.supabaseUrl,
        supabaseKey: supabaseConfig.supabaseUrl
    })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // if user is signed in and the current path is / redirect the user to /dashboard
    if (user && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // if user is not signed in and the current path is /dashboard redirect the user to /login
    if (!user && req.nextUrl.pathname === '/dashboard') {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return res
}

export const config = {
    matcher: [
        '/logout',
        '/dashboard:path*',
        "/auth:path*"
    ]
}
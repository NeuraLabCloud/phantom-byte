import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  if (!session && path === "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url), {
      status: 302,
      statusText: "Unauthorized",
    });
  }
  if (!session && path === "/logout") {
    return NextResponse.redirect(new URL("/login", req.url), {
      statusText: "Unauthorized",
      status: 302,
    });
  }
  if (session && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url), {
      statusText: "Authorized",
      status: 302,
    });
  }

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url), {
      statusText: "Unauthorized",
      status: 302,
    });
  }

  return res;
}

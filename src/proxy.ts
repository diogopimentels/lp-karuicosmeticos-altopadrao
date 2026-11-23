import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "karui_preview";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Flip to false and redeploy to reopen the public site.
const MAINTENANCE_ENABLED = true;

// Secret for ?preview=... — keep private; change anytime.
const BYPASS_TOKEN = "karui-bypass-a7f3e9c2";

function hasValidBypass(request: NextRequest) {
  const preview = request.nextUrl.searchParams.get("preview");
  if (preview === BYPASS_TOKEN) return true;

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  return cookie === BYPASS_TOKEN;
}

function setBypassCookie(response: NextResponse, secure: boolean) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: BYPASS_TOKEN,
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export function proxy(request: NextRequest) {
  if (!MAINTENANCE_ENABLED) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const secure = request.nextUrl.protocol === "https:";
  const previewParam = request.nextUrl.searchParams.get("preview");

  // First visit with ?preview=TOKEN → set cookie and strip the query.
  if (previewParam === BYPASS_TOKEN) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("preview");
    const response = NextResponse.redirect(cleanUrl);
    setBypassCookie(response, secure);
    return response;
  }

  if (hasValidBypass(request)) {
    const response = NextResponse.next();
    setBypassCookie(response, secure);
    return response;
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Serviço temporariamente indisponível." },
      { status: 503 },
    );
  }

  if (pathname === "/manutencao") {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/manutencao", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

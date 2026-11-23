import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "karui_preview";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function isMaintenanceOn() {
  return process.env.MAINTENANCE === "true";
}

function getBypassToken() {
  return process.env.MAINTENANCE_BYPASS_TOKEN ?? "";
}

function hasValidBypass(request: NextRequest, token: string) {
  if (!token) return false;

  const preview = request.nextUrl.searchParams.get("preview");
  if (preview === token) return true;

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  return cookie === token;
}

function setBypassCookie(response: NextResponse, token: string, secure: boolean) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export function proxy(request: NextRequest) {
  if (!isMaintenanceOn()) {
    return NextResponse.next();
  }

  const token = getBypassToken();
  const { pathname } = request.nextUrl;
  const secure = request.nextUrl.protocol === "https:";
  const previewParam = request.nextUrl.searchParams.get("preview");

  // First visit with ?preview=TOKEN → set cookie and strip the query.
  if (token && previewParam === token) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("preview");
    const response = NextResponse.redirect(cleanUrl);
    setBypassCookie(response, token, secure);
    return response;
  }

  if (hasValidBypass(request, token)) {
    const response = NextResponse.next();
    // Refresh cookie while browsing with a valid session.
    if (token) {
      setBypassCookie(response, token, secure);
    }
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

import { NextRequest, NextResponse } from "next/server";

const adminCookieName = "kash_admin_unlocked";

function getAdminUnlockKey() {
  return process.env.ADMIN_UNLOCK_KEY?.trim() || process.env.ADMIN_PASSCODE?.trim();
}

export function middleware(request: NextRequest) {
  const unlockKey = getAdminUnlockKey();
  const url = request.nextUrl;
  const providedKey = url.searchParams.get("admin_key");

  if (providedKey && unlockKey && providedKey === unlockKey) {
    const cleanUrl = url.clone();
    cleanUrl.searchParams.delete("admin_key");

    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(adminCookieName, "true", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    return response;
  }

  if (url.pathname.startsWith("/admin")) {
    const isUnlocked = request.cookies.get(adminCookieName)?.value === "true";

    if (!isUnlocked) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"]
};

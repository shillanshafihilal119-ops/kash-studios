import { NextResponse } from "next/server";

const adminCookieName = "kash_admin_unlocked";

function getAdminUnlockKey() {
  return process.env.ADMIN_UNLOCK_KEY?.trim() || process.env.ADMIN_PASSCODE?.trim();
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const providedKey = url.searchParams.get("admin_key") ?? url.searchParams.get("key");
  const unlockKey = getAdminUnlockKey();
  const redirectUrl = new URL("/", url.origin);

  if (!providedKey || !unlockKey || providedKey !== unlockKey) {
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(adminCookieName, "true", {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return response;
}

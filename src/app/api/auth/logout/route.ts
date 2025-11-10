// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.headers.append(
    "Set-Cookie",
    `isLoggedIn=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`
  );
  return res;
}

// app/api/auth/me/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const isLoggedIn = cookie.includes("isLoggedIn=true");
  return NextResponse.json({ isLoggedIn });
}

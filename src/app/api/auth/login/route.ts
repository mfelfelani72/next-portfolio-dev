// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body ?? {};

    const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER;
    const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS;

    if (!ADMIN_USER || !ADMIN_PASS) {
      return NextResponse.json(
        { success: false, error: "Server not configured" },
        { status: 500 }
      );
    }

    const userMatch = username === ADMIN_USER;
    const passMatch = password === ADMIN_PASS;

    if (userMatch && passMatch) {
      const res = NextResponse.json({ success: true });

      // Set HttpOnly cookie — در پروداکشن Secure را اضافه کن
      res.headers.append(
        "Set-Cookie",
        `isLoggedIn=true; HttpOnly; Path=/; SameSite=Strict; Max-Age=${
          60 * 60 * 24
        }`
      );

      return res;
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

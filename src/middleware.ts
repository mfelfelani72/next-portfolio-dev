/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-19
 * @Description: Middleware with language and device detection
 *
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Functions

import { detectDeviceFromUA } from "./libs/detectDeviceFromUA";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // ----------------------------
  // Handle language
  // ----------------------------
  const cookieLang = request.cookies.get("app_lang")?.value;
  let defaultLang = "en";

  if (cookieLang) {
    try {
      const parsed = JSON.parse(cookieLang);
      if (parsed.state?.lang) {
        defaultLang = parsed.state.lang;
      }
    } catch (error) {
      defaultLang = cookieLang;
    }
  }

  if (url.pathname === "/") {
    url.pathname = `/${defaultLang}/${process.env.NEXT_PUBLIC_BASE_ROUTE}`;
    return NextResponse.redirect(url);
  }
  // ----------------------------
  // Handle device detection
  // ----------------------------
  const ua = request.headers.get("user-agent") || "";
  const device = detectDeviceFromUA(ua);

  const existingDevice = request.cookies.get("device-type")?.value;

  if (!existingDevice) {
    const res = NextResponse.next();
    res.cookies.set({
      name: "device-type",
      value: device,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
      sameSite: "lax",
    });

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path*"],
};

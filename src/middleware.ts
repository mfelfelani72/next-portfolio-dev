/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:13:08
 * @Description:
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};

/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 08:09:32
 * @Description:
 */

import type { ReactNode } from "react";
import { cookies } from "next/headers";

// Fonts

import { satoshi, yekanBakh } from "@/libs/fonts";

// CSS

import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("app_theme")?.value || "light";

  return (
    <html
      className={`${yekanBakh.variable} ${satoshi.variable} ${
        cookieTheme === "dark" ? "dark" : ""
      }`}
    >
      <body>{children}</body>
    </html>
  );
}

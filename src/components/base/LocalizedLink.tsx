/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-05 09:56:22
 * @Description: LocalizedLink با TypeScript
 */

"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { UrlObject } from "url";

// Interfaces

interface LocalizedLinkProps extends Omit<LinkProps, "href"> {
  href: string | UrlObject;
  children: ReactNode;
  locale?: string;
}

export default function LocalizedLink({
  href,
  children,
  locale,
  ...props
}: LocalizedLinkProps) {
  const pathname = usePathname();

  const currentLang = locale || pathname.split("/")[1] || "en";

  const isExternal =
    typeof href === "string" && /^(https?:\/\/|mailto:|tel:|#)/.test(href);

  if (isExternal) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  let normalizedHref: string | UrlObject;

  if (typeof href === "string") {
    const hasLangPrefix =
      href.startsWith(`/${currentLang}/`) || href === `/${currentLang}`;
    normalizedHref = hasLangPrefix
      ? href
      : `/${currentLang}${href.startsWith("/") ? href : `/${href}`}`;
  } else {
    normalizedHref = {
      ...href,
      pathname: href.pathname
        ? href.pathname.startsWith(`/${currentLang}/`) ||
          href.pathname === `/${currentLang}`
          ? href.pathname
          : `/${currentLang}${
              href.pathname.startsWith("/")
                ? href.pathname
                : `/${href.pathname}`
            }`
        : undefined,
    };
  }

  return (
    <Link rel="preload" scroll={false} href={normalizedHref} {...props}>
      {children}
    </Link>
  );
}

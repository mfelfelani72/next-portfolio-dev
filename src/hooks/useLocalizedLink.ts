import { usePathname } from "next/navigation";
import { UrlObject } from "url";

export function useLocalizedLink() {
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";

  const normalizeUrl = (href: string | UrlObject): string | UrlObject => {
    if (
      typeof href === "string" &&
      /^(https?:\/\/|mailto:|tel:|#)/.test(href)
    ) {
      return href;
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

    return normalizedHref;
  };

  return normalizeUrl;
}

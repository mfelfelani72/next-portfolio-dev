/* @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-08 15:28:13
 * @Description: Shared metadata generator for all pages
 */

import type { Metadata } from "next";

// Constants

import type { Lang } from "@/configs/language";

// Functions

import { getDictionary } from "@/locale";
import { getLocale, getSchemaLocale } from "@/configs/language";

// Interfaces

import { BaseMeta, PageMeta } from "@/Interfaces/meta";

// ---------- Config ----------
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
const SITE_NAME = "AimoonHub";

// ---------- Helper Functions ----------
function generateCanonicalUrl(lang: Lang, path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${SITE_URL}/${lang}${cleanPath ? `/${cleanPath}` : ""}`;
}

function generatePageTitle(pageTitle: string, baseTitle: string): string {
  return pageTitle === baseTitle ? baseTitle : `${pageTitle} | ${baseTitle}`;
}

function combineKeywords(
  baseKeywords: string[] = [],
  pageKeywords: string[] = []
): string[] {
  return [...new Set([...baseKeywords, ...pageKeywords])];
}

// ---------- Main Metadata Generator ----------
export async function generatePageMetadata(
  lang: Lang = "en",
  pageKey?: string,
  customMeta?: Partial<PageMeta>
): Promise<Metadata> {
  const dict = await getDictionary(lang);
  const baseMeta = dict.meta as BaseMeta;
  const pageMetaCandidate = pageKey
    ? dict[`meta_${pageKey}` as keyof typeof dict]
    : null;
  const pageMeta = (pageMetaCandidate as PageMeta) || baseMeta;
  const finalMeta: PageMeta = customMeta
    ? { ...pageMeta, ...customMeta }
    : pageMeta;

  const pageTitle = generatePageTitle(finalMeta.title, baseMeta.title);
  const canonicalUrl =
    finalMeta.canonicalUrl || generateCanonicalUrl(lang, pageKey);

  return {
    title: pageTitle,
    description: finalMeta.description,
    keywords: combineKeywords(baseMeta.keywords, finalMeta.keywords).join(", "),

    openGraph: {
      title: pageTitle,
      description: finalMeta.description,
      url: canonicalUrl,
      siteName: baseMeta.title,
      type: "website",
      images: [
        {
          url: `/images/og/og-${lang}${pageKey ? `-${pageKey}` : ""}.jpg`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: getLocale(lang),
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: finalMeta.description,
      images: [
        `/images/twitter/twitter-${lang}${pageKey ? `-${pageKey}` : ""}.jpg`,
      ],
    },

    robots: finalMeta.robots || { index: true, follow: true },

    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: generateCanonicalUrl("en", pageKey),
        fa: generateCanonicalUrl("fa", pageKey),
      },
    },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

// ---------- Schema Generators ----------
export function generateWebsiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: getSchemaLocale(lang),
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/logo.png`,
    inLanguage: getSchemaLocale(lang),
    sameAs: [
      "https://twitter.com/aimoonhub",
      "https://linkedin.com/company/aimoonhub",
    ],
  };
}

export function generateArticleSchema(
  lang: Lang,
  article: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    authorName: string;
    authorUrl?: string;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.authorName,
      ...(article.authorUrl && { url: article.authorUrl }),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo/logo.png`,
      },
    },
    inLanguage: getSchemaLocale(lang),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

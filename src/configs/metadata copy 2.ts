/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 14:26:56
 * @Description:
 */
import type { Metadata } from "next";
import type { Lang } from "@/configs/language";
import { getDictionary } from "@/locale";

// تایپ دقیق meta
interface Meta {
  title: string;
  description: string;
  keywords?: string[];
}

// تایپ دیکشنری
type OpenGraphMeta = {
  title: string;
  description: string;
  url?: string;
  locale?: string;
  siteName?: string;
  type?: string;
  images?: { url: string; width: number; height: number; alt: string }[];
};

type TwitterMeta = {
  card?: string;
  title?: string;
  description?: string;
  images?: string[];
};

export type Dictionary = Record<
  string,
  | string
  | {
      title: string;
      description: string;
      keywords?: string[];
      openGraph?: OpenGraphMeta;
      twitter?: TwitterMeta;
    }
>;

// Utility برای بررسی meta
function isValidMeta(meta: unknown): meta is Meta {
  return (
    !!meta &&
    typeof meta === "object" &&
    "title" in meta &&
    "description" in meta
  );
}

// ---------- Site-wide Metadata ----------
export async function generateSiteMetadata(
  lang: Lang = "en"
): Promise<Metadata> {
  const dict: Dictionary = await getDictionary(lang);

  const metaCandidate = dict.meta;
  const meta: Meta = isValidMeta(metaCandidate)
    ? metaCandidate
    : {
        title: "AimoonHub",
        description: "Welcome to AimoonHub",
        keywords: ["aimoonhub"],
      };

  return {
    metadataBase: new URL("https://example.com"),
    title: { default: meta.title, template: `%s | ${meta.title}` },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://example.com/${lang}`,
      languages: {
        en: "https://example.com/en",
        fa: "https://example.com/fa",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://example.com/${lang}`,
      locale: lang === "fa" ? "fa_IR" : "en_US",
      siteName: meta.title,
      type: "website",
      images: [
        { url: `/og-${lang}.jpg`, width: 1200, height: 630, alt: meta.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`/twitter-${lang}.jpg`],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  };
}

// ---------- Page-specific Metadata ----------
export async function generatePageMetadata(
  lang: Lang = "en",
  pageKey: string
): Promise<Metadata> {
  const dict: Dictionary = await getDictionary(lang);

  const metaCandidate = dict[`meta_${pageKey}` as keyof typeof dict];
  const meta: Meta = isValidMeta(metaCandidate)
    ? metaCandidate
    : {
        title: "AimoonHub",
        description: "Welcome to AimoonHub",
        keywords: ["aimoonhub"],
      };

  return {
    title: { default: meta.title, template: meta.title },
    description: meta.description,
    keywords: meta.keywords || [],
  };
}

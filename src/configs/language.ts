/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-04 07:17:02
 * @Description:
 */

export const languages = {
  en: { 
    dir: "ltr",
    locale: "en_US",
    schemaLocale: "en-US"
  },
  fa: { 
    dir: "rtl", 
    locale: "fa_IR",
    schemaLocale: "fa-IR"
  },
} as const;

export type Lang = keyof typeof languages;

// Helper functions
export function getLocale(lang: Lang): string {
  return languages[lang].locale;
}

export function getSchemaLocale(lang: Lang): string {
  return languages[lang].schemaLocale;
}

export function getDirection(lang: Lang): "ltr" | "rtl" {
  return languages[lang].dir;
}
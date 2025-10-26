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
    schemaLocale: "en-US",
    name: "English",
    flag: "🇺🇸",
    nativeName: "English",
  },
  de: {
    dir: "ltr",
    locale: "de",
    schemaLocale: "de-DE",
    name: "German",
    flag: "🇩🇪",
    nativeName: "Deutsch",
  },
  fa: {
    dir: "rtl",
    locale: "fa_IR",
    schemaLocale: "fa-IR",
    name: "Persian",
    flag: "🇮🇷",
    nativeName: "فارسی",
  },
} as const;

export type Lang = keyof typeof languages;

export function getLocale(lang: Lang): string {
  return languages[lang].locale;
}

export function getSchemaLocale(lang: Lang): string {
  return languages[lang].schemaLocale;
}

export function getDirection(lang: Lang): "ltr" | "rtl" {
  return languages[lang].dir;
}

export function getName(lang: Lang): string {
  return languages[lang].name;
}

export function getNativeName(lang: Lang): string {
  return languages[lang].nativeName;
}

export function getFlag(lang: Lang): string {
  return languages[lang].flag;
}

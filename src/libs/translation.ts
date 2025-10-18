/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 09:36:46
 * @Description:
 */
// utils/translation.ts
import { getDictionary } from "@/locale";
import { type Lang } from "@/configs/language";

export function createTranslator(lang: Lang) {
  const translations = getDictionary(lang);

  function t(key: string, fallback?: string) {
    if (!translations) {
      console.warn("Translations not loaded for language:", lang);
      return fallback ?? key;
    }

    const keys = key.split(".");
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return fallback ?? key;
      }
    }

    return typeof value === "string" ? value : fallback ?? key;
  }

  return { t, lang };
}

/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-04 14:27:32
 * @Description:
 */
"use client";

// Functions

import { getDictionary } from "@/locale";

// Interfaces

import { type Lang } from "@/configs/language";

// Zustand

import { useLangStore } from "@/LangStore";

export function useTranslation() {
  const { lang } = useLangStore();
  const translations = getDictionary(lang as Lang);

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

/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-05 12:41:14
 * @Description: Lang store with JSON cookie
 */

import { create } from "zustand";
import { isBrowser, setCookie, getCookie } from "@/libs/cookieUtils";
import { persist, createJSONStorage } from "zustand/middleware";

// Constants

import { languages, Lang } from "@/configs/language";

// Interfaces

import { LangState } from "@/Interfaces/dictionary";

// Functions

const isValidLang = (lang: unknown): lang is Lang => {
  return typeof lang === "string" && lang in languages;
};

const cookieStorage = {
  getItem: (name: string): string | null => {
    if (!isBrowser()) return null;
    try {
      return localStorage.getItem(name);
    } catch (error) {
      console.error("Error reading from storage:", error);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(name, value);
    } catch (error) {
      console.error("Error writing to storage:", error);
    }
  },
  removeItem: (name: string): void => {
    if (!isBrowser()) return;
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error("Error removing from storage:", error);
    }
  },
};

export const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      lang: "en",
      dir: languages.en.dir,
      locale: languages.en.locale,
      schemaLocale: languages.en.schemaLocale,
      name: languages.en.name,
      flag: languages.en.flag,
      nativeName: languages.en.nativeName,
      isInitialized: false,
      refreshKey: 0,

      setLang: (newLang: Lang) => {
        const langData = languages[newLang];

        set({
          lang: newLang,
          dir: langData.dir,
          locale: langData.locale,
          schemaLocale: langData.schemaLocale,
          name: langData.name,
          flag: langData.flag,
          nativeName: langData.nativeName,
          refreshKey: get().refreshKey + 1,
        });

        if (isBrowser()) {
          const langCookieValue = JSON.stringify({
            state: {
              lang: newLang,
              dir: langData.dir,
            },
          });

          setCookie("app_lang", langCookieValue);
        }
      },

      triggerRefresh: () => {
        set({ refreshKey: get().refreshKey + 1 });
      },

      initializeLang: (langFromUrl?: string) => {
        const { isInitialized } = get();
        if (isInitialized) return;

        let finalLang: Lang = "en";
        let finalDir: "ltr" | "rtl" = languages.en.dir;

        if (langFromUrl && isValidLang(langFromUrl)) {
          finalLang = langFromUrl;
          finalDir = languages[finalLang].dir;
        } else if (isBrowser()) {
          const savedLangCookie = getCookie("app_lang");
          if (savedLangCookie) {
            try {
              const parsed = JSON.parse(savedLangCookie);
              if (parsed.state) {
                if (parsed.state.lang && isValidLang(parsed.state.lang)) {
                  finalLang = parsed.state.lang;
                }
                if (
                  parsed.state.dir &&
                  (parsed.state.dir === "ltr" || parsed.state.dir === "rtl")
                ) {
                  finalDir = parsed.state.dir;
                }
              }
            } catch (error) {
              console.error("Error parsing lang cookie:", error);
            }
          }
        }

        set({
          lang: finalLang,
          dir: finalDir,
          locale: languages[finalLang].locale,
          schemaLocale: languages[finalLang].schemaLocale,
          name: languages[finalLang].name,
          flag: languages[finalLang].flag,
          nativeName: languages[finalLang].nativeName,
          isInitialized: true,
        });
      },
    }),
    {
      name: "lang-store",
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        lang: state.lang,
        dir: state.dir,
        locale: state.locale,
        schemaLocale: state.schemaLocale,
        name: state.name,
        flag: state.flag,
        nativeName: state.nativeName,
        isInitialized: state.isInitialized,
        refreshKey: state.refreshKey,
      }),
    }
  )
);

export const initializeLang = (langFromUrl?: string): void => {
  if (isBrowser()) {
    useLangStore.getState().initializeLang(langFromUrl);
  }
};

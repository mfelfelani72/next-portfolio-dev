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
      isInitialized: false,
      refreshKey: 0, // 🔹 اضافه شد

      setLang: (newLang: Lang) => {
        const dir = languages[newLang].dir;

        set({
          lang: newLang,
          dir,
          refreshKey: get().refreshKey + 1, // 🔹 trigger برای کامپوننت‌ها
        });

        if (isBrowser()) {
          const langCookieValue = JSON.stringify({
            state: {
              lang: newLang,
              dir: dir,
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
        isInitialized: state.isInitialized,
        refreshKey: state.refreshKey, // 🔹 اضافه شد
      }),
    }
  )
);

export const initializeLang = (langFromUrl?: string): void => {
  if (isBrowser()) {
    useLangStore.getState().initializeLang(langFromUrl);
  }
};

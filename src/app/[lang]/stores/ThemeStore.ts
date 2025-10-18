/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-05 12:56:04
 * @Description: Theme store with JSON cookie
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Interfaces

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  isInitialized: boolean;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

// Functions

import { isBrowser, setCookie, getCookie } from "@/libs/cookieUtils";

const themeStorage = {
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

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      isInitialized: false,

      setTheme: (newTheme: Theme) => {
        set({ theme: newTheme });

        if (isBrowser()) {
          const themeCookieValue = JSON.stringify({
            state: {
              theme: newTheme,
            },
          });

          setCookie("app_theme", themeCookieValue);
        }
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === "light" ? "dark" : "light";

        set({ theme: newTheme });

        if (isBrowser()) {
          const themeCookieValue = JSON.stringify({
            state: {
              theme: newTheme,
            },
          });

          setCookie("app_theme", themeCookieValue);
        }
      },

      initializeTheme: () => {
        const { isInitialized } = get();
        if (isInitialized) return;

        if (isBrowser()) {
          const savedThemeCookie = getCookie("app_theme");
          if (savedThemeCookie) {
            try {
              const parsed = JSON.parse(savedThemeCookie);
              if (
                parsed.state?.theme &&
                (parsed.state.theme === "light" ||
                  parsed.state.theme === "dark")
              ) {
                set({ theme: parsed.state.theme });
              }
            } catch (error) {
              console.error("Error parsing theme cookie:", error);
            }
          }
        }

        set({ isInitialized: true });
      },
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => themeStorage),
      partialize: (state) => ({
        theme: state.theme,
        isInitialized: state.isInitialized,
      }),
    }
  )
);

export const initializeTheme = (): void => {
  if (isBrowser()) {
    useThemeStore.getState().initializeTheme();
  }
};

"use client";

import { useEffect } from "react";

// Zustand

import { useThemeStore } from "@/app/[lang]/stores/ThemeStore";
import { useLangStore } from "@/app/[lang]/stores/LangStore";

export default function ThemeSwitcher() {
  // States and Consts
  const { theme, setTheme, initializeTheme } = useThemeStore();
  const { dir } = useLangStore();
  const isDark = theme === "dark";
  const isRTL = dir === "rtl";

  // Functions

  const handleThemeChange = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
  };

  const getTranslateX = () => {
    if (isRTL) {
      return isDark ? "-translate-x-8" : "translate-x-0";
    } else {
      return isDark ? "translate-x-8" : "translate-x-0";
    }
  };

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <button
        onClick={handleThemeChange}
        className={`
          relative w-16 h-8 rounded-full p-1 transition-all duration-300 cursor-pointer
          ${
            isDark
              ? "bg-gradient-to-r from-gray-600 to-blue-800"
              : "bg-gradient-to-r from-yellow-400 to-orange-500"
          }
          shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-600
        `}
        aria-label={isDark ? "تغییر به تم روشن" : "تغییر به تم تاریک"}
      >
        <div
          className={`
            absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300
            ${getTranslateX()}
            flex items-center justify-center
          `}
        >
          {isDark ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-500"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </div>

        <div className="flex justify-between items-center px-1 h-full">
          <div
            className={`transition-opacity duration-300 ${
              !isDark ? "opacity-100" : "opacity-40"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-600"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </div>

          <div
            className={`transition-opacity duration-300 ${
              isDark ? "opacity-100" : "opacity-40"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-300"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

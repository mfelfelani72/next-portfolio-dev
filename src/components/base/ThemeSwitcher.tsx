/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-05 11:15:31
 * @Description:
 */

"use client";
import { useEffect } from "react";

// Zustand

import { useThemeStore } from "@/app/[lang]/stores/ThemeStore";

export default function ThemeSwitcher() {
  // Hooks

  const { theme, setTheme, initializeTheme } = useThemeStore();

  // Functions

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    initializeTheme();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const switchTheme = (newTheme: "light" | "dark") => {
    if (newTheme !== theme) setTheme(newTheme);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchTheme("light")}
        disabled={theme === "light"}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        Light
      </button>

      <button
        onClick={() => switchTheme("dark")}
        disabled={theme === "dark"}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        Dark
      </button>
    </div>
  );
}

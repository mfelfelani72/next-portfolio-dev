"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Components

import { SearchCommand } from "@/components/ui/admin/header/search-command";
import LanguageSwitcher from "@/components/base/LanguageSwitcher";
import ThemeSwitcher from "@/components/base/ThemeSwitcher";
import { UserMenu } from "@/components/ui/admin/header/user-menu";
import { Button } from "@/components/ui/app/button";
import { Input } from "@/components/ui/app/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/app/dropdown-menu";

// Zustand

import { useAppAdminStore } from "@/app/[lang]/stores/admin/AppAdminStore";

export function HeaderContent() {
  const { t } = useTranslation();
  // States

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { isSidebarCollapsed, toggleSidebar, toggleMobileSidebar } =
    useAppAdminStore();

  // Functions

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 rounded-t-lg mx-1 mt-2 shadow-[5px_-50px_30px_rgba(0,0,0,0.10)] dark:shadow-[5px_-50px_30px_rgba(0,0,0,0.30)] sticky top-0 z-50 transition-colors duration-200">
        <div className="w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileSidebar}
                className="md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 h-9 w-9 sm:h-10 sm:w-10 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hidden md:flex bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 h-9 w-9 lg:h-10 lg:w-10 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {isSidebarCollapsed ? (
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                )}
              </Button>

              <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer whitespace-nowrap">
                MF
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 rtl:space-x-reverse">
              <div className="relative">
                <div className="hidden sm:block">
                  <Input
                    type="text"
                    placeholder={t("search_ck")}
                    className="ltr:pl-4 rtl:pr-4 cursor-pointer w-48 md:w-56 lg:w-64 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-sm"
                    onClick={() => setIsSearchOpen(true)}
                    readOnly
                  />
                  <div className="absolute ltr:right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white dark:bg-gray-700 px-1.5 font-mono text-[10px] font-medium text-gray-500 dark:text-gray-300">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="sm:hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </Button>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 rtl:space-x-reverse">
                <div className="hidden sm:block">
                  <ThemeSwitcher />
                </div>

                <div className="hidden sm:block">
                  <LanguageSwitcher />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors h-9 w-9"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                </Button>

                <div className="sm:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors h-9 w-9"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-58 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                      <div
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ThemeSwitcher />
                        <span className="text-sm whitespace-nowrap pl-1 text-gray-700 dark:text-gray-300">
                          {t("change_theme")}
                        </span>
                      </div>

                      <div
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LanguageSwitcher />
                        <span className="text-sm whitespace-nowrap pl-1 text-gray-700 dark:text-gray-300">
                          {t("change_lang")}
                        </span>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="relative">
                  <UserMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchCommand
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

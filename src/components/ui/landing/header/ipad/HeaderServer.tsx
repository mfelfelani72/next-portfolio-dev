import React from "react";

// Components

import LanguageSwitcher from "@/components/base/LanguageSwitcher";
import ThemeSwitcher from "@/components/base/ThemeSwitcher";

import Links from "@/components/ui/landing/header/Links";
import UserInfo from "@/components/ui/landing/header/UserInfo";

// Interfaces

import { type Lang } from "@/configs/language";

interface HeaderServerProps {
  params?: { lang: Lang };
}

const HeaderServer = ({ params = { lang: "en" } }: HeaderServerProps) => {
  return (
    <>
      <header className="fixed inset-x-0 top-4 z-40 px-4">
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-3 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-md bg-white shadow-sm"
              popoverTarget="mobile-menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="#111827"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              id="mobile-menu"
              popover="auto"
              className="fixed inset-x-4 top-20 w-[calc(100%-32px)] mt-4 rounded-2xl"
            >
              <div className="w-full mx-auto bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
                <div className="pb-2 border-b border-neutral-300">
                  <UserInfo modal={false} />
                </div>

                <nav className="flex flex-col w-full pt-4 gap-2">
                  <Links params={{ lang: params.lang as Lang }} />
                </nav>
              </div>
            </div>
          </div>

          <h1 className="font-medium">SkyTeach</h1>
          <div className="flex gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderServer;

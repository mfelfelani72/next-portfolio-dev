import React from "react";

// Components

import Links from "@/components/ui/landing/header/Links";
import LanguageSwitcher from "@/components/base/LanguageSwitcher";
import ThemeSwitcher from "@/components/base/ThemeSwitcher";
import UserInfo from "../UserInfo";

// Interfaces

import { type Lang } from "@/configs/language";

interface HeaderServerProps {
  params?: { lang: Lang };
}

const HeaderServer = ({ params = { lang: "en" } }: HeaderServerProps) => {
  return (
    <>
      <header className="fixed inset-x-0 top-4 z-40 px-4 w-full inline-flex justify-center">
        <div className="w-full max-w-5xl bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm rounded-2xl p-3 px-6 flex items-center justify-between shadow-sm border border-gray-200 dark:border-gray-600">
          <UserInfo modal={true} />
          <nav className="flex items-center gap-2">
            <Links params={{ lang: params.lang }} />
          </nav>
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
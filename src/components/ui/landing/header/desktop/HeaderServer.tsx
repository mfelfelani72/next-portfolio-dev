import React from "react";

// Components
import Links from "@/components/ui/landing/header/Links";
import LanguageSwitcher from "@/components/base/LanguageSwitcher";
import UserInfo from "../UserInfo";

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
          <UserInfo />
          <nav className="flex items-center gap-2">
            <Links params={{ lang: params.lang }} />
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
};

export default HeaderServer;
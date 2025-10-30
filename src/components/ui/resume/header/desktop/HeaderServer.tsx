import React from "react";

import Links from "../Links";

import { createTranslator } from "@/libs/translation";

import { type Lang } from "@/configs/language";
import LanguageSwitcher from "@/components/base/LanguageSwitcher";

const HeaderServer = ({ params = { lang: "en" } }) => {
  const { t } = createTranslator(params.lang as Lang);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-40 px-4">
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-3 px-6 flex items-center justify-between shadow-sm">
          <nav className="flex items-center gap-2">
            <Links params={{ lang: params.lang as Lang }} />
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
};

export default HeaderServer;

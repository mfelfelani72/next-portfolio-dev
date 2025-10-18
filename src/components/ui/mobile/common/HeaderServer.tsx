/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 10:58:45
 * @Description:
 */
/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-10-18
 * @Description: Server-side Header component with direction from languages helper
 */

import React from "react";
import LocalizedLink from "@/components/base/LocalizedLink";
import { createTranslator } from "@/libs/translation";
import { getDirection, type Lang } from "@/configs/language";

interface HeaderServerProps {
  params?: { lang?: Lang }; // optional props with default
}

export default async function HeaderServer({
  params = { lang: "en" },
}: HeaderServerProps) {
  const resolvedParams = await params;

  const dir = getDirection(resolvedParams.lang as Lang);

  const { t } = createTranslator(resolvedParams.lang as Lang);

  return (
    <header
      className="fixed top-0 inset-x-0 z-[510] bg-white px-[5.625rem] py-14 select-none"
      dir={dir}
    >
      <h1 className="hidden">{t("aimoonhub")}</h1>
      <div className="flex flex-row justify-between items-end">
        <nav className="flex flex-row items-end">
          <div className="flex flex-col items-center">Logo</div>

          <ul
            className={`flex flex-row gap-12 ${
              dir === "rtl" ? "pr-11" : "pl-11"
            } text-base font-medium cursor-pointer`}
          >
            <li className="text-primary-400">{t("home")}</li>
            <li>{t("about_us")}</li>

            <li></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

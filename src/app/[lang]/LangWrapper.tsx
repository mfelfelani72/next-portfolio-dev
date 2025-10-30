"use client";

import { useEffect, useState } from "react";
import AppLoading from "@/app/[lang]/AppLoading";
import { useLangStore } from "@/LangStore";
import { LangWrapperProps } from "@/Interfaces/global";

export default function LangWrapper({
  langFromUrl,
  children,
}: LangWrapperProps) {
  const { lang, dir, setLang, triggerRefresh } = useLangStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    if (lang !== langFromUrl) {
      setLang(langFromUrl);
      triggerRefresh?.();
    }
    setLoaded(true);
  }, [langFromUrl, setLang, lang, triggerRefresh]);

  if (!loaded) return null;

  return (
    <div lang={lang} dir={dir} className="bg-gradient-to-br from-sky-50 to-slate-50">
      <AppLoading>{children}</AppLoading>
    </div>
  );
}

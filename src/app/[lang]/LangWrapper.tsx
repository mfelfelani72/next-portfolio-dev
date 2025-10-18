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
    // اگر lang تغییر کرد، trigger برای refresh دیتا
    if (lang !== langFromUrl) {
      setLang(langFromUrl);
      triggerRefresh?.();
    }
    setLoaded(true);
  }, [langFromUrl, setLang, lang, triggerRefresh]);

  if (!loaded) return null;

  return (
    <div lang={lang} dir={dir} className="min-h-screen">
      <AppLoading>{children}</AppLoading>
    </div>
  );
}

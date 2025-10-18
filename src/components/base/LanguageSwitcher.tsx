"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Interfaces

import { languages, type Lang } from "@/configs/language";

// Hooks

import { useTransition } from "react";

// Zustand

import { useLangStore } from "@/LangStore";

export default function LanguageSwitcher() {
  // Hooks

  const { lang } = useLangStore();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const getNewPath = (newLang: Lang) => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && segments[0] in languages) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }

    return "/" + segments.join("/");
  };

  return (
    <div className="flex gap-2">
      {Object.keys(languages).map((l) => {
        const newPath = getNewPath(l as Lang);
        const isActive = l === lang;

        return (
          <Link
            key={l}
            href={newPath}
            replace
            scroll={false}
            className={`px-3 py-1 border rounded transition-all duration-300 ease-in-out transform ${
              isActive
                ? "opacity-50 cursor-default scale-95"
                : "hover:opacity-80 hover:scale-105"
            } ${isPending && !isActive ? "opacity-70 scale-100" : ""}`}
            onClick={(e) => {
              if (isActive) {
                e.preventDefault();
              } else {
                startTransition(() => {});
              }
            }}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

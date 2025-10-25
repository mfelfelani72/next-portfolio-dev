"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useState, useRef } from "react";
import {
  languages,
  type Lang,
  getNativeName,
  getFlag,
} from "@/configs/language";
import { useLangStore } from "@/LangStore";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLangStore();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const getNewPath = (newLang: Lang) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0] in languages) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    return "/" + segments.join("/");
  };

  const handleChange = (newLang: Lang) => {
    if (newLang === lang) return;
    const newPath = getNewPath(newLang);
    setLang(newLang);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
      >
        <span className="text-lg">{getFlag(lang)}</span>
        <span className="hidden 3xl:block font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {getNativeName(lang)}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute z-50 top-full left-0 mt-2 min-w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-2">
            {Object.keys(languages).map((l) => {
              const currentLang = l as Lang;
              const isActive = currentLang === lang;
              return (
                <button
                  key={currentLang}
                  onClick={() => handleChange(currentLang)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-500"
                      : "cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getFlag(currentLang)}</span>
                    <span className="font-medium whitespace-nowrap">
                      {getNativeName(currentLang)}
                    </span>
                  </div>
                  
                  {/* آیکون تأیید برای زبان انتخاب شده */}
                  {isActive && (
                    <svg 
                      className="w-4 h-4 text-blue-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
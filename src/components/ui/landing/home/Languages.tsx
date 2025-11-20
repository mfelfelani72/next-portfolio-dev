"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Functions

import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";

// Hooks

import { useFetch } from "@/libs/api/useFetch";

// Interfaces

import { Language } from "@/Interfaces/portfolio";

interface LanguagesResponse {
  languages: Language[];
}

export default function Languages() {
  // States and Refs

  const [manualFetch, setManualFetch] = useState(true);
  const [languages, setLanguages] = useState<Language[]>([]);

  const hasFetchedFromAPI = useRef(false);

  // Hooks

  const { t } = useTranslation();

  const { mutate } = useFetch<LanguagesResponse>(
    "get",
    { endPoint: `/api/resume/languages` },
    {
      manual: manualFetch,
      onSuccess: async (res) => {
        if (!res) return;

        if (!hasFetchedFromAPI.current) {
          await saveResumeSection("resume", "languages", res, "global");
          hasFetchedFromAPI.current = true;
          console.log("Languages saved to IndexedDB (global)");
        }

        setLanguages(res.languages || []);
        setManualFetch(true);
        document.cookie = `resume_refresh_languages=; path=/; max-age=0`;
      },
    }
  );

  // Functions

  const getProficiencyColor = (percent: number) => {
    if (percent >= 90) return "from-green-500 to-emerald-600";
    if (percent >= 70) return "from-blue-500 to-cyan-600";
    if (percent >= 50) return "from-yellow-500 to-amber-600";
    return "from-gray-500 to-gray-600";
  };

  const getProficiencyLevel = (percent: number) => {
    if (percent >= 90) return "native";
    if (percent >= 70) return "fluent";
    if (percent >= 50) return "intermediate";
    return "basic";
  };

  useEffect(() => {
    let mounted = true;

    const loadLanguages = async () => {
      try {
        await indexDB.connect();
        const languagesKey = `resume:languages:global`;
        const cachedLanguages = await indexDB.read<{ data: LanguagesResponse }>(
          "resume",
          languagesKey
        );

        if (cachedLanguages.success && cachedLanguages.data?.data) {
          if (mounted) setLanguages(cachedLanguages.data.data.languages || []);
        } else {
          setManualFetch(false);
          mutate();
        }

        const languagesCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_languages=`))
          ?.split("=")[1];

        if (languagesCookie === "1") {
          setManualFetch(false);
          mutate();
        }
      } catch (error) {
        console.error("IndexedDB error:", error);
        setManualFetch(false);
        mutate();
      }
    };

    loadLanguages();
    return () => {
      mounted = false;
    };
  }, [mutate, manualFetch]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("languages")}
        </h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
          {languages.length} {t("count_languages")}
        </div>
      </div>

      {languages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {languages.map((language) => (
            <div
              key={language.name}
              className="group p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
            >
              {/* Language Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">
                      {language.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {language.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t(getProficiencyLevel(language.percent))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {language.percent}%
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {language.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${getProficiencyColor(
                      language.percent
                    )} transition-all duration-1000 ease-out group-hover:scale-[1.02] transform`}
                    style={{ width: `${language.percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{t("beginner")}</span>
                  <span>{t("advanced")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

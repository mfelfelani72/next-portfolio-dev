"use client";
import React, { useEffect, useRef, useState } from "react";
import { Language } from "@/Interfaces/portfolio";
import { useFetch } from "@/libs/api/useFetch";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";

interface LanguagesResponse {
  languages: Language[];
}

export default function Languages() {
  const [manualFetch, setManualFetch] = useState(true);
  const [languages, setLanguages] = useState<Language[]>([]);
  const hasFetchedFromAPI = useRef(false);

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
          console.log("Using cached global Languages");
          if (mounted) setLanguages(cachedLanguages.data.data.languages || []);
        } else {
          console.log("No cached Languages → fetching from API...");
          setManualFetch(false);
          mutate();
        }

        const languagesCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_languages=`))
          ?.split("=")[1];

        if (languagesCookie === "1") {
          console.log("Languages cookie changed → refetching...");
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
    languages.length > 0 && (
      <section
        id="languages"
        className="mt-8 bg-white rounded-xl p-4 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-teal-700">Languages</h2>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
          {languages.map((l) => (
            <div key={l.name} className="p-3 bg-slate-50 rounded-md text-sm">
              <div className="font-semibold">{l.name}</div>
              <div className="text-xs text-gray-500">{l.level}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full bg-indigo-400"
                  style={{ width: `${l.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  );
}

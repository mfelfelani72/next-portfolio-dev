"use client";

import { useEffect, useRef, useState } from "react";

// Functions

import { indexDB } from "@/libs/cache/indexDB/IndexDB";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";

// Interfaces

import { ResumeData } from "@/Interfaces/portfolio";
import { type Lang } from "@/configs/language";

// Hooks

import { useFetch } from "@/libs/api/useFetch";

// Zustand

import { useUserStore } from "@/app/[lang]/stores/UserStore";

const GetUserInfo = ({ params }: { params: { lang: Lang } }) => {
  // States ans Consts and Refs

  const [manual, setManual] = useState(true);
  const setUser = useUserStore((state) => state.setUser);

  const lang = params.lang;

  const hasFetchedFromAPI = useRef(false);

  // Functions

  const { mutate } = useFetch<ResumeData>(
    "get",
    { endPoint: `/api/resume/${lang}/profile/` },
    {
      manual: manual,
      onSuccess: async (res) => {
        if (!res) {
          console.error("API request failed");
          return;
        }

        if (!hasFetchedFromAPI.current) {
          await saveResumeSection("resume", "profile", res, lang);
          hasFetchedFromAPI.current = true;
          console.log("Updated IndexedDB from API");
        }

        setUser(res);
      },
    }
  );

  useEffect(() => {
    const checkCacheFirst = async () => {
      try {
        await indexDB.connect();

        const key = `resume:profile:${lang}`;
        const cached = await indexDB.read<{ data: ResumeData }>("resume", key);

        if (cached.success && cached.data?.data) {
          console.log("Using cached profile for:", lang);
          setManual(true);
          setUser(cached.data.data);
        } else {
          console.log("No cached data for", lang, "fetching from API");
          mutate();
          setManual(false);
        }
      } catch (error) {
        console.error("IndexedDB error:", error);
        mutate();
        setManual(false);
      }
    };

    checkCacheFirst();
  }, [lang, setUser, mutate, manual]);

  return null;
};

export default GetUserInfo;

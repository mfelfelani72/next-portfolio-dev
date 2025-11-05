"use client";

import { useEffect } from "react";

// Functions

import { indexDB } from "@/libs/cache/indexDB/IndexDB";

// Interfaces

import { ResumeData } from "@/Interfaces/portfolio";
import { type Lang } from "@/configs/language";

interface CachedResume {
  id: string;
  language: string;
  data: ResumeData;
  timestamp: number;
}

// Hooks

import { useFetch } from "@/libs/api/useFetch";

// Zustand

import { useUserStore } from "@/app/[lang]/stores/UserStore";

const GetUserInfo = ({ params }: { params: { lang: Lang } }) => {
  // States

  const setUser = useUserStore((state) => state.setUser);

  // Functions

  const { mutate } = useFetch<ResumeData>(
    "post",
    {
      endPoint: `/api/resume/${params.lang}`,
      body: {},
    },
    {
      onSuccess: async (res) => {
        if (!res) {
          console.error("API request failed");
          return;
        }

        const result = await indexDB.update<CachedResume>("user", params.lang, {
          id: params.lang,
          language: params.lang,
          data: res,
          timestamp: Date.now(),
        });

        if (result.success) {
          setUser(res);
        } else {
          console.error("Error in IndexedDB:", result.error);
        }
      },
    }
  );

  useEffect(() => {
    const checkCacheFirst = async () => {
      try {
        await indexDB.connect();

        const cached = await indexDB.read<CachedResume>("user", params.lang);

        if (cached.success && cached.data) {
          setUser(cached.data.data);
          console.log("Using cached data for language:", params.lang);
        } else {
          console.log(
            "No cached data for language:",
            params.lang,
            "fetching from API"
          );
          mutate();
        }
      } catch (error) {
        console.error("Error checking cache:", error);
        mutate();
      }
    };

    checkCacheFirst();
  }, [mutate, params.lang]);
  return null;
};

export default GetUserInfo;

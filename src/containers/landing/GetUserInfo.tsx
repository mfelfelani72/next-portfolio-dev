"use client";

import React, { useEffect, useState } from "react";
import { ResumeData } from "@/Interfaces/portfolio";
import { useFetch } from "@/libs/api/useFetch";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";
import { type Lang } from "@/configs/language";

interface CachedResume {
  id: string;
  language: string;
  data: ResumeData;
  timestamp: number;
}

const GetUserInfo = ({ params }: { params: { lang: Lang } }) => {
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
          console.log("Data saved/updated in IndexedDB");
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

    // همیشه وقتی زبان عوض شد چک کن
    checkCacheFirst();
  }, [mutate, params.lang]);
  return null;
};

export default GetUserInfo;

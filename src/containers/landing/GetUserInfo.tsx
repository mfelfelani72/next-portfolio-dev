"use client";

import { useEffect, useRef, useState } from "react";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { ResumeData } from "@/Interfaces/portfolio";
import { type Lang } from "@/configs/language";
import { useFetch } from "@/libs/api/useFetch";
import { useUserStore } from "@/app/[lang]/stores/UserStore";

const GetUserInfo = ({ params }: { params: { lang: Lang } }) => {
  const setUser = useUserStore((state) => state.setUser);
  const lang = params.lang;

  const hasFetchedFromAPI = useRef(false);

  const [manualFetch, setManualFetch] = useState(true);

  const { mutate } = useFetch<ResumeData>(
    "get",
    { endPoint: `/api/resume/${lang}/profile/` },
    {
      manual: manualFetch,
      onSuccess: async (res) => {
        if (!res) return;

        if (!hasFetchedFromAPI.current) {
          await saveResumeSection("resume", "profile", res, lang);
          hasFetchedFromAPI.current = true;
          console.log("💾 IndexedDB updated from API");
        }

        setUser(res);

        document.cookie = `resume_refresh_${lang}=; path=/; max-age=0`;
      },
    }
  );

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        await indexDB.connect();

        const key = `resume:profile:${lang}`;
        const cached = await indexDB.read<{ data: ResumeData }>("resume", key);

        if (cached.success && cached.data?.data) {
          console.log("✅ Using cached profile for:", lang);
          setUser(cached.data.data);
          setManualFetch(true); // بعد از استفاده از کش، fetch دستی
        } else {
          console.log("🌀 No cache → fetching from API...");
          setManualFetch(false); // fetch خودکار
          mutate();
        }

        // بررسی کوکی مخصوص زبان
        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_${lang}=`))
          ?.split("=")[1];

        if (cookie === "1") {
          console.log("🔄 Cookie changed → refetching...");
          setManualFetch(false); // fetch خودکار
          mutate();
        }
      } catch (error) {
        console.error("💥 IndexedDB error:", error);
        setManualFetch(false);
        mutate();
      }
    };

    loadUserProfile();
  }, [lang, setUser, mutate, manualFetch]);

  return null;
};

export default GetUserInfo;

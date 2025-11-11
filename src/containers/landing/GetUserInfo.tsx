"use client";

import { useEffect, useRef, useState } from "react";

// Functions

import { indexDB } from "@/libs/cache/indexDB/IndexDB";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { useFetch } from "@/libs/api/useFetch";

// Interfaces

import { ResumeData, AvatarData } from "@/Interfaces/portfolio";
import { type Lang } from "@/configs/language";

// Zustand

import { useUserStore } from "@/app/[lang]/stores/UserStore";

const GetUserInfo = ({ params }: { params: { lang: Lang } }) => {
  // States and Consts and Refs

  const [manualFetch, setManualFetch] = useState(true);
  const [manualFetchAvatar, setManualFetchAvatar] = useState(true);

  const hasFetchedFromAPI = useRef(false);
  const hasFetchedAvatarFromAPI = useRef(false);

  const lang = params.lang;

  // Functions

  // Get Avatar from Redis

  const { data: avatarData, mutate: mutateAvatar } = useFetch<AvatarData>(
    "get",
    { endPoint: `/api/resume/avatar/` },
    {
      manual: manualFetchAvatar,
      onSuccess: async (res) => {
        if (!res) return;
        if (!hasFetchedAvatarFromAPI.current) {
          await saveResumeSection("resume", "avatar", res, "global");
          hasFetchedAvatarFromAPI.current = true;
          console.log("Avatar saved to IndexedDB");
        }

        const currentUser = useUserStore.getState().user;

        if (currentUser) {
          useUserStore.getState().setUser({ ...currentUser, avatar: res.url });
        } else {
          useUserStore.getState().setUser({ avatar: res.url } as any);
        }
        setManualFetchAvatar(true);
        document.cookie = `resume_refresh_avatar=; path=/; max-age=0`;
      },
    }
  );

  // Get Profile from Redis

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
          console.log("IndexedDB updated from API");
        }

        const currentUser = useUserStore.getState().user;
        const currentAvatar = currentUser ? currentUser.avatar : "";
        useUserStore.getState().setUser({ ...res, avatar: currentAvatar });
        document.cookie = `resume_refresh_${lang}=; path=/; max-age=0`;
        setManualFetch(true);
      },
    }
  );

  // Functions

  useEffect(() => {
    let mounted = true;

    const loadUserData = async () => {
      try {
        await indexDB.connect();

        // ---- avatar ----
        const avatarKey = `resume:avatar:global`;
        const cachedAvatar = await indexDB.read<{ data: AvatarData }>(
          "resume",
          avatarKey
        );

        let avatarUrl = "";
        if (cachedAvatar.success && cachedAvatar.data?.data) {
          console.log("Using cached avatar");
          avatarUrl = cachedAvatar.data.data.url;

          const currentUser = useUserStore.getState().user;
          if (mounted) {
            if (currentUser) {
              useUserStore
                .getState()
                .setUser({ ...currentUser, avatar: avatarUrl });
            } else {
              useUserStore.getState().setUser({ avatar: avatarUrl } as any);
            }
          }
        } else {
          console.log("No avatar cache → fetching from API...");
          setManualFetchAvatar(false);
          mutateAvatar();
        }

        // ---- profile ----
        const profileKey = `resume:profile:${lang}`;
        const cachedProfile = await indexDB.read<{ data: ResumeData }>(
          "resume",
          profileKey
        );

        if (cachedProfile.success && cachedProfile.data?.data) {
          console.log("Using cached profile for:", lang);

          if (mounted) {
            useUserStore
              .getState()
              .setUser({ ...cachedProfile.data.data, avatar: avatarUrl });
          }
        } else {
          console.log("No profile cache → fetching from API...");
          setManualFetch(false);
          mutate();
        }

        const profileCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_${lang}=`))
          ?.split("=")[1];

        if (profileCookie === "1") {
          console.log("Profile cookie changed → refetching...");
          setManualFetch(false);
          mutate();
        }

        const avatarCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_avatar=`))
          ?.split("=")[1];

        if (avatarCookie === "1") {
          console.log("Avatar cookie changed → refetching...");
          setManualFetchAvatar(false);
          mutateAvatar();
        }
      } catch (error) {
        console.error("IndexedDB error:", error);
        mutate();
        mutateAvatar();
        setManualFetchAvatar(false);
        setManualFetch(false);
      }
    };

    loadUserData();

    return () => {
      mounted = false;
    };
  }, [lang, mutate, mutateAvatar, manualFetch, manualFetchAvatar]);

  return null;
};

export default GetUserInfo;

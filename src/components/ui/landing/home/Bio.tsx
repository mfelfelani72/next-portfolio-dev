"use client";

import React from "react";

// Interfaces
import { Lang } from "@/configs/language";

// Zustand
import { useUserStore } from "@/app/[lang]/stores/UserStore";

const Bio = ({ params }: { params: { lang: Lang } }) => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {user && (
        <div className="md:col-span-2 bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center font-bold text-white text-xl shrink-0">
              {user?.name?.includes(" ")
                ? user.name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase())
                    .join("")
                : user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-[200px]">
              <h1 className="text-xl font-bold">{user.name}</h1>
              <div className="text-xs text-indigo-600 font-medium mt-1">
                {user.title}
              </div>
              <p className="mt-2 text-sm text-gray-700">{user.summary}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bio;

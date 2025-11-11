"use client";

import React from "react";

// Interfaces

import { Lang } from "@/configs/language";

// Zustand

import { useUserStore } from "@/app/[lang]/stores/UserStore";

const Bio = ({ params }: { params: { lang: Lang } }) => {
  // States

  const user = useUserStore((state) => state.user);
  return (
    <>
      {user && (
        <div className="md:col-span-2 bg-white rounded-xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center font-bold text-white">
            {user?.name?.includes(" ")
              ? user.name
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase())
                  .join("")
              : user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <div className="text-xs text-indigo-600 font-medium mt-1">
            {user.title}
          </div>
          <p className="mt-3 text-sm text-gray-700">{user.summary}</p>
        </div>
      )}
    </>
  );
};

export default Bio;

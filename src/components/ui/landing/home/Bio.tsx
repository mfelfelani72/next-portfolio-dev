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
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-lg">
                {user?.name?.includes(" ")
                  ? user.name
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase())
                      .join("")
                  : user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                  {user.title}
                </div>
              </div>

              {/* Summary */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {user.summary}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bio;
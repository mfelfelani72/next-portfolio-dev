"use client";

// Zustand

import { useUserStore } from "@/app/[lang]/stores/UserStore";

const UserInfo = () => {
  // States

  const user = useUserStore((state) => state.user);

  return (
    <>
      {user && (
        <>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center font-bold text-white">
              {user?.name
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase())
                .join("")}
            </div>
            <div>
              <div className="text-sm font-semibold">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.title}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserInfo;

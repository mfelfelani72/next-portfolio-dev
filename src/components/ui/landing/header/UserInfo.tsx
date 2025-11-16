"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

// Zustand

import { useUserStore } from "@/app/[lang]/stores/UserStore";

const UserInfo = () => {
  // States

  const user = useUserStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* User Info */}
      <div className="flex items-center gap-3">
        {user.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => setIsModalOpen(true)}
          />
        )}
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {user.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user.title}
          </div>
        </div>
      </div>

      {/* Modal Portal */}
      {isModalOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative bg-white/20 dark:bg-gray-900/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 max-w-[90vw] max-h-[90vh] animate-scaleFade flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Avatar */}
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-68 h-68 rounded-xl object-cover mb-4 border border-white/20 shadow-md"
                />
              )}

              {/* User Info */}
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user.name}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {user.title}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Javascript */}

      <style jsx>{`
        @keyframes scaleFade {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleFade {
          animation: scaleFade 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default UserInfo;

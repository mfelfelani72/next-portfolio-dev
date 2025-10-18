/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:35:57
 * @Description:
 */

"use client";
import React from "react";

interface NavProps {
  active: string;
  onToggleMobile: () => void;
  contactEmail: string;
  name: string;
  title: string;
}

export default function Nav({
  active,
  onToggleMobile,
  contactEmail,
  name,
  title,
}: NavProps) {
  const items = [
    "home",
    "skills",
    "projects",
    "network",
    "certs",
    "languages",
    "contact",
  ];
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center font-bold text-white">
            MF
          </div>
          <div>
            <div className="text-sm font-semibold">{name}</div>
            <div className="text-xs text-gray-500">{title}</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {items.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`px-3 py-1 rounded-md text-xs font-medium transition transform ${
                active === id
                  ? "bg-indigo-600 text-white scale-105 shadow"
                  : "text-gray-700 hover:scale-105"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a
            href={`mailto:${contactEmail}`}
            className="ml-3 px-3 py-1 rounded-md bg-amber-400 text-white text-xs font-semibold"
          >
            Hire
          </a>
        </nav>

        <div className="md:hidden">
          <button
            onClick={onToggleMobile}
            aria-label="Toggle menu"
            className="p-2 rounded-md bg-white shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="#111827"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:37:07
 * @Description:
 */

"use client";
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  active: string;
}

export default function MobileDrawer({ open, onClose, active }: MobileDrawerProps) {
    const { t } = useTranslation();
  const items = [
    { id: "home", label: t("home") },
    { id: "skills", label: t("skills") },
    { id: "projects", label: t("projects") },
    { id: "network", label: t("network") },
    { id: "certs", label: t("certs") },
    { id: "languages", label: t("languages") },
    { id: "contact", label: t("contact") },
  ];
  if(!open) return null;
  return (
    <div className="max-w-5xl mx-auto mt-2 bg-white rounded-xl p-3 shadow-sm">
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={onClose} className={`px-3 py-2 rounded-md text-sm ${active===item.id?"bg-indigo-600 text-white":"text-gray-700 hover:bg-gray-100"}`}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}


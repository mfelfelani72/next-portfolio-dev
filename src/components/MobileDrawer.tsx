/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:37:07
 * @Description:
 */

"use client";
import React from "react";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  active: string;
}

export default function MobileDrawer({ open, onClose, active }: MobileDrawerProps) {
  const items = ["home","skills","projects","network","certs","languages","contact"];
  if(!open) return null;
  return (
    <div className="max-w-5xl mx-auto mt-2 bg-white rounded-xl p-3 shadow-sm">
      <div className="flex flex-col gap-2">
        {items.map(id=>(
          <a key={id} href={`#${id}`} onClick={onClose} className={`px-3 py-2 rounded-md text-sm ${active===id?"bg-indigo-600 text-white":"text-gray-700 hover:bg-gray-100"}`}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
    </div>
  )
}


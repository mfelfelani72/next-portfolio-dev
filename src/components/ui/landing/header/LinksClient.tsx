"use client";

import React, { useState, useEffect } from "react";

// Components

import LocalizedLink from "@/components/base/LocalizedLink";

// Constants

import { menuItems } from "@/configs/menuItems";

// Hooks

import { usePathname } from "next/navigation";

// Interfaces

import { LinksClientProps } from "@/configs/menuItems";
const LinksClient = ({ items, initialActivePage }: LinksClientProps) => {
  // Hooks

  const pathname = usePathname();

  // States

  const [activePage, setActivePage] = useState(initialActivePage);

  // Functions

  const getActivePageFromPath = () => {
    const nonHomeItems = menuItems.filter((item) => item.path !== "/");

    const activeItem = nonHomeItems.find((item) =>
      pathname.includes(item.path)
    );

    if (activeItem) return activeItem.id;

    return "home";
  };

  useEffect(() => {
    const newActivePage = getActivePageFromPath();
    setActivePage(newActivePage);
  }, [pathname]);

  const isActive = (itemId: string) => {
    return activePage === itemId;
  };

  return (
    <>
      {items.map((item) => (
        <LocalizedLink key={item.id} href={`/${item.id}`}>
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium transition transform ${
              isActive(item.id)
                ? "bg-indigo-600 text-white scale-105 shadow"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {item.label}
          </span>
        </LocalizedLink>
      ))}
    </>
  );
};

export default LinksClient;

import React from "react";
import { headers } from "next/headers";

// Components

import LinksClient from "@/components/ui/landing/header/LinksClient";

// Constants

import { menuItems } from "@/configs/menuItems";

// Functions

import { createTranslator } from "@/libs/translation";

// Interfaces

import { type Lang } from "@/configs/language";

const Links = async ({ params }: { params: { lang: Lang } }) => {
  // Functions

  const { t } = createTranslator(params.lang as Lang);

  const headersList = await headers();
  const pathname =
    headersList.get("x-invoke-path") || headersList.get("referer") || "";

  const getActivePage = () => {
    const activeItem = menuItems.find(
      (item) => pathname.includes(item.path) && item.path !== "/"
    );

    if (activeItem) return activeItem.id;

    return "home";
  };

  // Constants

  const activePage = getActivePage();

  const items = menuItems.map((item) => ({
    id: item.id,
    label: t(item.labelKey),
  }));

  return <LinksClient items={items} initialActivePage={activePage} />;
};

export default Links;

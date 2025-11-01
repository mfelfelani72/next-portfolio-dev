"use client"
import React, { useState } from "react";

import { createTranslator } from "@/libs/translation";

import { type Lang } from "@/configs/language";
const Links = ({ params = { lang: "en" } }) => {
 const { t } = createTranslator(params.lang as Lang);


   const [active, setActive] = useState("home");

  const items = [
    { id: "home", label: t("home") },
    { id: "skills", label: t("skills") },
    { id: "projects", label: t("projects") },
    { id: "network", label: t("network") },
    { id: "certs", label: t("certs") },
    { id: "languages", label: t("languages") },
    { id: "contact", label: t("contact") },
  ];
  return (
    <>
     
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`px-3 py-1 rounded-md text-xs font-medium transition transform ${
              active === item.id
                ? "bg-indigo-600 text-white scale-105 shadow"
                : "text-gray-700 hover:scale-105"
            }`}
          >
            {item.label}
          </a>
        ))}
        {/* <a
                href={`mailto:${contactEmail}`}
                className="ml-3 px-3 py-1 rounded-md bg-amber-400 text-white text-xs font-semibold"
              >
                Hire
              </a> */}

    </>
  );
};

export default Links;

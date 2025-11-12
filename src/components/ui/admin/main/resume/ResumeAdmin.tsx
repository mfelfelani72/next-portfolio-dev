"use client";

import { useState } from "react";
import ProfileTab from "./tabs/ProfileTab";
import ProjectsTab from "./tabs/ProjectsTab";

import { languages } from "@/configs/language";

export default function ResumeAdmin() {
  const [activeLang, setActiveLang] = useState("en");
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { key: "profile", label: "Profile" },
    { key: "projects", label: "Projects" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Language Selector */}
      <div className="p-4 flex gap-2 flex-wrap">
        {Object.entries(languages).map(([langKey, langData]) => (
          <button
            key={langKey}
            onClick={() => setActiveLang(langKey)}
            className={`px-3 py-1 rounded ${
              activeLang === langKey
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {langData.flag} {langData.name}
          </button>
        ))}
      </div>

      {/* Tab Selector */}
      <div className="p-4 flex gap-2 flex-wrap border-b border-gray-300 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "profile" && <ProfileTab lang={activeLang} />}
        {activeTab === "projects" && <ProjectsTab lang={activeLang} />}
      </div>
    </div>
  );
}

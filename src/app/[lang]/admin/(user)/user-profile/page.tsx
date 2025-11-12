"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";
import { languages } from "@/configs/language";

export default function Profile() {
  const [activeLang, setActiveLang] = useState("en");
  const [saving, setSaving] = useState(false);

  const { data, mutate } = useFetch("get", {
    endPoint: `/api/resume/${activeLang}/profile/`,
  });

  const [profile, setProfile] = useState({ 
    name: "", 
    title: "", 
    summary: "" 
  });

  useEffect(() => { 
    if (data) setProfile(data); 
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/${activeLang}/profile/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });
        return profile;
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      {/* Language Selector */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 dark:text-white">Language</h2>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(languages).map(([langKey, langData]) => (
            <button
              key={langKey}
              onClick={() => setActiveLang(langKey)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeLang === langKey
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {langData.flag} {langData.name}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Form */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-6 dark:text-white">Profile Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                Full Name
              </label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile({ ...profile, name: e.target.value })} 
                placeholder="Enter your full name" 
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                Professional Title
              </label>
              <input 
                type="text" 
                value={profile.title} 
                onChange={e => setProfile({ ...profile, title: e.target.value })} 
                placeholder="e.g., Senior Frontend Developer" 
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                Professional Summary
              </label>
              <textarea 
                value={profile.summary} 
                onChange={e => setProfile({ ...profile, summary: e.target.value })} 
                placeholder="Write a brief summary about yourself and your professional experience..." 
                rows={6}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
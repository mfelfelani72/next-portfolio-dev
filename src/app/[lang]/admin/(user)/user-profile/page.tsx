"use client";

import { useState, useEffect } from "react";

// Hooks

import { useFetch } from "@/libs/api/useFetch";

// Interfaces

import { languages } from "@/configs/language";

export default function Profile() {
  // States

  const [activeLang, setActiveLang] = useState("en");
  const [saving, setSaving] = useState(false);
  const [manualProfile, setManualProfile] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    summary: "",
  });

  // Hooks

  const { data } = useFetch("get", {
    endPoint: `/api/resume/${activeLang}/profile/`,
  });

  const { mutate: mutateProfile } = useFetch(
    "put",
    {
      endPoint: `/api/resume/${activeLang}/profile/`,
      body: JSON.stringify(profile),
    },
    {
      manual: manualProfile,
    }
  );

  // Functions

  const executeMutation = async () => {
    try {
      await mutateProfile();
      setManualProfile(true);
      setError("");
      return profile;
    } catch {
      setError("خطا در ذخیره‌سازی");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setManualProfile(false);
  };

  useEffect(() => {
    if (data) setProfile(data);
  }, [data]);

  useEffect(() => {
    if (!manualProfile) executeMutation();
  }, [manualProfile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-xl">
            Manage your professional profile information across different languages
          </p>

          {/* Error Display */}
          {error && (
            <div className="mt-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 sticky top-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-white text-center">
                Language
              </h2>
              <div className="space-y-2">
                {Object.entries(languages).map(([langKey, langData]) => (
                  <button
                    key={langKey}
                    onClick={() => setActiveLang(langKey)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeLang === langKey
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <span className="text-lg mr-3">{langData.flag}</span>
                    <span className="font-medium">{langData.name}</span>
                    {activeLang === langKey && (
                      <svg
                        className="w-5 h-5 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Form Header */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold dark:text-white">Profile Information</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Update your personal and professional details
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 md:p-7 space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-1 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1 dark:text-gray-300">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    placeholder="e.g., Senior Frontend Developer"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1 dark:text-gray-300">Professional Summary</label>
                  <textarea
                    value={profile.summary}
                    onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                    placeholder="Write a compelling summary..."
                    rows={5}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm resize-vertical"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>Brief but impactful</span>
                    <span>{profile.summary.length}/500</span>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white rounded-lg font-medium transition-all duration-200 shadow-sm flex items-center"
                  >
                    {saving ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Profile
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

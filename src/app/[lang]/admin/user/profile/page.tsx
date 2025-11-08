"use client";

import { useState, useEffect } from "react";

// Interfaces
import {
  MultiLanguageResume,
  ResumeData,
  Skill,
  Contact,
} from "@/Interfaces/portfolio";
import { languages } from "@/configs/language";

// Hooks
import { useFetch } from "@/libs/api/useFetch";

export default function AdminPanel() {
  // States
  const [resume, setResume] = useState<MultiLanguageResume>({});
  const [activeLang, setActiveLang] = useState("en");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [manual, setManual] = useState(true);

  // Constants
  const currentData = resume[activeLang] || {};
  const currentContact = currentData.contact || {
    email: "",
    linkedin: "",
    github: "",
  };

  // Functions
  const { mutate } = useFetch<MultiLanguageResume>(
    "post",
    {
      endPoint: "/api/admin/resume",
      body: { table: "user" },
    },
    {
      onSuccess: async (data) => {
        if (data && "error" in data) {
          console.log(data);
        } else if (data) {
          setResume(data);
        }
      },
    }
  );

  const { mutate: saveResume } = useFetch<any>(
    "put",
    {
      endPoint: "/api/admin/resume",
      body: {
        table: "user",
        data: resume,
      },
    },
    {
      manual: manual,
      onSuccess: (result) => {
        setMessage(result?.success ? "✅ Changes saved successfully!" : "❌ Error saving changes");
        setManual(false);
        setSaving(false);
      },
      onError: (error) => {
        setMessage("❌ Error: " + error);
        setManual(false);
        setSaving(false);
      },
    }
  );

  const handleSave = () => {
    setSaving(true);
    setMessage("");
    setManual(false);
  };

  const updateField = (field: keyof ResumeData, value: any) => {
    setResume((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        [field]: value,
      },
    }));
  };

  const updateContactField = (field: keyof Contact, value: string) => {
    setResume((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        contact: {
          ...prev[activeLang]?.contact,
          [field]: value,
        },
      },
    }));
  };

  const addSkill = () => {
    setResume((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        skills: [
          ...(prev[activeLang]?.skills || []),
          { name: "", level: 50, colorClass: "skill-grad-1" },
        ],
      },
    }));
  };

  const removeSkill = (index: number) => {
    setResume((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        skills: (prev[activeLang]?.skills || []).filter((_, i) => i !== index),
      },
    }));
  };

  const updateSkill = (
    index: number,
    field: keyof Skill,
    value: string | number
  ) => {
    setResume((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        skills: (prev[activeLang]?.skills || []).map((skill, i) =>
          i === index ? { ...skill, [field]: value } : skill
        ),
      },
    }));
  };

  const addResumeLanguage = (newLang: string) => {
    if (!resume[newLang]) {
      setResume((prev) => ({
        ...prev,
        [newLang]: { ...prev["en"] },
      }));
    }
    setActiveLang(newLang);
  };

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (!manual) saveResume();
  }, [manual]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Resume Manager
          </h1>
          <p className="text-gray-600 text-lg">Manage your professional resume content</p>
        </div>

        {/* Language Selector */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              Language Selection
            </h2>
            <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full border">
              Current: <span className="font-semibold text-blue-600">{activeLang.toUpperCase()}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            {Object.entries(languages).map(([langKey, langData]) => (
              <button
                key={langKey}
                onClick={() => addResumeLanguage(langKey)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                  ${activeLang === langKey
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-lg"
                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:shadow-md"
                  }
                `}
              >
                <span className="text-2xl">{langData.flag}</span>
                <div className="text-left">
                  <div className="font-semibold">{langData.name}</div>
                  <div className="text-xs text-gray-500">{langData.nativeName}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`
              p-4 mb-6 rounded-xl border-2 backdrop-blur-sm transform transition-all duration-300
              ${message.includes("✅")
                ? "bg-green-50 border-green-200 text-green-800 shadow-lg"
                : "bg-red-50 border-red-200 text-red-800 shadow-lg"
              }
            `}
          >
            <div className="flex items-center gap-3">
              {message.includes("✅") ? (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-3 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            Basic Information
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {activeLang.toUpperCase()}
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                value={currentData.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Professional Title</label>
              <input
                type="text"
                value={currentData.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                placeholder="e.g., Senior Developer"
              />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Professional Summary</label>
              <textarea
                value={currentData.summary || ""}
                onChange={(e) => updateField("summary", e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 h-32 resize-none"
                placeholder="Write a brief professional summary..."
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <div className="w-3 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              Skills & Expertise
            </h2>
            <button
              onClick={addSkill}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Skill
            </button>
          </div>

          <div className="space-y-4">
            {(currentData.skills || []).map((skill, index) => (
              <div
                key={index}
                className="flex gap-4 items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300"
              >
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Name</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    placeholder="e.g., JavaScript, React"
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Proficiency Level: <span className="text-blue-600">{skill.level}%</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => updateSkill(index, "level", parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-500"
                    />
                    <span className="text-sm font-semibold text-gray-600 min-w-12">{skill.level}%</span>
                  </div>
                </div>
                
                <button
                  onClick={() => removeSkill(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Remove skill"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={currentContact.email}
                  onChange={(e) => updateContactField("email", e.target.value)}
                  className="w-full pl-10 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">LinkedIn Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <input
                  type="url"
                  value={currentContact.linkedin}
                  onChange={(e) => updateContactField("linkedin", e.target.value)}
                  className="w-full pl-10 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">GitHub Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <input
                  type="url"
                  value={currentContact.github}
                  onChange={(e) => updateContactField("github", e.target.value)}
                  className="w-full pl-10 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="github.com/yourusername"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`
              bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl 
              hover:shadow-xl transform hover:scale-105 transition-all duration-300 
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              flex items-center gap-3 font-semibold text-lg
            `}
          >
            {saving ? (
              <>
                <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Saving Changes...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save All Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
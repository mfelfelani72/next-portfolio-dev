"use client";
import { useState, useEffect } from "react";
import {
  MultiLanguageResume,
  ResumeData,
  Skill,
  Project,
  Certification,
  NetworkingExperience,
  Language,
  Contact,
} from "@/Interfaces/portfolio"; // مسیر فایل types رو اصلاح کن

const languages = ["en", "fa", "de"];

export default function AdminPanel() {
  const [resume, setResume] = useState<MultiLanguageResume>({});
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await fetch("/api/admin/resume");
      const data: MultiLanguageResume = await response.json();
      if (data.error) console.log(data);
      else setResume(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });

      const result = await response.json();
      setMessage(result.success ? "✅ Saved!" : "❌ Error");
    } catch (error) {
      setMessage("❌ Error");
    } finally {
      setSaving(false);
    }
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

  // بقیه توابع مثل قبل...
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

  // بقیه توابع مدیریت state...

  const addResumeLanguage = (newLang: string) => {
    if (!resume[newLang]) {
      setResume((prev) => ({
        ...prev,
        [newLang]: { ...prev["en"] },
      }));
    }
    setActiveLang(newLang);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  const currentData = resume[activeLang] || {};
  const currentContact = currentData.contact || {
    email: "",
    linkedin: "",
    github: "",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Resume Admin Panel</h1>

        {/* Language Selector */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">Languages</h2>
          <div className="flex gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => addResumeLanguage(lang)}
                className={`px-4 py-2 rounded ${
                  activeLang === lang
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div
            className={`p-4 mb-6 rounded ${
              message.includes("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Basic Information ({activeLang.toUpperCase()})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={currentData.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={currentData.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Summary</label>
              <textarea
                value={currentData.summary || ""}
                onChange={(e) => updateField("summary", e.target.value)}
                className="w-full p-2 border rounded h-24"
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <button
              onClick={addSkill}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Skill
            </button>
          </div>

          <div className="space-y-4">
            {(currentData.skills || []).map((skill, index) => (
              <div
                key={index}
                className="flex gap-4 items-center p-4 border rounded"
              >
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">
                    Level ({skill.level}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) =>
                      updateSkill(index, "level", parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={currentContact.email}
                onChange={(e) => updateContactField("email", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn</label>
              <input
                type="url"
                value={currentContact.linkedin}
                onChange={(e) => updateContactField("linkedin", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">GitHub</label>
              <input
                type="url"
                value={currentContact.github}
                onChange={(e) => updateContactField("github", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save All Languages"}
          </button>
        </div>
      </div>
    </div>
  );
}

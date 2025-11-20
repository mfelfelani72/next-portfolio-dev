"use client";

import { useState, useEffect } from "react";

// Hooks

import { useFetch } from "@/libs/api/useFetch";
import { useTranslation } from "@/hooks/useTranslation";

// Interfaces

interface Contact {
  email: string;
  linkedin: string;
  github: string;
  telegram: string;
}

export default function Contact() {
  // States

  const [saving, setSaving] = useState(false);
  const [manualContacts, setManualContacts] = useState(true);
  const [error, setError] = useState("");
  const [contact, setContact] = useState<Contact>({
    email: "",
    linkedin: "",
    github: "",
    telegram: "",
  });
  // Hooks

  const { t } = useTranslation();

  const { data } = useFetch("get", {
    endPoint: `/api/resume/contact/`,
  });

  const { mutate: mutateContacts } = useFetch(
    "put",
    {
      endPoint: `/api/resume/contact/`,
      body: JSON.stringify(contact),
    },
    { manual: manualContacts }
  );

  // Functions

  const executeMutation = async () => {
    try {
      await mutateContacts();
      setManualContacts(true);
      setError("");
      return contact;
    } catch {
      setError("error_in_storage");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setManualContacts(false);
  };

  const updateContactField = (field: keyof Contact, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const getFieldIcon = (field: keyof Contact) => {
    switch (field) {
      case "email":
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "linkedin":
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "github":
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case "telegram":
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getFieldPlaceholder = (field: keyof Contact) => {
    switch (field) {
      case "email":
        return "example@email.com";
      case "linkedin":
        return "https://linkedin.com/in/username";
      case "github":
        return "https://github.com/username";
      case "telegram":
        return "https://t.me/username";
      default:
        return "";
    }
  };

  const getFieldLabel = (field: keyof Contact) => {
    switch (field) {
      case "email":
        return "email";
      case "linkedin":
        return "linkedin";
      case "github":
        return "github";
      case "telegram":
        return "telegram";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (data) setContact(data);
  }, [data]);

  useEffect(() => {
    if (!manualContacts) executeMutation();
  }, [manualContacts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            {t("contact_information")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl">
            {t("contact_information_slogan")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6 dark:text-white flex items-center justify-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                {t("contact")}
              </h2>

              <div className="space-y-4 text-center">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                    {t("important_point")}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 leading-relaxed">
                    {t("important_point_contact")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* main */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center">
                  <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 mr-4">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">
                      {t("manage_contact")}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {t("manage_contact_slogan")}
                    </p>
                  </div>
                </div>
              </div>
              {/* Error Message */}
              {error && (
                <div className="px-6 py-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-medium border-b border-red-200 dark:border-red-700">
                  {t(error)}
                </div>
              )}
              {/* contact form */}
              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  {(Object.keys(contact) as Array<keyof Contact>).map(
                    (field) => (
                      <div
                        key={field}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                              {getFieldIcon(field)}
                            </div>
                          </div>

                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-3 dark:text-gray-300">
                              {t(getFieldLabel(field))}
                            </label>
                            <div className="relative">
                              <input
                                type={field === "email" ? "email" : "url"}
                                value={contact[field]}
                                onChange={(e) =>
                                  updateContactField(field, e.target.value)
                                }
                                placeholder={getFieldPlaceholder(field)}
                                className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="flex justify-end pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow flex items-center text-lg"
                  >
                    {saving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("saving")}
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {t("save")}
                      </>
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

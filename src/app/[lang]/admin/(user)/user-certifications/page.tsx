"use client";

import { useState, useEffect } from "react";

// Hooks

import { useFetch } from "@/libs/api/useFetch";

// Interfaces

interface Certification {
  title: string;
  year: string;
}

interface CertificationsData {
  certifications: Certification[];
}

export default function Certifications() {
  // States

  const [manualCertification, setManualCertification] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [certificationsData, setCertificationsData] =
    useState<CertificationsData>({
      certifications: [],
    });

  // Hooks

  const { data } = useFetch("get", {
    endPoint: `/api/resume/certifications/`,
  });

  const { mutate: mutateCertificate } = useFetch(
    "put",
    {
      endPoint: "/api/resume/certifications/",
      body: JSON.stringify(certificationsData),
    },
    {
      manual: manualCertification,
    }
  );

 // Functions

  const addCertification = () =>
    setCertificationsData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { title: "", year: "" }],
    }));

  const removeCertification = (index: number) =>
    setCertificationsData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));

  const updateCertification = (
    index: number,
    field: "title" | "year",
    value: string
  ) =>
    setCertificationsData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }));

  const handleSave = () => {
    setSaving(true);
    setManualCertification(false);
  };

  useEffect(() => {
    if (data) setCertificationsData(data);
  }, [data]);

  useEffect(() => {
    const executeMutation = async () => {
      try {
        await mutateCertificate();
        setManualCertification(true);
      } catch (error) {
        console.error("Mutation failed:", error);
      } finally {
        setSaving(false);
      }
    };
    executeMutation();
  }, [manualCertification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            گواهینامه‌ها
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-xl">
            مدارک و گواهینامه‌های معتبر خود را برای تقویت رزومه اضافه کنید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 sticky top-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-white text-center">
                گواهینامه‌ها
              </h2>

              {/* Stats */}
              <div className="space-y-3 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {certificationsData.certifications.length}
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    گواهینامه ثبت شده
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                    نکات مهم
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 leading-relaxed">
                    گواهینامه‌های معتبر و مرتبط با فعالیت خود را اضافه کنید
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-3">
                    <svg
                      className="w-5 h-5 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold dark:text-white">
                      مدیریت گواهینامه‌ها
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      اضافه، ویرایش یا حذف کنید
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7">
                {/* Empty State */}
                {certificationsData.certifications.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      هیچ گواهینامه‌ای ثبت نشده
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mb-5">
                      اولین گواهینامه خود را اضافه کنید
                    </p>
                    <button
                      onClick={addCertification}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md text-sm"
                    >
                      افزودن اولین گواهینامه
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {certificationsData.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          {/* Index Badge */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {index + 1}
                            </div>
                          </div>

                          {/* Input Fields */}
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium mb-1 dark:text-gray-300">
                                عنوان گواهینامه
                              </label>
                              <input
                                type="text"
                                placeholder="مثال: AWS Certified Architect"
                                value={cert.title}
                                onChange={(e) =>
                                  updateCertification(
                                    index,
                                    "title",
                                    e.target.value
                                  )
                                }
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium mb-1 dark:text-gray-300">
                                سال دریافت
                              </label>
                              <input
                                type="text"
                                placeholder="مثال: ۱۴۰۲"
                                value={cert.year}
                                onChange={(e) =>
                                  updateCertification(
                                    index,
                                    "year",
                                    e.target.value
                                  )
                                }
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              />
                            </div>
                          </div>

                          {/* Remove Button */}
                          <div className="flex-shrink-0">
                            <button
                              onClick={() => removeCertification(index)}
                              className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-md text-xs flex items-center"
                            >
                              <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                {certificationsData.certifications.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center pt-5 mt-6 border-t border-gray-200 dark:border-gray-700">
                    {/* Add More */}
                    <button
                      onClick={addCertification}
                      className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md text-sm flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      افزودن گواهینامه جدید
                    </button>

                    {/* Save Button */}
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white rounded-lg font-medium transition-all duration-200 shadow-md text-sm flex items-center justify-center"
                    >
                      {saving ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                          در حال ذخیره...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 ml-2"
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
                          ذخیره تغییرات
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

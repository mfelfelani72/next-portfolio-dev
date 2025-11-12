"use client";

import { useState, useEffect, useRef } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Project {
  title: string;
  description: string;
  link: string;
  technologies: string[];
  image: string;
}

export default function Projects() {
  const { data, mutate } = useFetch("get", {
    endPoint: `/api/resume/projects/`,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    if (data) setProjects(data.projects || []);
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        const response = await fetch(`/api/resume/projects/`, {
          method: "PUT",
          body: JSON.stringify({ projects }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("ذخیره ناموفق بود");
        }

        return { projects };
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  const addProject = () =>
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        link: "",
        technologies: [],
        image: "",
      },
    ]);

  const removeProject = (i: number) =>
    setProjects(projects.filter((_, index) => index !== i));

  const updateProjectField = (
    index: number,
    field: keyof Project,
    value: any
  ) => {
    const arr = [...projects];
    arr[index][field] = value;
    setProjects(arr);
  };

  const handleImageUpload = async (index: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("لطفاً یک فایل تصویری انتخاب کنید");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("حجم فایل باید کمتر از ۲ مگابایت باشد");
      return;
    }

    setUploadingImages((prev) => ({ ...prev, [index]: true }));

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const arr = [...projects];
      arr[index].image = base64String;
      setProjects(arr);
      setUploadingImages((prev) => ({ ...prev, [index]: false }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    const arr = [...projects];
    arr[index].image = "";
    setProjects(arr);
  };

  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const setFileInputRef = (index: number) => (el: HTMLInputElement | null) => {
    fileInputRefs.current[index] = el;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* هدر یکپارچه */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            پروژه‌ها و نمونه کارها
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            پروژه‌های برجسته و نمونه کارهای خود را به نمایش بگذارید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* سایدبار */}
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                آمار پروژه‌ها
              </h2>

              <div className="space-y-4 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {projects.length}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    پروژه ثبت شده
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    {projects.filter((p) => p.image).length}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    پروژه دارای تصویر
                  </p>
                </div>

                {/* دکمه افزودن پروژه در سایدبار */}

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                    نکات مهم
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 leading-relaxed">
                    از تصاویر با کیفیت و توضیحات کامل استفاده کنید
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* هدر محتوا */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center justify-between">
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
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold dark:text-white">
                        مدیریت پروژه‌ها
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        پروژه‌های خود را اضافه، ویرایش یا حذف کنید
                      </p>
                    </div>
                  </div>

                 
               
                </div>
              </div>

              {/* لیست پروژه‌ها */}
              <div className="p-6 md:p-8">
                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      هیچ پروژه‌ای ثبت نشده است
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
                      برای شروع، اولین پروژه خود را اضافه کنید
                    </p>
                    <button
                      onClick={addProject}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg font-medium"
                    >
                      افزودن اولین پروژه
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                  پروژه {index + 1}
                                </h3>
                                {project.title && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {project.title}
                                  </p>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => removeProject(index)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center font-medium"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
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
                              حذف پروژه
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* ستون سمت چپ - فرم‌ها */}
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                                  عنوان پروژه
                                </label>
                                <input
                                  type="text"
                                  value={project.title}
                                  onChange={(e) =>
                                    updateProjectField(
                                      index,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  placeholder="مثال: سیستم مدیریت محتوای اختصاصی"
                                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                                  لینک پروژه
                                </label>
                                <input
                                  type="text"
                                  value={project.link}
                                  onChange={(e) =>
                                    updateProjectField(
                                      index,
                                      "link",
                                      e.target.value
                                    )
                                  }
                                  placeholder="https://example.com"
                                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                                  تکنولوژی‌ها
                                </label>
                                <input
                                  type="text"
                                  value={project.technologies.join(", ")}
                                  onChange={(e) =>
                                    updateProjectField(
                                      index,
                                      "technologies",
                                      e.target.value
                                        .split(",")
                                        .map((t) => t.trim())
                                    )
                                  }
                                  placeholder="React, Node.js, MongoDB (با کاما جدا کنید)"
                                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                                />
                              </div>
                            </div>

                            {/* ستون سمت راست - تصویر و توضیحات */}
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                                  تصویر پروژه
                                </label>
                                <div className="space-y-3">
                                  {project.image ? (
                                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                                      <img
                                        src={project.image}
                                        alt="Project cover"
                                        className="w-full h-48 object-cover"
                                      />
                                      <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition-all duration-200 shadow-lg"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer bg-gray-50 dark:bg-gray-700/50"
                                      onClick={() =>
                                        fileInputRefs.current[index]?.click()
                                      }
                                    >
                                      <input
                                        ref={setFileInputRef(index)}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            handleImageUpload(index, file);
                                          }
                                        }}
                                        className="hidden"
                                      />
                                      <svg
                                        className="w-12 h-12 text-gray-400 mx-auto mb-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={1}
                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                      </svg>
                                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {uploadingImages[index]
                                          ? "در حال آپلود..."
                                          : "برای آپلود تصویر کلیک کنید"}
                                      </p>
                                      <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                                        JPG, PNG, GIF (حداکثر ۲ مگابایت)
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                                  توضیحات پروژه
                                </label>
                                <textarea
                                  value={project.description}
                                  onChange={(e) =>
                                    updateProjectField(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  placeholder="توضیحات کامل درباره پروژه، ویژگی‌ها و دستاوردها..."
                                  rows={4}
                                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm resize-vertical"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* دکمه ذخیره */}
                {projects.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-end items-stretch sm:items-center pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                    {/* دکمه افزودن پروژه - سمت چپ */}
                    <button
                      onClick={addProject}
                      className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-medium text-lg order-2 sm:order-1 h-[60px] sm:h-auto"
                    >
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      افزودن پروژه جدید
                    </button>

                    {/* دکمه ذخیره - سمت راست */}
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow flex items-center justify-center text-lg order-1 sm:order-2 h-[60px] sm:h-auto"
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
                          در حال ذخیره...
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
                          ذخیره همه تغییرات
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

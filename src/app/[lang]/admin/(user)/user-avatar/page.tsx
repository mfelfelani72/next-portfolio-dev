"use client";

import { useState, useRef } from "react";
import { useFetch } from "@/libs/api/useFetch";

export default function AvatarPage() {
  const { data: avatarData, mutate } = useFetch("get", {
    endPoint: `/api/resume/avatar/`,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // تبدیل فایل به Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("لطفاً یک فایل تصویری انتخاب کنید");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("حجم فایل باید کمتر از ۵ مگابایت باشد");
      return;
    }

    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setSelectedImage(base64);
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("خطا در تبدیل عکس");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedImage) return;

    setSaving(true);
    try {
      await mutate(
        async () => {
          const response = await fetch("/api/resume/avatar/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: selectedImage,
            }),
          });

          if (!response.ok) {
            throw new Error("ذخیره ناموفق بود");
          }

          return await response.json();
        },
        { revalidate: true }
      );

      // فقط فایل اینپوت رو ریست کنیم، عکس نمایش داده شده نه
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert("آواتار با موفقیت ذخیره شد");
    } catch (error) {
      console.error("Save failed:", error);
      alert("ذخیره عکس با خطا مواجه شد");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* هدر یکپارچه - مشابه صفحه پروفایل */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            آواتار پروفایل
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            تصویر شخصی خود را برای ایجاد تاثیر اولیه حرفه‌ای انتخاب کنید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* پنل سمت چپ - نمایش آواتار */}
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                پیش‌نمایش
              </h2>

              <div className="relative mb-6">
                <div className="relative mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-700 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="New Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : avatarData?.url ? (
                    <img
                      src={avatarData.url}
                      alt="Current Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <svg
                        className="w-16 h-16 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="text-sm">بدون تصویر</span>
                    </div>
                  )}

                  {uploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-xl">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                        <div className="text-white text-sm">
                          در حال پردازش...
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* دکمه‌های اکشن */}
                {selectedImage && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center text-sm font-medium"
                    >
                      {saving ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          ذخیره...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 mr-1"
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
                          تأیید
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center text-sm font-medium"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      انصراف
                    </button>
                  </div>
                )}
              </div>

              {/* اطلاعات آواتار فعلی */}
              <div className="space-y-3 text-center">
                {avatarData?.url && !selectedImage && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                      آخرین بروزرسانی
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {new Date(avatarData.updatedAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </p>
                  </div>
                )}

                {selectedImage && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-300 font-medium flex items-center justify-center">
                      <svg
                        className="w-4 h-4 mr-1"
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
                      عکس جدید انتخاب شده
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* پنل سمت راست - آپلود */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* هدر پنل آپلود */}
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
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">
                      آپلود آواتار جدید
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      تصویر مورد نظر خود را انتخاب یا اینجا رها کنید
                    </p>
                  </div>
                </div>
              </div>

              {/* ناحیه درگ و دراپ */}
              <div className="p-6 md:p-8">
                <div
                  className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 p-8 text-center group ${
                    dragOver
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02] shadow-lg"
                      : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                    disabled={uploading}
                  />

                  <div className="space-y-6">
                    {/* آیکون مرکزی */}
                    <div className="flex justify-center">
                      <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                        <svg
                          className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* متن‌ها */}
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        عکس جدید را اینجا رها کنید
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">یا</p>
                    </div>

                    {/* دکمه انتخاب فایل */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-lg"
                    >
                      {uploading ? (
                        <span className="flex items-center justify-center">
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
                          در حال آپلود...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
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
                          انتخاب فایل
                        </span>
                      )}
                    </button>

                    {/* اطلاعات فرمت */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        <span className="font-medium">فرمت‌های مجاز:</span> JPG,
                        PNG, GIF, WEBP
                        <span className="mx-2">•</span>
                        <span className="font-medium">حداکثر حجم:</span> ۵
                        مگابایت
                      </p>
                    </div>
                  </div>
                </div>

                {/* نکته مهم */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-800 mr-4 mt-1">
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                        نکته مهم:
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                        این آواتار برای تمام زبان‌ها یکسان نمایش داده می‌شود و
                        نیازی به تنظیم جداگانه برای هر زبان ندارد. توصیه می‌شود
                        از تصویری با کیفیت و حرفه‌ای استفاده کنید.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

export default function AvatarPage() {
  /**
   * Fetch current avatar
   * - Uses GET to load existing avatar
   * - mutate() will be used later to update avatar
   */
  const { data: avatarData, mutate: saveAvatar } = useFetch("get", {
    endPoint: `/api/resume/avatar/`,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // UI States
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Selected image preview (Base64)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /**
   * Convert File → Base64 string
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

  /**
   * Validate + load image file
   */
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
    } catch {
      alert("خطا در تبدیل فایل");
    } finally {
      setUploading(false);
    }
  };

  const [manualAvatar, setManualAvatar] = useState(true);

  /**
   * PUT → Save avatar
   * Uses mutate() from useFetch to update server + refresh GET cache
   */

  // Mutation hook
  const { mutate: mutateAvatar } = useFetch(
    "post",
    {
      endPoint: "/api/resume/avatar/",
      body: {
        url: selectedImage,
      },
    },
    {
      manual: manualAvatar,
    }
  );
  const executeMutation = async () => {
    try {
      await mutateAvatar();
      setManualAvatar(true);

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Error :" + error);
    } finally {
      setSaving(false);
    }
  };

  // Execute mutation when manualCertification changes
  useEffect(() => {
    if (!manualAvatar) executeMutation();
  }, [manualAvatar]);

  const handleSave = async () => {
    console.log("hand");
    if (!selectedImage) return;

    setSaving(true);
    setManualAvatar(false);
  };

  /**
   * Reset selected image
   */
  const handleCancel = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /**
   * Input file handler
   */
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  /**
   * Drag & Drop Events
   */
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
        {/* ===== Page Header ===== */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            آواتار پروفایل
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            تصویر شخصی خود را برای ایجاد تاثیر اولیه حرفه‌ای انتخاب کنید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== Left Panel: Preview ===== */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6 dark:text-white flex items-center justify-center">
                پیش‌نمایش
              </h2>

              {/* Avatar Preview */}
              <div className="relative mb-6">
                <div className="relative mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-700 bg-gray-200 dark:bg-gray-700">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      className="w-full h-full object-cover"
                    />
                  ) : avatarData?.url ? (
                    <img
                      src={avatarData.url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      بدون تصویر
                    </div>
                  )}

                  {uploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-sm">
                      در حال پردازش...
                    </div>
                  )}
                </div>

                {/* Save / Cancel buttons */}
                {selectedImage && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-green-600 text-white rounded-full text-sm shadow"
                    >
                      {saving ? "ذخیره..." : "تأیید"}
                    </button>

                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="px-4 py-2 bg-gray-600 text-white rounded-full text-sm shadow"
                    >
                      انصراف
                    </button>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="space-y-3 text-center">
                {avatarData?.updatedAt && !selectedImage && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm">
                    آخرین بروزرسانی:{" "}
                    {new Date(avatarData.updatedAt).toLocaleDateString("fa-IR")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== Right Panel: Uploader ===== */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold dark:text-white">
                  آپلود آواتار جدید
                </h2>
              </div>

              {/* Drag Area */}
              <div className="p-6 md:p-8">
                <div
                  className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                    dragOver
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onFileInputChange}
                    className="hidden"
                  />

                  <p className="text-lg font-semibold mb-2 dark:text-gray-200">
                    عکس جدید را اینجا رها کنید
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">یا</p>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow"
                  >
                    انتخاب فایل
                  </button>

                  <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                    فرمت‌های مجاز: JPG, PNG, GIF, WEBP – حداکثر ۵ مگابایت
                  </p>
                </div>

                {/* Note */}
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-sm text-blue-700 dark:text-blue-300">
                  این آواتار برای تمام زبان‌ها یکسان نمایش داده می‌شود.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

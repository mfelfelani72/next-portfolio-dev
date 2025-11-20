"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Hooks

import { useFetch } from "@/libs/api/useFetch";

// Zustand

import { useLangStore } from "@/app/[lang]/stores/LangStore";

export default function AvatarPage() {
  // States and Refs

  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [manualAvatar, setManualAvatar] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { schemaLocale } = useLangStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hooks

  const { t } = useTranslation();

  const { data: avatarData } = useFetch("get", {
    endPoint: `/api/resume/avatar/`,
  });

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

  // Functions

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("please_enter_media");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("error_size");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const base64 = await fileToBase64(file);
      setSelectedImage(base64);
    } catch {
      setError("error_in_convert");
    } finally {
      setUploading(false);
    }
  };

  const executeMutation = async () => {
    try {
      await mutateAvatar();
      setManualAvatar(true);

      if (fileInputRef.current) fileInputRef.current.value = "";
      setError("");
    } catch (error) {
      setError("error_in_storage");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!selectedImage) return;

    setSaving(true);
    setError("");
    setManualAvatar(false);
  };

  const handleCancel = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setError("");
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    if (!manualAvatar) executeMutation();
  }, [manualAvatar]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-3 md:p-6">
      <div className="max-w-7xl mx-auto scale-[0.88] origin-top">
        {/* ===== Page Header ===== */}
        <div className="mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {t("avatar")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl">
            {t("avatar_suggest")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== Left Panel: Preview ===== */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 sticky top-4">
              <h2 className="text-lg font-semibold mb-4 dark:text-white text-center">
                {t("preview")}
              </h2>

              {/* Avatar Preview */}
              <div className="relative mb-5">
                <div className="relative mx-auto w-36 h-36 rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700 bg-gray-200 dark:bg-gray-700">
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
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                      {t("without_picture")}
                    </div>
                  )}

                  {uploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-xs">
                      {t("progressing")}
                    </div>
                  )}
                </div>

                {/* Save / Cancel buttons */}
                {selectedImage && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-3 py-1.5 bg-green-600 text-white rounded-full text-xs shadow"
                    >
                      {saving ? t("saving") : t("save")}
                    </button>

                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="px-3 py-1.5 bg-gray-600 text-white rounded-full text-xs shadow"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="space-y-2 text-center text-sm">
                {avatarData?.updatedAt && !selectedImage && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-xs">
                    {t("last_update")}{" "}
                    {new Date(avatarData.updatedAt).toLocaleDateString(
                      schemaLocale
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== Right Panel: Uploader ===== */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold dark:text-white">
                  {t("upload_new_avatar")}
                </h2>
              </div>

              {/* Drag Area */}
              <div className="p-6 md:p-7">
                <div
                  className={`rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                    dragOver
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40"
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

                  <p className="text-base font-semibold mb-3 dark:text-gray-200">
                    {t("drop_photo_here")}
                  </p>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm shadow"
                  >
                    {t("choose_file")}
                  </button>

                  <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                    {t("allow_format_picture")}
                  </p>
                </div>

                {/* Error under uploader */}
                {error && (
                  <div className="mt-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-xs text-center">
                    {t(error)}
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

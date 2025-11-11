
"use client";

import { useState, useRef } from "react";
import { useFetch } from "@/libs/api/useFetch";

export default function page() {
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
      reader.onerror = error => reject(error);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // اعتبارسنجی نوع فایل
    if (!file.type.startsWith('image/')) {
      alert('لطفاً یک فایل تصویری انتخاب کنید');
      return;
    }

    // اعتبارسنجی سایز فایل (مثلاً 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم فایل باید کمتر از ۵ مگابایت باشد');
      return;
    }

    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setSelectedImage(base64);
    } catch (error) {
      console.error("Conversion failed:", error);
      alert('خطا در تبدیل عکس');
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
              url: selectedImage
            }),
          });
          
          if (!response.ok) {
            throw new Error('ذخیره ناموفق بود');
          }
          
          return await response.json();
        },
        { revalidate: true }
      );

      // پس از ذخیره موفق، حالت را ریست کنیم
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      alert('آواتار با موفقیت ذخیره شد');
    } catch (error) {
      console.error("Save failed:", error);
      alert('ذخیره عکس با خطا مواجه شد');
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
    <div className="max-w-2xl space-y-6">
      {/* نمایش آواتار فعلی */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">آواتار پروفایل</h2>
        <div className="inline-block relative">
          <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-4 border-white shadow-lg">
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
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="text-white">در حال تبدیل...</div>
            </div>
          )}
        </div>
        
        {avatarData?.url && !selectedImage && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            آخرین بروزرسانی: {new Date(avatarData.updatedAt).toLocaleDateString('fa-IR')}
          </p>
        )}
        
        {selectedImage && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            ✓ عکس جدید انتخاب شده
          </p>
        )}
      </div>

      {/* آپلود آواتار */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600'
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
        
        <div className="space-y-4">
          <div className="text-gray-600 dark:text-gray-400">
            <p className="text-lg font-medium">عکس جدید را اینجا رها کنید</p>
            <p className="text-sm">یا</p>
          </div>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {uploading ? "در حال تبدیل..." : "انتخاب فایل"}
          </button>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            فرمت‌های مجاز: JPG, PNG, GIF • حداکثر حجم: ۵ مگابایت
          </p>
        </div>
      </div>

      {/* دکمه‌های ذخیره و انصراف */}
      {selectedImage && (
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {saving ? "در حال ذخیره..." : "ذخیره آواتار"}
          </button>
          
          <button
            onClick={handleCancel}
            disabled={saving}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            انصراف
          </button>
        </div>
      )}

      {/* اطلاعات */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">نکته:</h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          این آواتار برای تمام زبان‌ها یکسان نمایش داده می‌شود و نیازی به تنظیم جداگانه برای هر زبان ندارد.
        </p>
      </div>
    </div>
  );
}
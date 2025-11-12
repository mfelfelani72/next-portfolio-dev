"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Language { 
  name: string; 
  level: string; 
  percent: number; 
}

interface LanguagesTabProps { 
  lang: string; 
}

export default function LanguagesPage({ lang }: LanguagesTabProps) {
  const { data, mutate } = useFetch("get", { 
    endPoint: `/api/resume/languages/` 
  });
  
  const [languagesList, setLanguagesList] = useState<Language[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { 
    if (data) setLanguagesList(data.languages || []); 
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        const response = await fetch(`/api/resume/languages/`, { 
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ languages: languagesList }) 
        });

        if (!response.ok) {
          throw new Error('ذخیره ناموفق بود');
        }

        return { languages: languagesList };
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  const addLanguage = () => setLanguagesList([...languagesList, { name: "", level: "", percent: 50 }]);
  
  const removeLanguage = (i: number) => setLanguagesList(languagesList.filter((_, index) => index !== i));

  const getLevelColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'native': return 'from-green-500 to-emerald-600';
      case 'fluent': return 'from-blue-500 to-cyan-600';
      case 'intermediate': return 'from-yellow-500 to-amber-600';
      case 'basic': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelText = (level: string) => {
    switch(level.toLowerCase()) {
      case 'native': return 'بومی';
      case 'fluent': return 'مسلط';
      case 'intermediate': return 'متوسط';
      case 'basic': return 'مقدماتی';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* هدر یکپارچه */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            زبان‌ها
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            مهارت‌های زبانی خود را برای نمایش در رزومه اضافه کنید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* سایدبار */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6 dark:text-white flex items-center justify-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                آمار زبان‌ها
              </h2>
              
              <div className="space-y-4 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {languagesList.length}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    زبان ثبت شده
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    {languagesList.filter(l => l.level.toLowerCase() === 'native' || l.level.toLowerCase() === 'fluent').length}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    زبان مسلط
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                    راهنما
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 leading-relaxed">
                    سطح تسلط را به دقت مشخص کنید (بومی، مسلط، متوسط، مقدماتی)
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
                <div className="flex items-center">
                  <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 mr-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">مدیریت زبان‌ها</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      زبان‌های خود را اضافه کرده و سطح تسلط را مشخص کنید
                    </p>
                  </div>
                </div>
              </div>

              {/* لیست زبان‌ها */}
              <div className="p-6 md:p-8">
                {languagesList.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      هیچ زبانی ثبت نشده است
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
                      برای شروع، اولین زبان خود را اضافه کنید
                    </p>
                    <button
                      onClick={addLanguage}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg font-medium"
                    >
                      افزودن اولین زبان
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {languagesList.map((language, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                          {/* شماره زبان */}
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              {index + 1}
                            </div>
                          </div>

                          {/* محتوای زبان */}
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* نام زبان */}
                              <div>
                                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                                  نام زبان
                                </label>
                                <input
                                  type="text"
                                  value={language.name}
                                  onChange={(e) => {
                                    const arr = [...languagesList];
                                    arr[index].name = e.target.value;
                                    setLanguagesList(arr);
                                  }}
                                  placeholder="مثال: انگلیسی، فارسی، آلمانی"
                                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                                />
                              </div>

                              {/* سطح زبان */}
                              <div>
                                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                                  سطح تسلط
                                </label>
                                <select
                                  value={language.level}
                                  onChange={(e) => {
                                    const arr = [...languagesList];
                                    arr[index].level = e.target.value;
                                    setLanguagesList(arr);
                                  }}
                                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                                >
                                  <option value="">انتخاب سطح</option>
                                  <option value="Native">بومی (Native)</option>
                                  <option value="Fluent">مسلط (Fluent)</option>
                                  <option value="Intermediate">متوسط (Intermediate)</option>
                                  <option value="Basic">مقدماتی (Basic)</option>
                                </select>
                              </div>
                            </div>

                            {/* درصد تسلط */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium dark:text-gray-300">
                                  درصد تسلط
                                </label>
                                <div className="flex items-center gap-3">
                                  {language.level && (
                                    <span className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${getLevelColor(language.level)} text-white`}>
                                      {getLevelText(language.level)}
                                    </span>
                                  )}
                                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {language.percent}%
                                  </span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <input
                                  type="range"
                                  min={0}
                                  max={100}
                                  step={5}
                                  value={language.percent}
                                  onChange={(e) => {
                                    const arr = [...languagesList];
                                    arr[index].percent = parseInt(e.target.value);
                                    setLanguagesList(arr);
                                  }}
                                  className="w-full h-3 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300"
                                />
                                
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                  <span>مقدماتی</span>
                                  <span>متوسط</span>
                                  <span>مسلط</span>
                                  <span>بومی</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* نوار پیشرفت */}
                          <div className="flex-shrink-0 w-full lg:w-48">
                            <div className="space-y-2">
                              <div className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                                سطح فعلی
                              </div>
                              <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r ${getLevelColor(language.level)} rounded-full transition-all duration-500 ease-out`}
                                  style={{ width: `${language.percent}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* دکمه حذف */}
                          <div className="flex-shrink-0">
                            <button
                              onClick={() => removeLanguage(index)}
                              className="px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center font-medium w-full justify-center"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* دکمه ذخیره و افزودن */}
                {languagesList.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-end items-stretch sm:items-center pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                    {/* دکمه افزودن زبان */}
                    <button
                      onClick={addLanguage}
                      className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-medium text-lg h-[60px] sm:h-auto"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      افزودن زبان جدید
                    </button>

                    {/* دکمه ذخیره */}
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow flex items-center justify-center text-lg h-[60px] sm:h-auto"
                    >
                      {saving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          در حال ذخیره...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
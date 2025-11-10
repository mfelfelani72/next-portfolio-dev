"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

// Functions

import { login } from "@/libs/auth/auth";

export default function LoginPage() {
  // Hooks

  const router = useRouter();
  const params = useParams();
  const { t } = useTranslation();

  // States

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Functions

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!username || !password) {
    setError("Please fill in all fields");
    return;
  }
  setIsLoading(true);
  setError("");

  const ok = await login(username, password);
  if (ok) {
    router.push(`/${params.lang}/admin`);
  } else {
    setError("Invalid username or password");
  }
  setIsLoading(false);
};


  return (
    <>
      <div className="min-h-screen select-none flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white transition-colors duration-500 px-2">
        <div className="flex w-full max-w-4xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-indigo-100 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          {!isMobile && (
            <div className="w-1/2 hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 p-6 text-white">
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold">{t("welcome_back")}</h2>
                <p className="text-sm opacity-90">
                  {t("description_auth_login")}
                </p>
              </div>
              <div className="mt-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-24 opacity-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-3 0A2.25 2.25 0 002.25 12v6.75A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V12a2.25 2.25 0 00-2.25-2.25h-15z"
                  />
                </svg>
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-8">
            <div className="w-full max-w-sm space-y-4">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
                  {t("admin_login")}
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t("login_to_continue")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">
                    {t("username")}
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                      error
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : ""
                    }`}
                    placeholder={t("enter_your_username")}
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">
                    {t("password")}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                      error
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : ""
                    }`}
                    placeholder={t("enter_your_password")}
                    autoComplete="current-password" 
                  />
                </div>

                {error && (
                  <div className="p-2 text-xs rounded-lg border bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300 cursor-pointer ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] shadow-md hover:shadow-lg"
                  }`}
                >
                  {isLoading ? t("logging_in") : t("login")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

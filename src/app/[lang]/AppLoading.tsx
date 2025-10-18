/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 12:17:05
 * @Description:
 */
"use client";

import { useEffect, ReactNode } from "react";

// Components

import LoaderPage from "@/components/base/LoaderPage";

// Zustand

import { useAppStore } from "@/app/[lang]/stores/AppStore";

export default function ClientSideFakeLoading({
  children,
}: {
  children: ReactNode;
}) {
  // States
  const { loading, setLoading } = useAppStore();

  // Functions

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-background">
        <LoaderPage />
      </div>
    );
  }

  return <>{children}</>;
}

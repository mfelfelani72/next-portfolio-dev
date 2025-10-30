/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-04 07:09:00
 * @Description:
 */
"use Client";

import { useTranslation } from "@/hooks/useTranslation";
import React from "react";

// Interfaces

const LoaderPage = ({ className = "" }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 to-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default LoaderPage;

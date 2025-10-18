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
interface LoaderPageProps {
  className?: string;
  title?: string;
  words?: string[];
  notFound?: string;
}

const LoaderPage: React.FC<LoaderPageProps> = ({
  className = "",
  title = "loading",
  words = ["aimoonhub", "coin", "sentiment", "news"],
  notFound,
}) => {
  const { t } = useTranslation();
  const isHorizontal = words[0] === "point";

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <div className="text-gray-400 font-medium text-xl md:text-2xl h-10 py-2.5 px-2.5 flex items-center text-center">
        <span>{t(title)}</span>
        <div className="overflow-hidden relative ml-1.5 h-10">
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none"></div>

          {/* Animated words */}
          {notFound ? (
            <span className="block h-10 pl-1.5 text-purple-400 capitalize pt-1">
              {notFound}
            </span>
          ) : (
            <div
              className={`h-full mb-[3rem] animate-text-scroll-${
                isHorizontal ? "x" : "y"
              } mt-2`}
            >
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`block h-10 ${
                    !isHorizontal ? "pl-1.5" : ""
                  } text-purple-400`}
                >
                  {word !== "point" ? t(word) : "..."}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoaderPage;

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";

// Components

import { Input } from "@/components/ui/app/input";
import { Button } from "@/components/ui/app/button";

// Constants

import { menuItems } from "@/configs/admin/menuItems";

// Interfaces

import { MenuItem } from "@/Interfaces/admin/menu";

interface SearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
}

// Hooks

import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const flattenMenuItems = (items: MenuItem[]): MenuItem[] => {
  if (!items || !Array.isArray(items)) return [];

  const results: MenuItem[] = [];

  const processItem = (item: MenuItem) => {
    if (item.url) {
      results.push(item);
    }

    if (item.children && Array.isArray(item.children)) {
      item.children.forEach(processItem);
    }
  };

  items.forEach(processItem);
  return results;
};

export function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
  // Hooks

  const { t } = useTranslation();
  const router = useRouter();
  const localizedUrl = useLocalizedLink();

  // States and Refs and Memos

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const flattenedItems = useMemo(() => flattenMenuItems(menuItems), []);

  // Functions

  const filteredResults = flattenedItems.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category &&
        item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      handleSelectResult(filteredResults[selectedIndex]);
    }
  };

  const handleSelectResult = (result: MenuItem) => {
    if (result.url) {
      const url = localizedUrl(result.url);
      router.push(typeof url === "string" ? url : url.pathname || "/");
      onClose();
      setSearchQuery("");
      setSelectedIndex(0);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const renderIcon = (icon: React.ReactNode) => {
    if (typeof icon === "string") {
      return (
        <div
          className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      );
    }
    return <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5">{icon}</div>;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center pt-16 sm:pt-20 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)] w-full max-w-2xl mx-3 sm:mx-4 border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder={t("search_pages")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-0 shadow-none focus-visible:ring-0 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-sm sm:text-base"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xs sm:text-sm"
          >
            ESC
          </Button>
        </div>

        <div className="max-h-60 sm:max-h-80 overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              {t("no_result_found")}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((result, index) => (
                <div
                  key={result.id}
                  className={`
                    flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer text-xs sm:text-sm transition-colors
                    ${
                      index === selectedIndex
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }
                  `}
                  onClick={() => handleSelectResult(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {renderIcon(result.icon)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {t(result.title)}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 truncate text-xs">
                      {t(result.description) || t(result.title)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded transition-colors whitespace-nowrap">
                    {t(result.category) || t("public")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 transition-colors gap-1 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span>↑↓ {t("for_nav")} </span>
            <span>↵ {t("for_select")} </span>
          </div>
          <span>ESC {t("for_close")} </span>
        </div>
      </div>
    </div>
  );
}

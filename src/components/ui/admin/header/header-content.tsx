// header-content.tsx - با استایل جدید
"use client";

import * as React from "react";
import { SearchCommand } from "./search-command";
import LanguageSwitcher from "@/components/base/LanguageSwitcher";
import  ThemeSwitcher  from "@/components/base/ThemeSwitcher";
import { UserMenu } from "./user-menu";
import { Button } from "@/components/ui/app/button";
import { Input } from "@/components/ui/app/input";

interface HeaderContentProps {
  user: any;
}

export function HeaderContent({ user }: HeaderContentProps) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  // مدیریت کلید Ctrl+K برای جستجو
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="bg-white rounded-t-lg mx-1 mt-2 shadow-[5px_-50px_30px_rgba(0,0,0,0.10)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div>
            <span className="text-2xl font-bold text-blue-600 cursor-pointer">
              Brand
            </span>
          </div>

         
          <div className="flex items-center space-x-6">
          
            <div className="relative">
              <Input
                type="text"
                placeholder="جستجو... (Ctrl+K)"
                className="pr-10 cursor-pointer w-64 bg-gray-50 border-gray-200 rounded-lg"
                onClick={() => setIsSearchOpen(true)}
                readOnly
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>

          
            <div className="flex items-center space-x-4">
              
              <ThemeSwitcher />

              <LanguageSwitcher />

            
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </Button>

              {/* منوی کاربر */}
              <UserMenu user={user} />
            </div>
          </div>
        </div>
      </header>

      {/* جستجوی سراسری */}
      <SearchCommand
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

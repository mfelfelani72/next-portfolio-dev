"use client";

import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";

// Components

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/app/dropdown-menu";
import { Button } from "@/components/ui/app/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/app/avatar";
import { LogoutIcon } from "forma-ui";

// Functions

import { logout } from "@/libs/auth/auth";

// Hooks

import { useLocalizedLink } from "@/hooks/useLocalizedLink";

// Zustand

import { useUserStore } from "@/app/[lang]/stores/UserStore";

export function UserMenu() {
  // Hooks

  const { t } = useTranslation();
  const localizedUrl = useLocalizedLink();
  const router = useRouter();

  // States

  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUserStore();

  // Functions

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await logout();
    setIsOpen(false);

    const url = localizedUrl("/auth/login");
    const targetPath =
      typeof url === "string" ? url : url?.pathname ? url.pathname : "/";

    router.push(targetPath);
  };

  return (
    <>
      {user && (
        <>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full border-2 border-transparent hover:border-blue-100 dark:hover:border-blue-900 transition-colors"
              >
                <Avatar className="h-7 w-7">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-white dark:bg-gray-900 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-200 dark:border-gray-700 transition-colors">
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col rtl:items-start space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-800 dark:text-gray-200">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                    {user.title}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

              {/* heir to add something */}

              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex items-center gap-2 p-3 cursor-pointer text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogoutIcon className={"ltr:rotate-180"} />
                {t("log_out")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}

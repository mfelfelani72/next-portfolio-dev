"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/app/breadcrumb";
import { useTranslation } from "@/hooks/useTranslation";

// Interfaces
interface BreadcrumbItemType {
  title: string;
  href: string;
  isCurrent?: boolean;
}

interface MainBreadcrumbProps {
  isAdmin?: boolean;
}

export function MainBreadcrumb({ isAdmin = false }: MainBreadcrumbProps) {
  // Hooks
  const pathname = usePathname();
  const { t } = useTranslation();

  // States
  const [items, setItems] = useState<BreadcrumbItemType[]>([]);
  const [showOverflow, setShowOverflow] = useState(false);

  // Generate breadcrumb items directly without useCallback
  const generateBreadcrumbItems = (): BreadcrumbItemType[] => {
    const paths = pathname.split("/").filter(Boolean);

    const homeItem: BreadcrumbItemType = isAdmin
      ? { title: t("dashboard"), href: `/${paths[0]}/admin/` }
      : { title: t("home"), href: `/${paths[0]}/home/` };

    const breadcrumbItems: BreadcrumbItemType[] = [homeItem];

    const filteredPaths = paths.filter((path, index) => {
      if (index === 0) return false;
      if (index === 1 && (path === "admin" || path === "home")) return false;
      return true;
    });

    let currentHref = `/${paths[0]}${isAdmin ? "/admin" : "/home"}`;

    filteredPaths.forEach((path, index) => {
      currentHref += `/${path}`;
      const title = path.slice(0);

      breadcrumbItems.push({
        title,
        href: currentHref,
        isCurrent: index === filteredPaths.length - 1,
      });
    });

    return breadcrumbItems;
  };

  // Use useEffect with proper dependencies
  useEffect(() => {
    setItems(generateBreadcrumbItems());
  }, [pathname, isAdmin]); // فقط pathname و isAdmin وابستگی هستند

  const shouldShowOverflow = items.length > 3;
  const visibleItems = shouldShowOverflow
    ? [items[0], items[items.length - 1]]
    : items;
  const hiddenItems = shouldShowOverflow ? items.slice(1, -1) : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-b-lg mx-1 mt-0.5 shadow-2xl px-6 py-3 transition-colors duration-200">
      <Breadcrumb>
        <BreadcrumbList>
          {visibleItems.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && <BreadcrumbSeparator />}

              {shouldShowOverflow && index === 0 && (
                <>
                  <BreadcrumbItem>
                    <Link href={item.href}>
                      <BreadcrumbLink asChild className="dark:text-gray-300 dark:hover:text-blue-400">
                        {item.title}
                      </BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <button
                      onClick={() => setShowOverflow(!showOverflow)}
                      className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                    >
                      ...
                    </button>
                  </BreadcrumbItem>
                  {showOverflow && (
                    <div className="absolute mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] z-10 min-w-32 transition-colors duration-200">
                      {hiddenItems.map((hiddenItem) => (
                        <Link
                          key={hiddenItem.href}
                          href={hiddenItem.href}
                        >
                          <BreadcrumbLink asChild className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg">
                            {hiddenItem.title}
                          </BreadcrumbLink>
                        </Link>
                      ))}
                    </div>
                  )}
                  <BreadcrumbSeparator />
                </>
              )}

              {!shouldShowOverflow || index > 0 ? (
                !item.isCurrent ? (
                  <BreadcrumbItem>
                    <Link href={item.href}>
                      <BreadcrumbLink asChild className="dark:text-gray-300 dark:hover:text-blue-400">
                        {item.title}
                      </BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="dark:text-white">
                      {item.title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )
              ) : null}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
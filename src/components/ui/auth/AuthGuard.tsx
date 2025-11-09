"use client";

import { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

// Functions

import { isAuthenticated } from "@/libs/auth/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // Hooks

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // Functions

  useEffect(() => {
    if (pathname.includes("/admin") && !isAuthenticated()) {
      const lang = params.lang || "en";
      router.push(`/${lang}/auth/login`);
    }
  }, [pathname, params.lang, router]);

  if (pathname.includes("/admin") && !isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}

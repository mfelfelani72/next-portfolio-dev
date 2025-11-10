"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

// Functions

import { isAuthenticated } from "@/libs/auth/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // Hooks

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // States

  const [loading, setLoading] = useState(true);

  // Functions

  useEffect(() => {
    if (!pathname.includes("/admin")) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      const auth = await isAuthenticated();
      if (!auth) {
        const lang = params.lang || "en";
        router.push(`/${lang}/auth/login`);
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, params.lang, router]);

  if (pathname.includes("/admin") && loading) {
    return null;
  }

  return <>{children}</>;
}

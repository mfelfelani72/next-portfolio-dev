/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 08:18:52
 * @Description:
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Hooks

import useDevice from "@/hooks/useDevice";

// Zustand

import { useAppStore } from "@/app/[lang]/stores/AppStore";

const DetectDevice = () => {
  const router = useRouter();
  // States
  const { isMobile, isIpad, isDesktop } = useDevice();
  const setDevice = useAppStore((state) => state.setDevice);

  // Functions

  useEffect(() => {
    const deviceType = isMobile
      ? "mobile"
      : isDesktop
      ? "desktop"
      : isIpad
      ? "ipad"
      : "unknown";

    if (deviceType !== "unknown") {
      const savedDevice = Cookies.get("device-type");

      if (savedDevice !== deviceType) {
        setDevice(deviceType);

        Cookies.set("device-type", deviceType, {
          expires: 365,
          path: "/",
          sameSite: "lax",
        });

        router.refresh();
      }
    }
  }, [isMobile, isIpad, isDesktop, setDevice, router]);

  return null;
};

export default DetectDevice;

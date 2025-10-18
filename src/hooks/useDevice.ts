/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 06:31:56
 * @Description:
 */

import { useState, useEffect, useMemo } from "react";

// Interfaces

type DeviceType = "mobile" | "ipad" | "desktop";
type Orientation = "landscape" | "portrait";

interface DeviceInfo {
  type: DeviceType;
  orientation: Orientation;
  screenWidth: number;
  screenHeight: number;
  isTouchDevice: boolean;
  isMobile: boolean;
  isIpad: boolean;
  isDesktop: boolean;
}

const useDevice = (): DeviceInfo => {
  // States
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Functions
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const handleResize = (): void => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deviceInfo = useMemo((): DeviceInfo => {
    const orientation: Orientation =
      screenWidth > screenHeight ? "landscape" : "portrait";

    let type: DeviceType;
    if (screenWidth < 540) {
      type = "mobile";
    } else if (screenWidth >= 540 && screenWidth < 992) {
      type = "ipad";
    } else {
      type = "desktop";
    }

    return {
      type,
      orientation,
      screenWidth,
      screenHeight,
      isTouchDevice,
      isMobile: type === "mobile",
      isIpad: type === "ipad",
      isDesktop: type === "desktop",
    };
  }, [screenWidth, screenHeight, isTouchDevice]);

  return deviceInfo;
};

export default useDevice;

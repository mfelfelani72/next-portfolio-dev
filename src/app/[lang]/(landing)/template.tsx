/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 15:55:03
 * @Description:
 */

"use client";
import { useEffect, useState } from "react";

export default function LayoutAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  // States

  const [isMounted, setIsMounted] = useState(false);

  // Functions

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        className={`
          w-full
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </div>
    </div>
  );
}

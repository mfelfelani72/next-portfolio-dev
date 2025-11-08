// theme-switcher.tsx - با استایل جدید
"use client"

import * as React from "react"
import { Switch } from "@/components/ui/app/switch"

export function ThemeSwitcher() {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedTheme = localStorage.getItem("theme")
    
    if (savedTheme === "dark" || (!savedTheme && isSystemDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const handleThemeChange = (checked: boolean) => {
    setIsDark(checked)
    
    if (checked) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
      {/* آیکون خورشید - تم لایت */}
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={!isDark ? "text-yellow-500" : "text-gray-400"}
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>

      <Switch
        checked={isDark}
        onCheckedChange={handleThemeChange}
        className="data-[state=checked]:bg-blue-600"
      />

      {/* آیکون ماه - تم دارک */}
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={isDark ? "text-blue-400" : "text-gray-400"}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </div>
  )
}
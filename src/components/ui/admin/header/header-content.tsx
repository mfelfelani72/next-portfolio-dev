"use client"

import * as React from "react"
import { SearchCommand } from "./search-command"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeSwitcher } from "./theme-switcher"
import { UserMenu } from "./user-menu"
import { Button } from "@/components/ui/app/button"
import { Input } from "@/components/ui/app/input"

interface HeaderContentProps {
  languages: any[]
  user: any
}

export function HeaderContent({ languages, user }: HeaderContentProps) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  // مدیریت کلید Ctrl+K برای جستجو
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        
        {/* دکمه منو برای موبایل */}
        <div className="md:hidden">
          {/* اینجا دکمه هامبورگر سایدبار رو میذاریم */}
        </div>

        {/* جستجو */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="جستجو... (Ctrl+K)"
              className="pr-10 cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
              readOnly
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        {/* سمت چپ هدر */}
        <div className="flex items-center gap-2">
          
          {/* تغییر تم */}
          <ThemeSwitcher />

          {/* تغییر زبان */}
          <LanguageSwitcher languages={languages} />

          {/* نوتیفیکیشن */}
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
          </Button>

          {/* منوی کاربر */}
          <UserMenu user={user} />

        </div>
      </header>

      {/* جستجوی سراسری */}
      <SearchCommand 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}
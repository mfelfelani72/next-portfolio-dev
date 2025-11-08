"use client"

import * as React from "react"
import { Language } from "@/Interfaces/admin/header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/app/dropdown-menu"
import { Button } from "@/components/ui/app/button"

interface LanguageSwitcherProps {
  languages: Language[]
}

export function LanguageSwitcher({ languages }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>(languages[0])
  const [isOpen, setIsOpen] = React.useState(false)

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    setIsOpen(false)
    // اینجا می‌تونی منطق تغییر زبان رو اضافه کنی
    // مثلاً ذخیره در localStorage یا ارسال به API
    localStorage.setItem("preferred-language", language.code)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <span className="text-lg">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-sm font-semibold border-b">
          انتخاب زبان
        </div>
        
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`
              flex items-center gap-3 p-3 cursor-pointer
              ${currentLanguage.code === language.code ? "bg-accent" : ""}
            `}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            
            {currentLanguage.code === language.code && (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
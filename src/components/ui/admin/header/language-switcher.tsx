// language-switcher.tsx - با استایل جدید
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
    localStorage.setItem("preferred-language", language.code)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
        >
          <span className="text-lg">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-200"
      >
        <div className="px-3 py-2 text-sm font-semibold border-b border-gray-200 text-gray-800">
          انتخاب زبان
        </div>
        
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`
              flex items-center gap-3 p-3 cursor-pointer text-sm
              ${currentLanguage.code === language.code ? 
                "bg-blue-50 text-blue-600" : 
                "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }
            `}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1 text-right">{language.name}</span>
            
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
                className="text-blue-600"
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
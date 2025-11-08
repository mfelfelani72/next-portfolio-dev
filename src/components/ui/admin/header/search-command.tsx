// components/admin/search-command.tsx
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SearchResult } from "@/Interfaces/admin/header"
import { Input } from "@/components/ui/app/input"
import { Button } from "@/components/ui/app/button"

interface SearchCommandProps {
  isOpen: boolean
  onClose: () => void
}

const searchData: SearchResult[] = [
  // داده‌های نمونه
  {
    id: "1",
    title: "داشبورد",
    description: "صفحه اصلی مدیریت",
    category: "صفحات",
    url: "/admin",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`
  }
]

export function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredResults = searchData.filter(item =>
    item.title.includes(searchQuery) ||
    item.description.includes(searchQuery) ||
    item.category.includes(searchQuery)
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < filteredResults.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      handleSelectResult(filteredResults[selectedIndex])
    }
  }

  const handleSelectResult = (result: SearchResult) => {
    router.push(result.url)
    onClose()
    setSearchQuery("")
    setSelectedIndex(0)
  }

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center pt-16 sm:pt-20 backdrop-blur-sm"> {/* z-index بالاتر */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)] w-full max-w-2xl mx-3 sm:mx-4 border border-gray-200 dark:border-gray-700 transition-colors">
        
        {/* هدر جستجو */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder="جستجو در بین صفحات، کاربران، تنظیمات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-0 shadow-none focus-visible:ring-0 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-sm sm:text-base"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xs sm:text-sm"
          >
            ESC
          </Button>
        </div>

        {/* نتایج جستجو */}
        <div className="max-h-60 sm:max-h-80 overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              نتیجه‌ای یافت نشد
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((result, index) => (
                <div
                  key={result.id}
                  className={`
                    flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer text-xs sm:text-sm transition-colors
                    ${index === selectedIndex ? 
                      "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : 
                      "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }
                  `}
                  onClick={() => handleSelectResult(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div 
                    className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5"
                    dangerouslySetInnerHTML={{ __html: result.icon }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{result.title}</div>
                    <div className="text-gray-500 dark:text-gray-400 truncate text-xs">
                      {result.description}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded transition-colors whitespace-nowrap">
                    {result.category}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* راهنمای کیبورد */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 transition-colors gap-1 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span>↑↓ برای ناوبری</span>
            <span>↵ برای انتخاب</span>
          </div>
          <span>ESC برای بستن</span>
        </div>
      </div>
    </div>
  )
}
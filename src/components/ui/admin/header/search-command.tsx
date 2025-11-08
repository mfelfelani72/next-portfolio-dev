// search-command.tsx - با استایل جدید
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
  // داده‌های نمونه (همان قبلی)
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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)] w-full max-w-2xl mx-4 border border-gray-200">
        
        {/* هدر جستجو */}
        <div className="flex items-center border-b border-gray-200 p-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder="جستجو در بین صفحات، کاربران، تنظیمات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-0 shadow-none focus-visible:ring-0 bg-gray-50 rounded-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            ESC
          </Button>
        </div>

        {/* نتایج جستجو */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              نتیجه‌ای یافت نشد
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((result, index) => (
                <div
                  key={result.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer text-sm
                    ${index === selectedIndex ? 
                      "bg-blue-50 text-blue-600" : 
                      "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => handleSelectResult(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div 
                    className="flex-shrink-0"
                    dangerouslySetInnerHTML={{ __html: result.icon }}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{result.title}</div>
                    <div className="text-gray-500">
                      {result.description}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {result.category}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* راهنمای کیبورد */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>↑↓ برای ناوبری</span>
            <span>↵ برای انتخاب</span>
          </div>
          <span>ESC برای بستن</span>
        </div>
      </div>
    </div>
  )
}
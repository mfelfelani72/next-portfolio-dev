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

// داده‌های نمونه برای جستجو
const searchData: SearchResult[] = [
  {
    id: "1",
    title: "داشبورد",
    description: "صفحه اصلی مدیریت",
    category: "صفحات",
    url: "/",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`
  },
  {
    id: "2",
    title: "لیست کاربران",
    description: "مدیریت کاربران سیستم",
    category: "کاربران",
    url: "/users",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`
  },
  {
    id: "3",
    title: "تنظیمات سیستم",
    description: "تنظیمات پیشرفته سیستم",
    category: "تنظیمات",
    url: "/settings",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`
  }
]

export function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // فیلتر نتایج بر اساس جستجو
  const filteredResults = searchData.filter(item =>
    item.title.includes(searchQuery) ||
    item.description.includes(searchQuery) ||
    item.category.includes(searchQuery)
  )

  // مدیریت کلیدهای کیبورد
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

  // انتخاب نتیجه جستجو
  const handleSelectResult = (result: SearchResult) => {
    router.push(result.url)
    onClose()
    setSearchQuery("")
    setSelectedIndex(0)
  }

  // فوکوس روی input وقتی modal باز میشه
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl mx-4">
        
        {/* هدر جستجو */}
        <div className="flex items-center border-b p-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder="جستجو در بین صفحات، کاربران، تنظیمات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-0 shadow-none focus-visible:ring-0"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="ml-2"
          >
            ESC
          </Button>
        </div>

        {/* نتایج جستجو */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              نتیجه‌ای یافت نشد
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((result, index) => (
                <div
                  key={result.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer
                    ${index === selectedIndex ? "bg-accent" : "hover:bg-accent/50"}
                  `}
                  onClick={() => handleSelectResult(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div 
                    className="flex-shrink-0 text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: result.icon }}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{result.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {result.description}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {result.category}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* راهنمای کیبورد */}
        <div className="flex items-center justify-between px-4 py-2 border-t text-xs text-muted-foreground">
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
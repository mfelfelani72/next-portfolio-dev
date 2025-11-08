// sidebar-content.tsx - کاملاً بازنویسی شده
"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { MenuItem } from "@/Interfaces/admin/menu"
import { SidebarItem } from "./sidebar-item"
import { Button } from "@/components/ui/app/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/app/sheet"

interface SidebarContentProps {
  initialItems: MenuItem[]
}

export function SidebarContent({ initialItems }: SidebarContentProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(initialItems)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  // تابع برای باز/بسته کردن منوها
  const toggleMenuItem = (itemId: string) => {
    setMenuItems(prev => 
      prev.map(item => ({
        ...item,
        isOpen: item.id === itemId ? !item.isOpen : item.isOpen,
        children: item.children ? 
          item.children.map(child => ({
            ...child,
            isOpen: child.id === itemId ? !child.isOpen : child.isOpen
          })) : undefined
      }))
    )
  }

  // سایدبار دسکتاپ
  const desktopSidebar = (
    <aside 
      className={`
        hidden md:flex flex-col h-[calc(100vh-16px)] m-2 
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-700
        shadow-xl dark:shadow-gray-900/50 
        rounded-lg transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
      `}
      dir="rtl"
    >
      {/* هدر سایدبار */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            داشبورد
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </Button>
      </div>

      {/* منوها */}
      <nav className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            level={0}
            isCollapsed={isCollapsed}
            isActive={pathname === item.url}
            onToggle={toggleMenuItem}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-gray-500 dark:text-gray-400 text-center border-t border-gray-200 dark:border-gray-700">
        Build Smarter, Ship Faster
      </div>
    </aside>
  )

  // سایدبار موبایل
  const mobileSidebar = (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-80 p-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700"
      
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              داشبورد
            </span>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                level={0}
                isCollapsed={false}
                isActive={pathname === item.url}
                onToggle={toggleMenuItem}
                onItemClick={() => setIsMobileOpen(false)}
              />
            ))}
          </nav>
          <div className="p-4 text-xs text-gray-500 dark:text-gray-400 text-center border-t border-gray-200 dark:border-gray-700">
            Build Smarter, Ship Faster
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <>
      {mobileSidebar}
      {desktopSidebar}
    </>
  )
}
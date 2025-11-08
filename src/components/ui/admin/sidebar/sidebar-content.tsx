"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { MenuItem } from "@/Interfaces/admin/menu"
import { SidebarItem } from "./sidebar-item"
import { useAppAdminStore } from "@/app/[lang]/stores/admin/AppAdminStore"; 
import { Button } from "@/components/ui/app/button"

interface SidebarContentProps {
  initialItems: MenuItem[]
}

export function SidebarContent({ initialItems }: SidebarContentProps) {
  const pathname = usePathname()
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(initialItems)
  
  // استفاده از app store
  const { 
    isSidebarCollapsed, 
    isMobileSidebarOpen, 
    setMobileSidebarOpen 
  } = useAppAdminStore()

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

  const handleItemClick = () => {
    setMobileSidebarOpen(false)
  }

  // بستن سایدبار موبایل وقتی روی backdrop کلیک می‌شود
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMobileSidebarOpen(false)
    }
  }

  // سایدبار دسکتاپ
  const desktopSidebar = (
    <aside 
      className={`
        hidden md:flex flex-col h-[calc(100vh-16px)] m-2 
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        shadow-xl dark:shadow-gray-900/50 
        rounded-lg transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? "w-16" : "w-64"}
      `}
      dir="rtl"
    >
      {/* هدر سایدبار - بدون دکمه تاگل */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
        {!isSidebarCollapsed ? (
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            داشبورد
          </span>
        ) : (
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            د
          </span>
        )}
      </div>

      {/* منوها */}
      <nav className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            level={0}
            isCollapsed={isSidebarCollapsed}
            isActive={pathname === item.url}
            onToggle={toggleMenuItem}
            onItemClick={handleItemClick}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-gray-500 dark:text-gray-400 text-center border-t border-gray-200 dark:border-gray-700">
        {!isSidebarCollapsed ? "Build Smarter, Ship Faster" : "BSF"}
      </div>
    </aside>
  )

  // سایدبار موبایل - نسخه ساده و قابل اطمینان
  const mobileSidebar = (
    <>
      {/* Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[500] md:hidden transition-opacity duration-300"
          onClick={handleBackdropClick}
        />
      )}
      
      {/* Sidebar Panel */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 
          border-l border-gray-200 dark:border-gray-700 shadow-2xl
          transform transition-transform duration-300 ease-in-out z-[510] md:hidden
          ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        dir="rtl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              داشبورد
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileSidebarOpen(false)}
              className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                level={0}
                isCollapsed={false}
                isActive={pathname === item.url}
                onToggle={toggleMenuItem}
                onItemClick={handleItemClick}
              />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 text-xs text-gray-500 dark:text-gray-400 text-center border-t border-gray-200 dark:border-gray-700">
            Build Smarter, Ship Faster
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {mobileSidebar}
      {desktopSidebar}
    </>
  )
}
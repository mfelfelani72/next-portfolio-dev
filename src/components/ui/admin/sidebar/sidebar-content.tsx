// sidebar-content.tsx - با استایل جدید
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
    <aside className={`
      hidden md:flex flex-col h-[calc(100vh-16px)] m-2 shadow-2xl bg-white rounded-lg transition-all duration-300
      ${isCollapsed ? "w-16" : "w-64"}
    `}>
      {/* هدر سایدبار */}
      <div className="p-4 border-b border-gray-200">
        {!isCollapsed && (
          <span className="text-xl font-bold text-indigo-600">داشبورد</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 hover:bg-gray-100 float-left"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "→" : "←"}
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
      <div className="p-4 text-xs text-gray-500 text-center border-t border-gray-200">
        Build Smarter, Ship Faster
      </div>
    </aside>
  )

  // سایدبار موبایل
  const mobileSidebar = (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden bg-white shadow-lg rounded-lg">
          ☰
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-white">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <span className="text-xl font-bold text-indigo-600">داشبورد</span>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                level={0}
                isCollapsed={false}
                isActive={pathname === item.url}
                onToggle={(itemId) => {
                  toggleMenuItem(itemId)
                }}
                onItemClick={() => setIsMobileOpen(false)}
              />
            ))}
          </nav>
          <div className="p-4 text-xs text-gray-500 text-center border-t border-gray-200">
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
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
    <div className={`
      hidden md:flex flex-col h-full bg-background border-r transition-all duration-300
      ${isCollapsed ? "w-16" : "w-64"}
    `}>
      {/* هدر سایدبار */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">داشبورد</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
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
    </div>
  )

  // سایدبار موبایل
  const mobileSidebar = (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          ☰
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">داشبورد</h2>
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
// sidebar-item.tsx - با استایل جدید
"use client"

import * as React from "react"
import Link from "next/link"
import { MenuItem } from "@/Interfaces/admin/menu"
import { Button } from "@/components/ui/app/button"
import { Badge } from "@/components/ui/app/badge"
import { Collapse } from "@/components/ui/app/collapse"

interface SidebarItemProps {
  item: MenuItem
  level: number
  isCollapsed: boolean
  isActive: boolean
  onToggle: (itemId: string) => void
  onItemClick?: () => void
}

export function SidebarItem({ 
  item, 
  level, 
  isCollapsed, 
  isActive, 
  onToggle,
  onItemClick 
}: SidebarItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const paddingLeft = level * 16 + 8 // 8px پایه + 16px برای هر سطح

  const handleClick = () => {
    if (hasChildren) {
      onToggle(item.id)
    } else {
      onItemClick?.()
    }
  }

  // رندر آیکون SVG
  const renderIcon = () => {
    return (
      <div 
        className="flex-shrink-0"
        dangerouslySetInnerHTML={{ __html: item.icon }}
      />
    )
  }

  // آیتم بدون فرزند
  if (!hasChildren) {
    return (
      <div className="mb-0">
        <Link href={item.url || "#"} passHref>
          <div
            className={`
              flex items-center justify-between py-2 px-3 rounded cursor-pointer transition-colors
              ${isActive ? "text-indigo-600" : "text-gray-800 hover:text-indigo-600"}
            `}
            style={{ paddingLeft: `${paddingLeft}px` }}
            onClick={handleClick}
          >
            <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
              {renderIcon()}
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1 text-right">{item.title}</span>
                  {item.badge && (
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 mr-2">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // آیتم با فرزند
  return (
    <div className="mb-0">
      <div
        className={`
          flex items-center justify-between py-2 px-3 rounded cursor-pointer transition-colors
          text-gray-800 hover:text-indigo-600
        `}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={handleClick}
      >
        <div className={`flex items-center gap-3 w-full ${isCollapsed ? "justify-center" : ""}`}>
          {renderIcon()}
          
          {!isCollapsed && (
            <>
              <span className="text-sm font-medium flex-1 text-right">{item.title}</span>
              
              {/* فلش جهت */}
              <span className="ml-1 flex-shrink-0 cursor-pointer">
                {item.isOpen ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </span>

              {item.badge && (
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 mr-2">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </div>
      </div>

      {/* فرزندان */}
      {!isCollapsed && item.children && (
        <Collapse isOpen={!!item.isOpen}>
          <div className="border-r border-gray-300 mr-2">
            {item.children.map((child) => (
              <SidebarItem
                key={child.id}
                item={child}
                level={level + 1}
                isCollapsed={isCollapsed}
                isActive={isActive}
                onToggle={onToggle}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </Collapse>
      )}
    </div>
  )
}
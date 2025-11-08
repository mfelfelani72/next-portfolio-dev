// sidebar-item.tsx - کاملاً بازنویسی شده
"use client"

import * as React from "react"

import { MenuItem } from "@/Interfaces/admin/menu"
import { Badge } from "@/components/ui/app/badge"
import LocalizedLink from "@/components/base/LocalizedLink"

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
  const paddingRight = level * 20 + 12 // برای RTL

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

  // استایل‌های مشترک
  const baseStyles = `
    flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer transition-all duration-200
    ${isActive 
      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-400' 
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
    }
  `

  // آیتم بدون فرزند
  if (!hasChildren) {
    return (
      <div className="mb-1">
        <LocalizedLink href={item.url || "#"} passHref>
          <div
            className={baseStyles}
            style={{ paddingRight: `${paddingRight}px` }}
            onClick={handleClick}
          >
            <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
              <div className={`
                transition-colors
                ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}
              `}>
                {renderIcon()}
              </div>
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1 text-right">
                    {item.title}
                  </span>
                  {item.badge && (
                    <Badge className={`
                      mr-2
                      ${isActive 
                        ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }
                    `}>
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>
        </LocalizedLink>
      </div>
    )
  }

  // آیتم با فرزند
  return (
    <div className="mb-1">
      <div
        className={baseStyles}
        style={{ paddingRight: `${paddingRight}px` }}
        onClick={handleClick}
      >
        <div className={`flex items-center gap-3 w-full ${isCollapsed ? "justify-center" : ""}`}>
          <div className={`
            transition-colors
            ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}
          `}>
            {renderIcon()}
          </div>
          
          {!isCollapsed && (
            <>
              <span className="text-sm font-medium flex-1 text-right">
                {item.title}
              </span>
              
              {/* فلش جهت برای RTL */}
              <span className={`
                transition-transform duration-200 ml-2
                ${item.isOpen ? 'rotate-90' : 'rotate-0'}
                ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}
              `}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>

              {item.badge && (
                <Badge className={`
                  mr-2
                  ${isActive 
                    ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }
                `}>
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </div>
      </div>

      {/* فرزندان */}
      {!isCollapsed && item.children && item.isOpen && (
        <div 
          className="border-r-2 border-gray-200 dark:border-gray-700 mr-4 mt-1 transition-all duration-300"
          style={{ marginRight: `${paddingRight - 8}px` }}
        >
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
      )}
    </div>
  )
}
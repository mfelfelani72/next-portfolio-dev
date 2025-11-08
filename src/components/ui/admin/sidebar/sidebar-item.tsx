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
  const paddingLeft = level * 20 + 16 // 16px پایه + 20px برای هر سطح

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
      <div className="mb-1">
        <Link href={item.url || "#"} passHref>
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className={`
              w-full justify-start h-10 px-3 font-normal
              ${isCollapsed ? "px-2" : ""}
            `}
            style={{ paddingLeft: isCollapsed ? "0.5rem" : `${paddingLeft}px` }}
            onClick={handleClick}
          >
            <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
              {renderIcon()}
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-right">{item.title}</span>
                  {item.badge && (
                    <Badge variant="default" className="mr-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </Button>
        </Link>
      </div>
    )
  }

  // آیتم با فرزند
  return (
    <div className="mb-1">
      <Button
        variant="ghost"
        className={`
          w-full justify-start h-10 px-3 font-normal
          ${isCollapsed ? "px-2" : ""}
        `}
        style={{ paddingLeft: isCollapsed ? "0.5rem" : `${paddingLeft}px` }}
        onClick={handleClick}
      >
        <div className={`flex items-center gap-3 w-full ${isCollapsed ? "justify-center" : ""}`}>
          {renderIcon()}
          
          {!isCollapsed && (
            <>
              <span className="flex-1 text-right">{item.title}</span>
              
              {/* فلش جهت */}
              <div className={`transition-transform duration-200 ${item.isOpen ? "rotate-90" : ""}`}>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>

              {item.badge && (
                <Badge variant="default" className="mr-2">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </div>
      </Button>

      {/* فرزندان */}
      {!isCollapsed && item.children && (
        <Collapse isOpen={!!item.isOpen}>
          <div className="mt-1">
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
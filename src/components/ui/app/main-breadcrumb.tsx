"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/app/breadcrumb"

// تغییر نام interface به BreadcrumbItemType
interface BreadcrumbItemType {
  title: string
  href: string
  isCurrent?: boolean
}

interface MainBreadcrumbProps {
  isAdmin?: boolean
}

export function MainBreadcrumb({ isAdmin = false }: MainBreadcrumbProps) {
  const pathname = usePathname()
  const [items, setItems] = React.useState<BreadcrumbItemType[]>([])
  const [showOverflow, setShowOverflow] = React.useState(false)

  // تابع برای تبدیل مسیر به آیتم‌های بردکرامب
  const generateBreadcrumbItems = React.useCallback((): BreadcrumbItemType[] => {
    const paths = pathname.split('/').filter(Boolean)
    
    // تعیین خانه بر اساس نوع (ادمین یا سایت اصلی)
    const homeItem: BreadcrumbItemType = isAdmin 
      ? { title: "داشبورد", href: `/${paths[0]}/admin/` }
      : { title: "خانه", href: `/${paths[0]}/home/` }

    const breadcrumbItems: BreadcrumbItemType[] = [homeItem]

    // حذف پارامتر زبان و admin/home از مسیر
    const filteredPaths = paths.filter((path, index) => {
      if (index === 0) return false // حذف زبان
      if (index === 1 && (path === 'admin' || path === 'home')) return false // حذف admin/home
      return true
    })

    // ساخت مسیرهای بردکرامب
    let currentHref = `/${paths[0]}${isAdmin ? '/admin' : '/home'}`
    
    filteredPaths.forEach((path, index) => {
      currentHref += `/${path}`
      const title = path.charAt(0).toUpperCase() + path.slice(1)
      
      breadcrumbItems.push({
        title,
        href: currentHref,
        isCurrent: index === filteredPaths.length - 1
      })
    })

    return breadcrumbItems
  }, [pathname, isAdmin])

  React.useEffect(() => {
    setItems(generateBreadcrumbItems())
  }, [generateBreadcrumbItems])

  // منطق برای مخفی‌سازی در موبایل
  const shouldShowOverflow = items.length > 3

  const visibleItems = shouldShowOverflow 
    ? [items[0], items[items.length - 1]]
    : items

  const hiddenItems = shouldShowOverflow 
    ? items.slice(1, -1)
    : []

  return (
    <div className="bg-white rounded-b-lg mx-1 mt-0.5 shadow-2xl px-6 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          {visibleItems.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && <BreadcrumbSeparator />}
              
              {shouldShowOverflow && index === 0 && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.href}>
                      {item.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <button
                      onClick={() => setShowOverflow(!showOverflow)}
                      className="px-2 py-1 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      ...
                    </button>
                  </BreadcrumbItem>
                  {showOverflow && (
                    <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-10 min-w-32">
                      {hiddenItems.map((hiddenItem) => (
                        <BreadcrumbLink
                          key={hiddenItem.href}
                          href={hiddenItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {hiddenItem.title}
                        </BreadcrumbLink>
                      ))}
                    </div>
                  )}
                  <BreadcrumbSeparator />
                </>
              )}

              {!shouldShowOverflow || index > 0 ? (
                !item.isCurrent ? (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.href}>
                      {item.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {item.title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )
              ) : null}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
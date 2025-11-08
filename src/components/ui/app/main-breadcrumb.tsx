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

interface BreadcrumbItem {
  title: string
  href: string
  isCurrent?: boolean
}

export function MainBreadcrumb() {
  const pathname = usePathname()
  const [items, setItems] = React.useState<BreadcrumbItem[]>([])
  const [showOverflow, setShowOverflow] = React.useState(false)

  // تابع برای تبدیل مسیر به آیتم‌های بردکرامب
  const generateBreadcrumbItems = React.useCallback((): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean)
    
    const breadcrumbItems: BreadcrumbItem[] = [
      { title: "خانه", href: "/" }
    ]

    paths.forEach((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/')
      const title = path.charAt(0).toUpperCase() + path.slice(1)
      breadcrumbItems.push({
        title,
        href,
        isCurrent: index === paths.length - 1
      })
    })

    return breadcrumbItems
  }, [pathname])

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
    <div className="flex items-center gap-2 py-4 px-6 border-b">
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
                      className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      ...
                    </button>
                  </BreadcrumbItem>
                  {showOverflow && (
                    <div className="absolute mt-2 bg-background border rounded-md shadow-lg z-10">
                      {hiddenItems.map((hiddenItem) => (
                        <BreadcrumbLink
                          key={hiddenItem.href}
                          href={hiddenItem.href}
                          className="block px-4 py-2 hover:bg-muted"
                        >
                          {hiddenItem.title}
                        </BreadcrumbLink>
                      ))}
                    </div>
                  )}
                  <BreadcrumbSeparator />
                </>
              )}

              {!item.isCurrent ? (
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
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
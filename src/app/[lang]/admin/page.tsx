/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 08:37:33
 * @Description:
 */

"use client"

import { type ChangeEvent, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SlidersHorizontal, ArrowUpAZ, ArrowDownAZ } from 'lucide-react'
import { Button } from '@/components/ui/admin/kit/button'
import { Input } from '@/components/ui/admin/kit/input'
import { Separator } from '@/components/ui/admin/kit/separator'
import { Header } from '@/components/ui/admin/layout/header'
import { ProfileDropdown } from '@/components/ui/admin/profile-dropdown'
import { Search } from '@/components/ui/admin/search'
import { ThemeSwitch } from '@/components/ui/admin/theme-switch'
import { ConfigDrawer } from '@/components/ui/admin/config-drawer'

// Import all providers
import { SearchProvider } from '@/context/admin/search-provider'
import { LayoutProvider } from '@/context/admin/layout-provider'
import { DirectionProvider } from '@/context/admin/direction-provider'
import { ThemeProvider } from '@/context/admin/theme-provider'
import { SidebarProvider } from '@/components/ui/admin/kit/sidebar'

type AppType = 'all' | 'connected' | 'notConnected'

const appText = new Map<AppType, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected'],
])

export default function AppsPage({ children, params }: any) {
  return (
    <DirectionProvider>
      <ThemeProvider>
        <LayoutProvider>
          <SidebarProvider>
            <SearchProvider>
              <AppsContent />
            </SearchProvider>
          </SidebarProvider>
        </LayoutProvider>
      </ThemeProvider>
    </DirectionProvider>
  )
}

function AppsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const filter = searchParams.get('filter') || ''
  const type = (searchParams.get('type') as AppType) || 'all'
  const sort = (searchParams.get('sort') as 'asc' | 'desc') || 'asc'

  const [appType, setAppType] = useState<AppType>(type)
  const [searchTerm, setSearchTerm] = useState(filter)

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    updateSearchParams({ filter: value || undefined })
  }

  const handleTypeChange = (value: AppType) => {
    setAppType(value)
    updateSearchParams({ type: value === 'all' ? undefined : value })
  }

  const handleSortChange = (sort: 'asc' | 'desc') => {
    updateSearchParams({ sort })
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ms-auto flex items-center gap-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Content ===== */}
      {/* محتوای اصلی صفحه اینجا قرار می‌گیرد */}
    </>
  )
}
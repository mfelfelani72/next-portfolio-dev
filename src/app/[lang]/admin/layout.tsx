import React from "react"
import { Sidebar } from "@/components/ui/admin/sidebar/sidebar"
import { Header } from "@/components/ui/admin/header/header"
import { MainBreadcrumb } from "@/components/ui/app/main-breadcrumb"

interface AdminLayoutProps {
  children: React.ReactNode
  params: {
    lang: string
  }
}

// این باید default export باشه
export default function AdminLayout({ children, params }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* سایدبار */}
      <Sidebar />
      
      {/* بخش اصلی */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* هدر */}
        <Header />
        
        {/* بردکرامب */}
        <MainBreadcrumb />
        
        {/* محتوای اصلی */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

// اگر می‌خوای named export هم داشته باشی می‌تونی اینطور بنویسی:
// export { AdminLayout as default }
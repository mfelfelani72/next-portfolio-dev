// Components

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/app/card"

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* کارت کاربران */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">کل کاربران</CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-blue-600">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">1,234</div>
            <p className="text-xs text-blue-600 flex items-center gap-1">
              <span className="bg-green-100 text-green-600 px-1 rounded text-xs">↑</span>
              +20.1% از ماه گذشته
            </p>
          </CardContent>
        </Card>

        {/* کارت فروش */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">فروش کل</CardTitle>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-green-600">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">۱۲,۳۴۵,۰۰۰</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="bg-green-100 text-green-600 px-1 rounded text-xs">↑</span>
              +15% از ماه گذشته
            </p>
          </CardContent>
        </Card>

        {/* کارت سفارشات */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">سفارشات فعال</CardTitle>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-purple-600">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">۵۶</div>
            <p className="text-xs text-purple-600 flex items-center gap-1">
              <span className="bg-green-100 text-green-600 px-1 rounded text-xs">↑</span>
              +2 از دیروز
            </p>
          </CardContent>
        </Card>

        {/* کارت نرخ تبدیل */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">نرخ تبدیل</CardTitle>
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-orange-600">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">۴۵.۲%</div>
            <p className="text-xs text-orange-600 flex items-center gap-1">
              <span className="bg-green-100 text-green-600 px-1 rounded text-xs">↑</span>
              +5% از ماه گذشته
            </p>
          </CardContent>
        </Card>
      </div>

      {/* کارت نمودار */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
            نمایش عملکرد
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-80 flex items-center justify-center text-slate-500 bg-white/50 rounded-lg border border-slate-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"/>
                  <path d="m19 9-5 5-4-4-3 3"/>
                </svg>
              </div>
              <p className="text-sm font-medium">اینجا نمودار قرار می‌گیرد</p>
              <p className="text-xs text-slate-400 mt-1">Chart.js | ApexCharts | Recharts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
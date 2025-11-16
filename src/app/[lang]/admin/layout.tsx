import React from "react";
import { Sidebar } from "@/components/ui/admin/sidebar/sidebar";
import { Header } from "@/components/ui/admin/header/header";
import { MainBreadcrumb } from "@/components/ui/app/main-breadcrumb";
import Footer from "@/components/ui/admin/footer/footer";
import AuthGuard from "@/components/ui/auth/AuthGuard";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { lang } = await params;

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Sidebar />

        <div className="flex-1 flex flex-col min-h-0 w-full">
          <Header />

          <div>
            <MainBreadcrumb isAdmin={true} />
          </div>

          <div className="flex-1 flex flex-col min-h-0 pt-1 sm:pt-3">
            <main className="flex-1 overflow-auto px-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200/70 dark:border-gray-700/70 min-h-full p-3 sm:p-6 transition-colors duration-200">
                {children}
              </div>
            </main>

            <div className="flex-shrink-0">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

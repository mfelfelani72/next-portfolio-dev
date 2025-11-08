import React from "react";

// Components

import { Sidebar } from "@/components/ui/admin/sidebar/sidebar";
import { Header } from "@/components/ui/admin/header/header";
import { MainBreadcrumb } from "@/components/ui/app/main-breadcrumb";
import Footer from "@/components/ui/admin/footer/footer";

// Interfaces

interface AdminLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function AdminLayout({ children, params }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-0">
        <Header />

        <MainBreadcrumb isAdmin={true} />

        <div className="flex-1 flex flex-col min-h-0 pt-3">
          <main className="flex-1 overflow-auto px-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/70 min-h-full p-6">
              {children}
            </div>
          </main>

          <div className="flex-shrink-0">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

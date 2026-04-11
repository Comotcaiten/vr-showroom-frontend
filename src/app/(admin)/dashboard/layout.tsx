"use client";
// app/src/(admin)/dashboard/layout.tsx

import { AppSidebar } from "@/components/common/app-sidebar";
import Navbar from "@/components/common/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
    {
      "--sidebar-width": "20rem",
      "--sidebar-width-mobile": "20rem",
    } as React.CSSProperties
  }>
      {/* Sidebar nằm bên trái — SidebarProvider tự render flex-row */}
      <AppSidebar />

      {/* Cột phải: Navbar trên cùng, content bên dưới */}
      <div className="flex flex-col flex-1 min-h-screen min-w-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
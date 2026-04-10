"use client";
import { AppSidebar } from "@/components/common/app-sidebar";
import Navbar from "@/components/common/navbar";

// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between">
      {/* Sidebar */}
      <AppSidebar />

      {/* Content */}
      <main className="">
        <Navbar />
        <div className="">{children}</div>
      </main>
    </div>
  );
}

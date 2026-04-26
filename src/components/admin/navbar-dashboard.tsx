"use client";
// components/admin/navbar-dashboard.tsx

import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthContainer from "../common/auth-container";

export default function NavbarDashboard() {
  return (
    <nav className="sticky top-0 z-40 flex h-15.25 w-full shrink-0 items-center justify-between border-b bg-primary-foreground/80 px-4 backdrop-blur supports-backdrop-filter:bg-primary-foreground/60">
      {/* LEFT — sidebar toggle + breadcrumb area */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
          <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* RIGHT — theme toggle + avatar */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}

        {/* Avatar */}
        <AuthContainer />
      </div>
    </nav>
  );
}

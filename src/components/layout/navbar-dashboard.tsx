"use client";
// components/common/navbar.tsx
import React, { useState } from "react";

import { LogOutIcon, Moon, SettingsIcon, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import AuthContainer from "../common/auth-container";

export default function Navbar() {

  const { setTheme } = useTheme();
  const [isSignedIn, setIsSignedIn] = useState(true);

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar */}
        <AuthContainer
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
      </div>
    </nav>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, X, Zap } from "lucide-react";

import { Container } from "./container";

const NAV_ITEMS = [
  { label: "Item 1", href: "/item-1" },
  { label: "Item 2", href: "/item-2" },
  { label: "Item 3", href: "/item-3" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight shrink-0 group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <Zap className="h-4 w-4" />
            </span>
            <span className="text-foreground">MyBrand</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-12">
              <SheetTitle>
                <Container className="flex justify-center">
                  <p>MENU</p>
                </Container>
              </SheetTitle>
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register" onClick={() => setMobileOpen(false)}>
                      Register
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-md",
        "hover:text-foreground hover:bg-muted transition-colors",
        "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px",
        "after:bg-primary after:scale-x-0 hover:after:scale-x-100",
        "after:transition-transform after:duration-200",
        className,
      )}
    >
      {children}
    </Link>
  );
}

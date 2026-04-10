"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { HomeIcon, LucideIcon, UserIcon, Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


const Logo = () => {
    return (
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight shrink-0 group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <Zap className="h-4 w-4" />
            </span>
            <span className="text-foreground">MyBrand</span>
          </Link>
    );
}

const NavLink = ({
    label,
    href,
    icon: Icon,
    className,
}: {
    label: string;
    href: string;
    icon: LucideIcon;
    className?: string;
}) => {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-2 relative px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-md",
                "hover:text-foreground hover:bg-muted transition-colors",
                "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px",
                "after:bg-primary after:scale-x-0 hover:after:scale-x-100",
                "after:transition-transform after:duration-200",
                className
            )}
        >
            <Icon className="size-4" />
            <span>{label}</span>
        </Link>
    );
}

const AuthContainer = ({ isSignedIn, setIsSignedIn }: { isSignedIn: boolean, setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className="hidden md:flex items-center gap-2 shrink-0">
            {isSignedIn ? (
                <>
                    <Button asChild>
                        <Link href="/">USER: A</Link>
                    </Button>

                    <Button variant="ghost" size="icon">
                        <UserIcon className="size-4" />
                    </Button>

                    {/* Demo logout */}
                    <Button
                        variant="ghost"
                        onClick={() => setIsSignedIn(false)}
                    >
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Button variant="ghost" asChild>
                        <Link href="/login">Login</Link>
                    </Button>

                    <Button asChild>
                        <Link href="/register">Register</Link>
                    </Button>

                    {/* Demo login */}
                    <Button
                        variant="ghost"
                        onClick={() => setIsSignedIn(true)}
                    >
                        Mock Login
                    </Button>
                </>
            )}
        </div>
    );
}

type NavItem = {
    label: string;
    href: string;
    icon: LucideIcon;
};

const DesktopNav = ({ items }: { items: NavItem[] }) => {
    return (
        <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => (
                <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                />
            ))}
        </nav>
    );
};

const MobileMenu = ({ items, mobileOpen, setMobileOpen }: { items: NavItem[], mobileOpen: boolean, setMobileOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            {/* Trigger */}
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            {/* Content */}
            <SheetContent side="right" className="py-4 w-72 pt-12">
                <SheetTitle className="px-4 font-bold text-xl">HotFur</SheetTitle>
                <SheetDescription></SheetDescription>
                <nav className="flex flex-col gap-1 px-">
                    {items.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        />
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
    );
}

export default function Header() {

    const [isSignedIn, setIsSignedIn] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const NAV_ITEMS = [
        { label: "Item 1", href: "/item-1", icon: HomeIcon },
        { label: "Item 2", href: "/item-2", icon: HomeIcon },
        { label: "Item 3", href: "/item-3", icon: HomeIcon },
    ];

    return (
        <header className="sticky top-0 z-50 border-b w-full border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="wrapper px-12">
                <div className="flex h-16 items-center justify-between">
                    <Logo />

                    {/* Desktop Nav */}
                    <DesktopNav items={NAV_ITEMS} />

                    {/* Auth Buttons */}
                    <AuthContainer
                        isSignedIn={isSignedIn}
                        setIsSignedIn={setIsSignedIn}
                    />

                    {/* Mobile Menu */}
                    <MobileMenu items={NAV_ITEMS} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
                </div>
            </div>
        </header>
    );
}
"use client";
// components/common/app-sidebar.tsx

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Zap,
  ArmchairIcon,
  TagIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../common/logo";

const NAV_MAIN = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Brands", href: "/dashboard/brands", icon: Package },
  { label: "Categories", href: "/dashboard/categories", icon: TagIcon },
  { label: "Furnitures", href: "/dashboard/furnitures", icon: ArmchairIcon },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const NAV_SETTINGS = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

// Wraps each menu item with a tooltip shown only when sidebar is collapsed
function NavItem({
  label,
  href,
  icon: Icon,
  isActive,
}: {
  label: string;
  href: string;
  icon: React.ElementType;
  isActive: boolean;
}) {
  const { state } = useSidebar(); // "expanded" | "collapsed"
  const collapsed = state === "collapsed";

  const button = (
    <SidebarMenuButton asChild isActive={isActive}>
      <Link href={href}>
        <Icon className="h-4 w-4 shrink-0" />
        <span>{label}</span>
      </Link>
    </SidebarMenuButton>
  );

  if (!collapsed) return <SidebarMenuItem>{button}</SidebarMenuItem>;

  return (
    <SidebarMenuItem>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {label}
        </TooltipContent>
      </Tooltip>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <TooltipProvider delayDuration={0}>
      {/* collapsible="icon" → sidebar shrinks to icon-only width */}
      <Sidebar collapsible="icon">
        {/* Logo */}
        <SidebarHeader className="border-b py-4 px-3">
          <Logo collapsed={collapsed}/>
        </SidebarHeader>

        <SidebarContent>
          {/* Main nav */}
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_MAIN.map((item) => (
                  <NavItem
                    key={item.href}
                    {...item}
                    isActive={pathname === item.href}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Settings nav */}
          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_SETTINGS.map((item) => (
                  <NavItem
                    key={item.href}
                    {...item}
                    isActive={pathname === item.href}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t px-3 py-3">
          {!collapsed && (
            <p className="text-xs text-muted-foreground truncate">
              © 2025 VR-Showroom
            </p>
          )}
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}

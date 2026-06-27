"use client";

import { 
  LayoutDashboard, 
  Newspaper, 
  Tags, 
  FolderTree,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Megaphone,
  BarChart,
  ShieldAlert,
  MenuSquare
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/layout/logo";

const MENU_ITEMS = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
      { title: "Analytics", icon: BarChart, url: "/admin/analytics" },
    ]
  },
  {
    title: "Content",
    items: [
      { title: "News", icon: Newspaper, url: "/admin/news" },
      { title: "Categories", icon: FolderTree, url: "/admin/categories" },
      { title: "Tags", icon: Tags, url: "/admin/tags" },
    ]
  },
  {
    title: "Media",
    items: [
      { title: "Media Library", icon: ImageIcon, url: "/admin/media" },
      { title: "Advertisements", icon: Megaphone, url: "/admin/ads" },
    ]
  },
  {
    title: "Engagement",
    items: [
      { title: "Comments", icon: MessageSquare, url: "/admin/comments" },
      { title: "Users & Authors", icon: Users, url: "/admin/users" },
    ]
  },
  {
    title: "System",
    items: [
      { title: "Pages & Menus", icon: MenuSquare, url: "/admin/pages" },
      { title: "Roles & Permissions", icon: ShieldAlert, url: "/admin/roles" },
      { title: "Settings", icon: Settings, url: "/admin/settings" },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-border/50 h-16 flex items-center px-4">
        <div className="flex items-center overflow-hidden transition-all duration-200">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {MENU_ITEMS.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url || pathname.startsWith(`${item.url}/`)} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

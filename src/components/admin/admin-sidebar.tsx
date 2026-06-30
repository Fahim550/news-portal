"use client"

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
} from "@/components/ui/sidebar"
import {
  BarChart,
  FolderTree,
  Image as ImageIcon,
  LayoutDashboard,
  Megaphone,
  MenuSquare,
  MessageSquare,
  Newspaper,
  Settings,
  ShieldAlert,
  Tags,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "../../../public/images/logo.png"

const MENU_ITEMS = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
      { title: "Analytics", icon: BarChart, url: "/admin/analytics" },
    ],
  },
  {
    title: "Content",
    items: [
      { title: "News", icon: Newspaper, url: "/admin/news" },
      { title: "Categories", icon: FolderTree, url: "/admin/categories" },
      { title: "Tags", icon: Tags, url: "/admin/tags" },
    ],
  },
  {
    title: "Media",
    items: [
      { title: "Media Library", icon: ImageIcon, url: "/admin/media" },
      { title: "Advertisements", icon: Megaphone, url: "/admin/ads" },
    ],
  },
  {
    title: "Engagement",
    items: [
      { title: "Comments", icon: MessageSquare, url: "/admin/comments" },
      { title: "Users & Authors", icon: Users, url: "/admin/users" },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Pages & Menus", icon: MenuSquare, url: "/admin/pages" },
      { title: "Roles & Permissions", icon: ShieldAlert, url: "/admin/roles" },
      { title: "Settings", icon: Settings, url: "/admin/settings" },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-border/50 flex h-16 items-center border-b px-0">
        <div className="flex items-center overflow-hidden transition-all duration-200">
          <Image
            src={Logo}
            alt="Logo"
            width={200}
            height={80}
            className="h-12 w-auto md:h-[60px]"
            priority
          />
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
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={
                        pathname === item.url ||
                        pathname.startsWith(`${item.url}/`)
                      }
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

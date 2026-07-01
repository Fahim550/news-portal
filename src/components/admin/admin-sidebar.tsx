"use client"

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
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"
import {
  BarChart,
  FolderTree,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
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
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
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
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success("Logged out successfully")
      router.push("/login")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to log out")
    }
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-border/50 flex h-16 items-center border-b px-0">
        <div className="flex w-full items-center gap-3 overflow-hidden transition-all duration-200">
          <Image
            src={Logo}
            alt="Logo"
            width={200}
            height={80}
            className="h-12 w-auto shrink-0 md:h-[60px]"
            priority
          />
          <h1 className="truncate text-lg font-bold group-data-[collapsible=icon]:hidden md:text-xl">
            Admin Panel
          </h1>
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Logout"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="text-destructive" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

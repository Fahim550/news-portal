"use client"

import { ThemeSwitcher } from "@/components/layout/theme-switcher"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"
import { LogOut, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { DynamicBreadcrumb } from "./dynamic-breadcrumb"

export function AdminHeader() {
  const router = useRouter()
  const supabase = createClient()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email ?? "admin")

        // Fetch profile to get real name and avatar
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", user.id)
          .single()

        if (profile) {
          const fullName =
            `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
          setUserName(fullName || null)
          setUserAvatar(profile.avatar_url)
        }
      }
    }
    fetchUser()
  }, [supabase])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("Error logging out")
    } else {
      toast.success("Logged out successfully")
      router.push("/login")
      router.refresh()
    }
  }

  return (
    <header className="border-border/50 bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="bg-border mr-2 hidden h-4 w-px md:block" />
      <div className="hidden md:block">
        <DynamicBreadcrumb />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeSwitcher />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="relative ml-2 h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  {userAvatar && (
                    <AvatarImage
                      src={userAvatar}
                      alt={userName || "Admin"}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userName ? (
                      userName.substring(0, 2).toUpperCase()
                    ) : userEmail ? (
                      userEmail.substring(0, 2).toUpperCase()
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">
                  {userName || "Admin User"}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {userEmail || "Loading..."}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/admin/settings" />}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/" />}>
              View Public Site
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer font-medium"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

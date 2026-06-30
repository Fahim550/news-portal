import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check role
  const { data: profile } = await supabase
    .from("profiles")
    .select("roles(name)")
    .eq("id", user.id)
    .single<any>()

  const roleName = profile?.roles?.name

  // Basic protection: Only allow non-Readers to access dashboard
  // Alternatively, you can have a specific whitelist:
  const allowedRoles = [
    "Super Admin",
    "Admin",
    "Editor",
    "Author",
    "Moderator",
    "Reporter",
  ]
  if (!roleName || !allowedRoles.includes(roleName)) {
    // If they don't have permission, send them to homepage or an unauthorized page
    redirect("/")
  }

  return (
    <SidebarProvider>
      <div className="bg-background flex h-screen w-full overflow-hidden">
        <AdminSidebar />
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="bg-muted/20 flex-1 overflow-y-auto p-2">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

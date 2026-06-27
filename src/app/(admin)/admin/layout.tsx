import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-muted/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

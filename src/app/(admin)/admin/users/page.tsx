import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { createClient } from "@/lib/supabase/server"
import { columns } from "./columns"
import { UserForm } from "@/components/admin/user-form"

export const revalidate = 0

export default async function UsersPage() {
  const supabase = await createClient()

  // Fetch user profiles and their associated role name
  const { data: users, error } = await supabase
    .from("profiles")
    .select(`
      id,
      first_name,
      last_name,
      avatar_url,
      created_at,
      role_id,
      roles (
        name
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users & Roles</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage system users, editors, and platform access.
          </p>
        </div>
        <UserForm />
      </div>
      <div className="bg-card rounded-lg border border-border shadow-sm p-1">
        <DataTable columns={columns as any} data={users || []} />
      </div>
    </div>
  )
}

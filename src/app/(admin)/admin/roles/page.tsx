import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ShieldAlert, Edit2 } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { RoleForm } from "@/components/admin/role-form"
import { format } from "date-fns"

export const revalidate = 0

export default async function RolesPage() {
  const supabase = await createClient()

  // Fetch roles and their associated user counts (profiles count per role)
  // Since we don't have a direct count via join, we fetch both and map them
  const { data: roles, error: rolesError } = await supabase
    .from("roles")
    .select("*")
    .order("created_at", { ascending: true })

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("role_id")

  if (rolesError) {
    console.error("Error fetching roles:", rolesError)
  }

  // Calculate users per role
  const roleUserCounts = (profiles as any[])?.reduce((acc: any, profile: any) => {
    if (profile.role_id) {
      acc[profile.role_id] = (acc[profile.role_id] || 0) + 1
    }
    return acc
  }, {}) || {}

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configure access control and user roles.
          </p>
        </div>
        <RoleForm />
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px] text-center">Users</TableHead>
              <TableHead className="w-[150px]">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(roles as any[])?.map((role: any) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-primary" />
                    {role.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {role.description || <span className="italic">No description</span>}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{roleUserCounts[role.id] || 0}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {format(new Date(role.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <RoleForm role={role}>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </RoleForm>
                </TableCell>
              </TableRow>
            ))}
            {(!roles || roles.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No roles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


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
import { Plus, Edit2, ShieldAlert } from "lucide-react"

const mockRoles = [
  { id: 1, name: "Super Admin", users: 2, permissions: ["All"], isSystem: true },
  { id: 2, name: "Editor", users: 5, permissions: ["Read", "Write", "Publish", "Manage Users"], isSystem: true },
  { id: 3, name: "Author", users: 12, permissions: ["Read", "Write (Own)", "Submit for Review"], isSystem: true },
  { id: 4, name: "Moderator", users: 3, permissions: ["Read", "Manage Comments"], isSystem: false },
]

export default function RolesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configure access control and user permissions (Mock Data).
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Role
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Role Name</TableHead>
              <TableHead>Permissions Summary</TableHead>
              <TableHead className="w-[100px] text-center">Users</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {role.isSystem && <ShieldAlert className="h-4 w-4 text-primary" />}
                    {role.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((p, i) => (
                      <Badge key={i} variant="secondary" className="font-normal text-xs">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">{role.users}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


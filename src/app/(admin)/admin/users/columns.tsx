"use client"

import { UserForm } from "@/components/admin/user-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ShieldAlert, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

// Define the shape of our profile data, including the joined role name
export type UserProfile = {
  id: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  created_at: string
  role_id: string | null
  roles: { name: string } | null
}

const UserActions = ({ user }: { user: UserProfile }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    // Ideally, deleting a user should be done via the Admin API to also remove the auth user
    toast.error(
      "Deleting users must be done via Supabase dashboard or a dedicated Admin API endpoint"
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={isDeleting}
            />
          }
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => setShowEdit(true)}
              className="cursor-pointer"
            >
              Edit User
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserForm user={user} open={showEdit} onOpenChange={setShowEdit} />
    </>
  )
}

export const columns: ColumnDef<UserProfile>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original
      const fullName =
        `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
        "Unknown User"
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar_url || ""} alt={fullName} />
            <AvatarFallback>
              {fullName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{fullName}</span>
            <span className="text-muted-foreground max-w-[150px] truncate font-mono text-xs">
              {user.id}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "roles.name",
    header: "Role",
    cell: ({ row }) => {
      const roleName = row.original.roles?.name
      return roleName ? (
        <Badge variant="secondary" className="flex w-fit items-center gap-1">
          {roleName === "Super Admin" || roleName === "Admin" ? (
            <ShieldAlert className="h-3 w-3" />
          ) : null}
          {roleName}
        </Badge>
      ) : (
        <span className="text-muted-foreground italic">No Role</span>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Joined Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at") as string)
      return date.toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UserActions user={row.original} />
    },
  },
]

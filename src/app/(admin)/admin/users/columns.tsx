"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Database } from "@/types/database.types"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Author = Database["public"]["Tables"]["authors"]["Row"]

const AuthorActions = ({ author }: { author: Author }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this author?")) return

    setIsDeleting(true)
    try {
      const { error } = await supabase.from("authors").delete().eq("id", author.id)
      if (error) throw error
      toast.success("Author deleted successfully")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete author")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/admin/users/${author.id}`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Author
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleDelete}
          className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: "name",
    header: "Author",
    cell: ({ row }) => {
      const author = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={author.photo || ""} alt={author.name} />
            <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{author.name}</span>
            <span className="text-xs text-muted-foreground">{author.slug}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "bio",
    header: "Bio",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate" title={row.getValue("bio") || ""}>
        {row.getValue("bio") || <span className="text-muted-foreground italic">No bio</span>}
      </div>
    )
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
      return <AuthorActions author={row.original} />
    },
  },
]

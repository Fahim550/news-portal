"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Database } from "@/types/database.types"
import { Badge } from "@/components/ui/badge"
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

// This type is used to define the shape of our data.
export type Category = Database["public"]["Tables"]["categories"]["Row"]

const CategoryActions = ({ category }: { category: Category }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?")) return

    setIsDeleting(true)
    try {
      const { error } = await supabase.from("categories").delete().eq("id", category.id)
      if (error) throw error
      toast.success("Category deleted successfully")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      } />
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(category.id)}
        >
          Copy Category ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href={`/admin/categories/${category.id}/edit`} />}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Category
        </DropdownMenuItem>
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

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean
      return (
        <Badge variant={status ? "default" : "secondary"}>
          {status ? "Active" : "Inactive"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "sort_order",
    header: "Sort Order",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
      return <CategoryActions category={category} />
    },
  },
]

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { Database } from "@/types/database.types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export type HomepageSection =
  Database["public"]["Tables"]["homepage_sections"]["Row"] & {
    category?: { name: string } | null
  }

const SectionActions = ({ section }: { section: HomepageSection }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this section?")) return

    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from("homepage_sections")
        .delete()
        .eq("id", section.id)
      if (error) throw error
      toast.success("Section deleted successfully")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete section")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting} />
        }
      >
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          render={
            <Link href={`/admin/pages/${section.id}`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Section
            </Link>
          }
        />
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

export const columns: ColumnDef<HomepageSection>[] = [
  {
    accessorKey: "sort_order",
    header: "Order",
  },
  {
    accessorKey: "name",
    header: "Section Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Layout Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("type")}
      </Badge>
    ),
  },
  {
    accessorKey: "category",
    header: "Category Filter",
    cell: ({ row }) => {
      const category = row.original.category
      return category ? (
        <Badge variant="secondary">{category.name}</Badge>
      ) : (
        <span className="text-muted-foreground text-sm">All (Latest)</span>
      )
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Hidden"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <SectionActions section={row.original} />
    },
  },
]

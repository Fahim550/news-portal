"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Database } from "@/types/database.types"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react"
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

export type NewsArticle = Database["public"]["Tables"]["news"]["Row"] & {
  category?: { name: string } | null
}

const NewsActions = ({ article }: { article: NewsArticle }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return

    setIsDeleting(true)
    try {
      const { error } = await supabase.from("news").delete().eq("id", article.id)
      if (error) throw error
      toast.success("Article deleted successfully")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete article")
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
        <DropdownMenuItem render={<Link href={`/news/${article.slug}`} target="_blank" />}>
          <Eye className="mr-2 h-4 w-4" />
          View on Site
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href={`/admin/news/${article.id}/edit`} />}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Article
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

export const columns: ColumnDef<NewsArticle>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium max-w-[300px] truncate" title={row.getValue("title")}>
        {row.getValue("title")}
      </div>
    )
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category
      return category ? <Badge variant="outline">{category.name}</Badge> : <span className="text-muted-foreground">-</span>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "published" ? "default" : status === "pending" ? "secondary" : "outline"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at") as string)
      return date.toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <NewsActions article={row.original} />
    },
  },
]

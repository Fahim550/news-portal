"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { ColumnDef } from "@tanstack/react-table"
import { Check, MoreHorizontal, Trash, X } from "lucide-react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export type CommentProfile = {
  id: string
  authorName: string
  authorId: string
  authorAvatar?: string
  content: string
  articleTitle: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

const CommentActions = ({ comment }: { comment: CommentProfile }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleUpdateStatus = async (status: "approved" | "rejected") => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("comments")
        .update({ status })
        .eq("id", comment.id)
      
      if (error) throw error
      toast.success(`Comment ${status} successfully`)
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || `Failed to update comment`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return
    
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", comment.id)
      
      if (error) throw error
      toast.success("Comment deleted successfully")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete comment")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
          <span className="sr-only">Open menu</span>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {comment.status !== "approved" && (
          <DropdownMenuItem onClick={() => handleUpdateStatus("approved")} className="text-emerald-600 focus:text-emerald-600 cursor-pointer">
            <Check className="mr-2 h-4 w-4" />
            Approve
          </DropdownMenuItem>
        )}
        {comment.status !== "rejected" && (
          <DropdownMenuItem onClick={() => handleUpdateStatus("rejected")} className="text-amber-600 focus:text-amber-600 cursor-pointer">
            <X className="mr-2 h-4 w-4" />
            Reject
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<CommentProfile>[] = [
  {
    accessorKey: "authorName",
    header: "Author",
    cell: ({ row }) => {
      const comment = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
            <AvatarFallback>
              {comment.authorName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{comment.authorName}</span>
            <span className="text-muted-foreground font-mono text-xs truncate max-w-[150px]">
              {comment.authorId}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "content",
    header: "Comment",
    cell: ({ row }) => (
      <div className="max-w-[400px]">
        <p className="truncate text-sm font-medium">
          {row.original.articleTitle}
        </p>
        <p
          className="text-muted-foreground mt-1 truncate text-xs"
          title={row.getValue("content")}
        >
          "{row.getValue("content")}"
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "approved"
              ? "default"
              : status === "pending"
                ? "secondary"
                : "destructive"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string)
      return <span className="text-sm">{date.toLocaleDateString()}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CommentActions comment={row.original} />
    },
  },
]

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

export type CommentMock = {
  id: string
  authorName: string
  authorEmail: string
  authorAvatar?: string
  content: string
  articleTitle: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

const CommentActions = ({ comment }: { comment: CommentMock }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {comment.status !== "approved" && (
          <DropdownMenuItem className="text-emerald-600 focus:text-emerald-600">
            <Check className="mr-2 h-4 w-4" />
            Approve
          </DropdownMenuItem>
        )}
        {comment.status !== "rejected" && (
          <DropdownMenuItem className="text-amber-600 focus:text-amber-600">
            <X className="mr-2 h-4 w-4" />
            Reject
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<CommentMock>[] = [
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
            <span className="text-muted-foreground text-xs">
              {comment.authorEmail}
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

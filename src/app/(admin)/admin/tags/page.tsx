import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { columns } from "./columns"

export default async function TagsPage() {
  const supabase = await createClient()

  const { data: tags, error } = await supabase
    .from("tags")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching tags:", error)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tags</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage tags used to categorize news articles.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/tags/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Tag
          </Link>
        </Button>
      </div>

      <div className="bg-card border-border rounded-lg border p-1 shadow-sm">
        <DataTable columns={columns} data={tags || []} />
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { columns } from "./columns"

export default async function AdsPage() {
  const supabase = await createClient()

  const { data: ads, error } = await supabase
    .from("advertisements")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching ads:", error)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Advertisements</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage banner ads and custom HTML snippets across the site.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/ads/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Advertisement
          </Link>
        </Button>
      </div>
      <div className="bg-card rounded-lg border border-border shadow-sm p-1">
        <DataTable columns={columns} data={ads || []} />
      </div>
    </div>
  )
}


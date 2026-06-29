import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { columns } from "./columns"

export default async function PagesPage() {
  const supabase = await createClient()

  const { data: sections, error } = await supabase
    .from("homepage_sections")
    .select(`
      *,
      category:categories(name)
    `)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("Error fetching homepage sections:", error)
  }

  // Handle Supabase relation typing (array vs object)
  const formattedSections = sections?.map((section) => ({
    ...section,
    category: Array.isArray(section.category)
      ? section.category[0]
      : section.category,
  }))

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Homepage Sections</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage the layout and order of sections on the frontend homepage.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Link>
        </Button>
      </div>
      <div className="bg-card rounded-lg border border-border shadow-sm p-1">
        <DataTable columns={columns} data={formattedSections || []} />
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { columns } from "./columns"

export default async function NewsPage() {
  const supabase = await createClient()

  // Fetch news with category relations
  const { data: news, error } = await supabase
    .from("news")
    .select(
      `
      *,
      category:categories(name)
    `
    )
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching news:", error)
  }

  // The relation comes back as either an object or an array depending on how Supabase types it.
  // Since category_id is a many-to-one, it should be an object.
  const formattedNews = news?.map((article) => ({
    ...article,
    category: Array.isArray(article.category)
      ? article.category[0]
      : article.category,
  }))

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">News Articles</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage all news publications, drafts, and scheduled posts.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/news/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Article
          </Link>
        </Button>
      </div>

      <div className="bg-card border-border rounded-lg border p-1 shadow-sm">
        <DataTable columns={columns} data={formattedNews || []} />
      </div>
    </div>
  )
}

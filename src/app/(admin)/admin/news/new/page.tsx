import { NewsForm } from "@/components/admin/news-form"
import { createClient } from "@/lib/supabase/server"

export default async function NewNewsPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")
    
  const { data: authors } = await supabase
    .from("authors")
    .select("*")
    .order("name")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create News Article</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Draft a new article, set categories, and configure SEO.
        </p>
      </div>
      <div className="max-w-4xl border border-border rounded-lg bg-card p-6 shadow-sm">
        <NewsForm 
          categories={categories || []} 
          authors={authors || []} 
        />
      </div>
    </div>
  )
}

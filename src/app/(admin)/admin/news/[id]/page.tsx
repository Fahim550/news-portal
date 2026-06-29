import { NewsForm } from "@/components/admin/news-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single()

  if (!article) {
    notFound()
  }

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
        <h1 className="text-2xl font-bold tracking-tight">Edit News Article</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Update the article details, status, and SEO settings.
        </p>
      </div>
      <div className="max-w-4xl border border-border rounded-lg bg-card p-6 shadow-sm">
        <NewsForm 
          initialData={article} 
          categories={categories || []} 
          authors={authors || []} 
        />
      </div>
    </div>
  )
}

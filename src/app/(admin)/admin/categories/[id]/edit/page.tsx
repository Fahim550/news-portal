import { CategoryForm } from "@/components/admin/category-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !category) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Update the settings for {category.name}.
        </p>
      </div>
      <div className="border-border bg-card max-w-3xl rounded-lg border p-6 shadow-sm">
        <CategoryForm initialData={category} />
      </div>
    </div>
  )
}

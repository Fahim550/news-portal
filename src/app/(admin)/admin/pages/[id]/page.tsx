import { HomepageSectionForm } from "@/components/admin/homepage-section-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditSectionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: section } = await supabase
    .from("homepage_sections")
    .select("*")
    .eq("id", id)
    .single()

  if (!section) {
    notFound()
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Homepage Section</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Update layout settings and content filters for this section.
        </p>
      </div>
      <div className="max-w-3xl border border-border rounded-lg bg-card p-6 shadow-sm">
        <HomepageSectionForm initialData={section} categories={categories || []} />
      </div>
    </div>
  )
}

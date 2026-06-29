import { HomepageSectionForm } from "@/components/admin/homepage-section-form"
import { createClient } from "@/lib/supabase/server"

export default async function NewSectionPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Homepage Section</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Add a new dynamic layout block to the frontend homepage.
        </p>
      </div>
      <div className="max-w-3xl border border-border rounded-lg bg-card p-6 shadow-sm">
        <HomepageSectionForm categories={categories || []} />
      </div>
    </div>
  )
}

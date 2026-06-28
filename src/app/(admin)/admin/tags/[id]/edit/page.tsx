import { TagForm } from "@/components/admin/tag-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditTagPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: tag, error } = await supabase
    .from("tags")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !tag) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Tag</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Update the {tag.name} tag.
        </p>
      </div>
      <div className="border-border bg-card max-w-3xl rounded-lg border p-6 shadow-sm">
        <TagForm initialData={tag} />
      </div>
    </div>
  )
}

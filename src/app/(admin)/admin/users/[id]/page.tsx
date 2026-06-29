import { AuthorForm } from "@/components/admin/author-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditAuthorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: author } = await supabase
    .from("authors")
    .select("*")
    .eq("id", id)
    .single()

  if (!author) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Author</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Update author details and social links.
        </p>
      </div>
      <div className="max-w-3xl border border-border rounded-lg bg-card p-6 shadow-sm">
        <AuthorForm initialData={author} />
      </div>
    </div>
  )
}

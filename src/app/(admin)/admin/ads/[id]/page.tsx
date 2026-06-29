import { AdForm } from "@/components/admin/ad-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditAdPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: ad } = await supabase
    .from("advertisements")
    .select("*")
    .eq("id", id)
    .single()

  if (!ad) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Advertisement</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Update the advertisement details, position, and active status.
        </p>
      </div>
      <div className="max-w-4xl border border-border rounded-lg bg-card p-6 shadow-sm">
        <AdForm initialData={ad} />
      </div>
    </div>
  )
}

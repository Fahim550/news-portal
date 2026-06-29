import { AuthorForm } from "@/components/admin/author-form"

export default function NewAuthorPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Author</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Add a new author profile for news articles.
        </p>
      </div>
      <div className="max-w-3xl border border-border rounded-lg bg-card p-6 shadow-sm">
        <AuthorForm />
      </div>
    </div>
  )
}

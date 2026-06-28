import { CategoryForm } from "@/components/admin/category-form"

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Category</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Add a new category for your news articles.
        </p>
      </div>
      <div className="max-w-3xl border border-border rounded-lg bg-card p-6 shadow-sm">
        <CategoryForm />
      </div>
    </div>
  )
}

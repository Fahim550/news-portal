import { AdForm } from "@/components/admin/ad-form"

export default function NewAdPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Create Advertisement
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Add a new ad banner, custom HTML snippet, or AdSense code.
        </p>
      </div>
      <div className="border-border bg-card max-w-4xl rounded-lg border p-6 shadow-sm">
        <AdForm />
      </div>
    </div>
  )
}

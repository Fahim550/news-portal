import { SettingsForm } from "@/components/admin/settings-form"
import { createClient } from "@/lib/supabase/server"

export default async function SettingsPage() {
  const supabase = await createClient()

  // Fetch the single settings row
  const { data: settings } = await supabase
    .from("settings")
    .select("*")
    .limit(1)
    .single()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Global Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage general website configuration, contact information, and social links.
        </p>
      </div>
      <div className="max-w-4xl bg-card rounded-lg border border-border shadow-sm p-6">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  )
}


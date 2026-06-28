export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage general website settings, logos, and homepage configuration.
        </p>
      </div>
      <div className="bg-card rounded-lg border border-border shadow-sm p-12 text-center text-muted-foreground">
        This module is currently under development. Site Settings will be available here soon.
      </div>
    </div>
  )
}

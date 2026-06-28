export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users & Authors</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage system users and news authors.
        </p>
      </div>
      <div className="bg-card rounded-lg border border-border shadow-sm p-12 text-center text-muted-foreground">
        This module is currently under development. User and Author management will be available here soon.
      </div>
    </div>
  )
}

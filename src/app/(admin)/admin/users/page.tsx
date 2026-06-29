import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { columns } from "./columns"

export default async function UsersPage() {
  const supabase = await createClient()

  const { data: authors, error } = await supabase
    .from("authors")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching authors:", error)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users & Authors</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage article authors, editors, and platform users.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/users/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Author
          </Link>
        </Button>
      </div>
      <div className="bg-card rounded-lg border border-border shadow-sm p-1">
        <DataTable columns={columns} data={authors || []} />
      </div>
    </div>
  )
}

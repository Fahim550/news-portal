import { DataTable } from "@/components/ui/data-table"
import { createClient } from "@/lib/supabase/server"
import { columns, CommentProfile } from "./columns"

export const revalidate = 0

export default async function CommentsPage() {
  const supabase = await createClient()

  // Fetch comments joined with profiles and news
  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      status,
      created_at,
      profiles:user_id (id, first_name, last_name, avatar_url),
      news:news_id (title)
    `
    )
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching comments:", error)
  }

  // Map the nested relational data to the flat CommentProfile structure
  const formattedComments: CommentProfile[] = (comments || []).map((c: any) => {
    const profile = c.profiles || {}
    const news = c.news || {}
    const authorName =
      `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
      "Anonymous"

    return {
      id: c.id,
      authorName: authorName,
      authorId: profile.id || "unknown",
      authorAvatar: profile.avatar_url,
      content: c.content,
      articleTitle: news.title || "Unknown Article",
      status: c.status,
      createdAt: c.created_at,
    }
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Comments Moderation
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Review, approve, and manage user comments on your articles.
        </p>
      </div>
      <div className="bg-card border-border rounded-lg border p-1 shadow-sm">
        <DataTable columns={columns} data={formattedComments} />
      </div>
    </div>
  )
}

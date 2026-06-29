import { DataTable } from "@/components/ui/data-table"
import { columns, CommentMock } from "./columns"

// Mock Data for UI presentation
const mockComments: CommentMock[] = [
  {
    id: "1",
    authorName: "Sarah Jenkins",
    authorEmail: "sarah.j@example.com",
    content: "Great article! I really appreciate the detailed breakdown of the new policies.",
    articleTitle: "City Council Passes New Zoning Laws",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    authorName: "Mike Thompson",
    authorEmail: "mike.t@example.com",
    content: "I completely disagree. This will only cause more traffic in the downtown area.",
    articleTitle: "City Council Passes New Zoning Laws",
    status: "approved",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    authorName: "SpamBot99",
    authorEmail: "buycrypto@spam.com",
    content: "Earn $5000 a week working from home! Click here: http://spam.link",
    articleTitle: "Tech Stocks Surge Amid AI Boom",
    status: "rejected",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  }
]

export default function CommentsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Comments Moderation</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Review, approve, and manage user comments on your articles (Mock Data).
        </p>
      </div>
      <div className="bg-card rounded-lg border border-border shadow-sm p-1">
        <DataTable columns={columns} data={mockComments} />
      </div>
    </div>
  )
}


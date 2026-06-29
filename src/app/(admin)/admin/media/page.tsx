import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Upload, Image as ImageIcon, MoreVertical } from "lucide-react"

const mockMedia = [
  { id: 1, name: "breaking-news-header.jpg", size: "1.2 MB", type: "image/jpeg", date: "2026-06-29", url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&q=80" },
  { id: 2, name: "tech-conference.png", size: "3.4 MB", type: "image/png", date: "2026-06-28", url: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=500&q=80" },
  { id: 3, name: "city-council-meeting.jpg", size: "850 KB", type: "image/jpeg", date: "2026-06-25", url: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?w=500&q=80" },
  { id: 4, name: "sports-finals.jpg", size: "2.1 MB", type: "image/jpeg", date: "2026-06-22", url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80" },
  { id: 5, name: "market-trends-chart.svg", size: "120 KB", type: "image/svg+xml", date: "2026-06-20", url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80" },
  { id: 6, name: "author-avatar-jane.jpg", size: "450 KB", type: "image/jpeg", date: "2026-06-15", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80" },
  { id: 7, name: "weather-storm-warning.jpg", size: "1.8 MB", type: "image/jpeg", date: "2026-06-12", url: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=500&q=80" },
  { id: 8, name: "election-map.png", size: "5.2 MB", type: "image/png", date: "2026-06-10", url: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=500&q=80" },
]

export default function MediaLibraryPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your uploaded images, videos, and documents (Mock Data).
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search media..." className="pl-9" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockMedia.map((file) => (
          <Card key={file.id} className="overflow-hidden group cursor-pointer border-border hover:border-primary/50 transition-colors">
            <div className="aspect-square relative bg-muted overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={file.url} 
                alt={file.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                  View Details
                </Button>
              </div>
            </div>
            <CardFooter className="p-3 flex-col items-start gap-1">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 truncate max-w-[85%]">
                  <ImageIcon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium truncate">{file.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                <span>{file.size}</span>
                <span>{file.date}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


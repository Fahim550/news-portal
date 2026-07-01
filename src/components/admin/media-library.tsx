"use client"

import { insertMediaRecord } from "@/app/actions/media"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { format } from "date-fns"
import {
  Image as ImageIcon,
  Loader2,
  MoreVertical,
  Search,
  Upload,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function MediaLibrary() {
  const [media, setMedia] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setMedia(data || [])
    } catch (error: any) {
      toast.error("Failed to load media: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Simple validation
    if (!file.type.startsWith("image/") && file.type !== "image/svg+xml") {
      toast.error("Only image files are allowed.")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      // 10MB
      toast.error("File size must be under 10MB.")
      return
    }

    setIsUploading(true)
    try {
      // 1. Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("You must be logged in to upload.")

      // 2. Upload to storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("media")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      try {
        await insertMediaRecord({
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
        })
      } catch (dbError: any) {
        // Rollback storage upload if DB insert fails
        await supabase.storage.from("media").remove([filePath])
        throw dbError
      }

      toast.success("File uploaded successfully!")
      fetchMedia() // Refresh the list
    } catch (error: any) {
      toast.error(error.message || "Failed to upload file")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = "" // Reset input
    }
  }

  const filteredMedia = media.filter(
    (item) =>
      item.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.file_type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getImageUrl = (path: string) => {
    return supabase.storage.from("media").getPublicUrl(path).data.publicUrl
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your uploaded images, videos, and documents.
          </p>
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <Button onClick={handleUploadClick} disabled={isUploading}>
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      </div>

      <div className="bg-card border-border flex items-center gap-4 rounded-lg border p-4 shadow-sm">
        <div className="relative max-w-md flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            placeholder="Search media by name..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-card text-muted-foreground rounded-lg border-2 border-dashed p-12 text-center">
          {searchQuery
            ? "No files match your search."
            : "No media uploaded yet."}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredMedia.map((file) => (
            <Card
              key={file.id}
              className="group border-border hover:border-primary/50 flex h-full cursor-pointer flex-col overflow-hidden transition-colors"
            >
              <div className="bg-muted relative aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(file.file_path)}
                  alt={file.alt_text || file.file_name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View Details
                  </Button>
                </div>
              </div>
              <CardFooter className="mt-auto flex-col items-start gap-1 p-3">
                <div className="flex w-full items-center justify-between">
                  <div className="flex max-w-[85%] items-center gap-2 truncate">
                    <ImageIcon className="text-primary h-4 w-4 shrink-0" />
                    <span
                      className="truncate text-sm font-medium"
                      title={file.file_name}
                    >
                      {file.file_name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-muted-foreground flex w-full items-center justify-between text-xs">
                  <span>{formatBytes(file.file_size)}</span>
                  <span>
                    {format(new Date(file.created_at), "MMM d, yyyy")}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

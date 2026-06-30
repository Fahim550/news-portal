"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Upload, Image as ImageIcon, MoreVertical, Loader2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { format } from "date-fns"

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
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
    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast.error("File size must be under 10MB.")
      return
    }

    setIsUploading(true)
    try {
      // 1. Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("You must be logged in to upload.")

      // 2. Upload to storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("media")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 3. Save to database
      const { error: dbError } = await supabase.from("media").insert({
        uploader_id: user.id,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
      })

      if (dbError) {
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

  const filteredMedia = media.filter(item => 
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
          <p className="text-muted-foreground text-sm mt-1">
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

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed rounded-lg bg-card text-muted-foreground">
          {searchQuery ? "No files match your search." : "No media uploaded yet."}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMedia.map((file) => (
            <Card key={file.id} className="overflow-hidden group cursor-pointer border-border hover:border-primary/50 transition-colors flex flex-col h-full">
              <div className="aspect-square relative bg-muted overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={getImageUrl(file.file_path)} 
                  alt={file.alt_text || file.file_name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                    View Details
                  </Button>
                </div>
              </div>
              <CardFooter className="p-3 flex-col items-start gap-1 mt-auto">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 truncate max-w-[85%]">
                    <ImageIcon className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium truncate" title={file.file_name}>{file.file_name}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                  <span>{formatBytes(file.file_size)}</span>
                  <span>{format(new Date(file.created_at), "MMM d, yyyy")}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

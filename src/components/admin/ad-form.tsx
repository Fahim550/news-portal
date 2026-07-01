"use client"

import { createClient } from "@/lib/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Loader2, Upload } from "lucide-react"
import { insertMediaRecord } from "@/app/actions/media"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Database } from "@/types/database.types"

type Advertisement = Database["public"]["Tables"]["advertisements"]["Row"]

const adFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  position: z.enum([
    "homepage_banner",
    "sidebar",
    "header",
    "footer",
    "article_top",
    "article_middle",
    "article_bottom",
    "popup"
  ]),
  image: z.string().optional(),
  redirect_url: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
  adsense_code: z.string().optional(),
  custom_html: z.string().optional(),
  is_active: z.boolean(),
})

type AdFormValues = z.infer<typeof adFormSchema>

interface AdFormProps {
  initialData?: Advertisement | null
}

export function AdForm({ initialData }: AdFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const defaultValues: Partial<AdFormValues> = initialData
    ? {
        name: initialData.name,
        position: initialData.position as any,
        image: initialData.image || "",
        redirect_url: initialData.redirect_url || "",
        adsense_code: initialData.adsense_code || "",
        custom_html: initialData.custom_html || "",
        is_active: initialData.is_active ?? true,
      }
    : {
        name: "",
        position: "sidebar",
        image: "",
        redirect_url: "",
        adsense_code: "",
        custom_html: "",
        is_active: true,
      }

  const form = useForm<AdFormValues>({
    resolver: zodResolver(adFormSchema) as any,
    defaultValues,
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/") && file.type !== "image/svg+xml") {
      toast.error("Only image files are allowed.")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB.")
      return
    }

    setIsUploadingImage(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("You must be logged in to upload.")

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase.storage
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
        await supabase.storage.from("media").remove([filePath])
        throw dbError
      }

      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(filePath)
      
      form.setValue("image", publicUrl)
      toast.success("Image uploaded successfully!")
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image")
    } finally {
      setIsUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  async function onSubmit(data: AdFormValues) {
    setIsLoading(true)

    try {
      const payload = {
        ...data,
        redirect_url: data.redirect_url === "" ? null : data.redirect_url,
      }

      if (initialData) {
        // Update
        const { error } = await supabase
          .from("advertisements")
          .update(payload)
          .eq("id", initialData.id)

        if (error) throw error
        toast.success("Advertisement updated successfully")
      } else {
        // Create
        const { error } = await supabase.from("advertisements").insert([payload])

        if (error) throw error
        toast.success("Advertisement created successfully")
      }

      router.push("/admin/ads")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Campaign Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                    <SelectItem value="homepage_banner">Homepage Banner</SelectItem>
                    <SelectItem value="article_top">Article Top</SelectItem>
                    <SelectItem value="article_middle">Article Middle</SelectItem>
                    <SelectItem value="article_bottom">Article Bottom</SelectItem>
                    <SelectItem value="popup">Popup</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 rounded-md border p-4">
          <h3 className="font-medium">Image Ad Details (Optional)</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="https://example.com/banner.jpg" {...field} value={field.value || ""} className="flex-1" />
                    </FormControl>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                    >
                      {isUploadingImage ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      Upload
                    </Button>
                  </div>
                  {field.value && (
                    <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-md border border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={field.value}
                        alt="Ad preview"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="3" x2="21" y2="21"></line></svg>'
                        }}
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="redirect_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redirect URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://advertiser.com" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-md border p-4">
          <h3 className="font-medium">Custom Code / AdSense (Optional)</h3>
          <p className="text-sm text-muted-foreground">If provided, this will typically override the image ad above.</p>
          
          <FormField
            control={form.control}
            name="adsense_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AdSense Code (Publisher ID, Slot, etc.)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Client ID / Slot ID" className="resize-none" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="custom_html"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom HTML / Script</FormLabel>
                <FormControl>
                  <Textarea placeholder="<script>...</script>" className="resize-none font-mono" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="border-border flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active Status</FormLabel>
                <FormDescription>
                  Is this advertisement currently active?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Save changes" : "Create advertisement"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

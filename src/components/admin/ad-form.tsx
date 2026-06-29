"use client"

import { createClient } from "@/lib/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

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
  is_active: z.boolean().default(true),
})

type AdFormValues = z.infer<typeof adFormSchema>

interface AdFormProps {
  initialData?: Advertisement | null
}

export function AdForm({ initialData }: AdFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
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
    resolver: zodResolver(adFormSchema),
    defaultValues,
  })

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
                  <FormControl>
                    <Input placeholder="https://example.com/banner.jpg" {...field} value={field.value || ""} />
                  </FormControl>
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

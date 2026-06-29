"use client"

import { createClient } from "@/lib/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
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
import { Database } from "@/types/database.types"

type Settings = Database["public"]["Tables"]["settings"]["Row"]

const settingsFormSchema = z.object({
  site_name: z.string().min(1, { message: "Site name is required." }),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  contact_email: z.string().email().optional().or(z.literal("")),
  contact_phone: z.string().optional(),
  contact_address: z.string().optional(),
  footer_info: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

interface SettingsFormProps {
  initialData?: Settings | null
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  // Parse social links if available
  const socialLinks = initialData?.social_links as { 
    facebook?: string; 
    twitter?: string;
    instagram?: string;
    youtube?: string;
  } | undefined

  const defaultValues: Partial<SettingsFormValues> = initialData
    ? {
        site_name: initialData.site_name,
        logo: initialData.logo || "",
        favicon: initialData.favicon || "",
        contact_email: initialData.contact_email || "",
        contact_phone: initialData.contact_phone || "",
        contact_address: initialData.contact_address || "",
        footer_info: initialData.footer_info || "",
        facebook: socialLinks?.facebook || "",
        twitter: socialLinks?.twitter || "",
        instagram: socialLinks?.instagram || "",
        youtube: socialLinks?.youtube || "",
      }
    : {
        site_name: "News Portal",
        logo: "",
        favicon: "",
        contact_email: "",
        contact_phone: "",
        contact_address: "",
        footer_info: "",
        facebook: "",
        twitter: "",
        instagram: "",
        youtube: "",
      }

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  })

  async function onSubmit(data: SettingsFormValues) {
    setIsLoading(true)

    try {
      const payload = {
        site_name: data.site_name,
        logo: data.logo,
        favicon: data.favicon,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
        contact_address: data.contact_address,
        footer_info: data.footer_info,
        social_links: {
          facebook: data.facebook,
          twitter: data.twitter,
          instagram: data.instagram,
          youtube: data.youtube,
        }
      }

      if (initialData?.id) {
        // Update
        const { error } = await supabase
          .from("settings")
          .update(payload)
          .eq("id", initialData.id)

        if (error) throw error
        toast.success("Settings updated successfully")
      } else {
        // Create
        const { error } = await supabase.from("settings").insert([payload])

        if (error) throw error
        toast.success("Settings saved successfully")
      }

      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="space-y-4 rounded-md border p-6">
          <h3 className="text-lg font-medium">General Information</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="site_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My News Portal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/logo.png" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favicon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favicon URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/favicon.ico" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-md border p-6">
          <h3 className="text-lg font-medium">Contact & Footer</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="contact@example.com" type="email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 234 567 890" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="contact_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="123 News St, City, Country" className="resize-none" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="footer_info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Footer Information / Copyright</FormLabel>
                <FormControl>
                  <Textarea placeholder="© 2026 My News Portal. All rights reserved." className="resize-none" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 rounded-md border p-6">
          <h3 className="text-lg font-medium">Social Links</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com/..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

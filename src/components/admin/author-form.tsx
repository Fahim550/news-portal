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

type Author = Database["public"]["Tables"]["authors"]["Row"]

const authorFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  photo: z.string().optional(),
  bio: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
})

type AuthorFormValues = z.infer<typeof authorFormSchema>

interface AuthorFormProps {
  initialData?: Author | null
}

export function AuthorForm({ initialData }: AuthorFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  // Parse social links if available
  const socialLinks = initialData?.social_links as { twitter?: string; linkedin?: string } | undefined

  const defaultValues: Partial<AuthorFormValues> = initialData
    ? {
        name: initialData.name,
        slug: initialData.slug,
        photo: initialData.photo || "",
        bio: initialData.bio || "",
        twitter: socialLinks?.twitter || "",
        linkedin: socialLinks?.linkedin || "",
      }
    : {
        name: "",
        slug: "",
        photo: "",
        bio: "",
        twitter: "",
        linkedin: "",
      }

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(authorFormSchema),
    defaultValues,
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    form.setValue("name", name)
    if (!initialData) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
      form.setValue("slug", slug)
    }
  }

  async function onSubmit(data: AuthorFormValues) {
    setIsLoading(true)

    try {
      const payload = {
        name: data.name,
        slug: data.slug,
        photo: data.photo,
        bio: data.bio,
        social_links: {
          twitter: data.twitter,
          linkedin: data.linkedin,
        }
      }

      if (initialData) {
        // Update
        const { error } = await supabase
          .from("authors")
          .update(payload)
          .eq("id", initialData.id)

        if (error) throw error
        toast.success("Author updated successfully")
      } else {
        // Create
        const { error } = await supabase.from("authors").insert([payload])

        if (error) {
          if (error.code === "23505") {
            throw new Error("An author with this slug already exists.")
          }
          throw error
        }
        toast.success("Author created successfully")
      }

      router.push("/admin/users")
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
                  <Input placeholder="John Doe" {...field} onChange={handleNameChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="john-doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/avatar.jpg" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Short biography about the author..." className="resize-none min-h-[100px]" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 rounded-md border p-4">
          <h3 className="font-medium">Social Links</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter (X) URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com/johndoe" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/johndoe" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Save changes" : "Create author"}
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

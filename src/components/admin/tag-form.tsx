"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

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
import { Database } from "@/types/database.types"

type Tag = Database["public"]["Tables"]["tags"]["Row"]

const tagFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }).regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens.",
  }),
})

type TagFormValues = z.infer<typeof tagFormSchema>

interface TagFormProps {
  initialData?: Tag | null
}

export function TagForm({ initialData }: TagFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const defaultValues: Partial<TagFormValues> = initialData
    ? {
        name: initialData.name,
        slug: initialData.slug,
      }
    : {
        name: "",
        slug: "",
      }

  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagFormSchema),
    defaultValues,
  })

  // Auto-generate slug from name if creating new
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

  async function onSubmit(data: TagFormValues) {
    setIsLoading(true)

    try {
      if (initialData) {
        // Update
        const { error } = await supabase
          .from("tags")
          .update(data)
          .eq("id", initialData.id)

        if (error) throw error
        toast.success("Tag updated successfully")
      } else {
        // Create
        const { error } = await supabase.from("tags").insert([data])

        if (error) {
          if (error.code === '23505') { // Unique violation
            throw new Error("A tag with this slug already exists.")
          }
          throw error
        }
        toast.success("Tag created successfully")
      }

      router.push("/admin/tags")
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control as any}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Politics" {...field} onChange={handleNameChange} />
                </FormControl>
                <FormDescription>
                  The display name of the tag.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="politics" {...field} />
                </FormControl>
                <FormDescription>
                  The URL-friendly version of the tag name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Save changes" : "Create tag"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

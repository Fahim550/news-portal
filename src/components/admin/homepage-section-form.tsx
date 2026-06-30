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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Database } from "@/types/database.types"

type HomepageSection = Database["public"]["Tables"]["homepage_sections"]["Row"]
type Category = Database["public"]["Tables"]["categories"]["Row"]

const sectionFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "Type is required.",
  }),
  category_id: z.string().uuid().optional().nullable(),
  article_count: z.coerce.number().min(1).max(20),
  sort_order: z.coerce.number(),
  is_active: z.boolean(),
})

type SectionFormValues = z.infer<typeof sectionFormSchema>

interface SectionFormProps {
  initialData?: HomepageSection | null
  categories: Category[]
}

export function HomepageSectionForm({ initialData, categories }: SectionFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const defaultValues: Partial<SectionFormValues> = initialData
    ? {
        name: initialData.name,
        type: initialData.type,
        category_id: initialData.category_id,
        article_count: initialData.article_count ?? 5,
        sort_order: initialData.sort_order ?? 0,
        is_active: initialData.is_active ?? true,
      }
    : {
        name: "",
        type: "grid",
        category_id: null,
        article_count: 5,
        sort_order: 0,
        is_active: true,
      }

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema) as any,
    defaultValues,
  })

  async function onSubmit(data: SectionFormValues) {
    setIsLoading(true)

    try {
      if (initialData) {
        // Update
        const { error } = await supabase
          .from("homepage_sections")
          .update(data)
          .eq("id", initialData.id)

        if (error) throw error
        toast.success("Section updated successfully")
      } else {
        // Create
        const { error } = await supabase.from("homepage_sections").insert([data])

        if (error) throw error
        toast.success("Section created successfully")
      }

      router.push("/admin/pages")
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
                <FormLabel>Section Name</FormLabel>
                <FormControl>
                  <Input placeholder="Trending Now" {...field} />
                </FormControl>
                <FormDescription>Display name for the section header.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Layout Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a layout" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="grid">Grid (Cards)</SelectItem>
                    <SelectItem value="slider">Carousel Slider</SelectItem>
                    <SelectItem value="list">List (Vertical)</SelectItem>
                    <SelectItem value="hero">Hero Top</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filter by Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories (Latest)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Leave empty to show latest from all.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="article_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Articles</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={20} {...field} />
                </FormControl>
                <FormDescription>How many articles to fetch.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sort_order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Lower numbers appear first on page.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    Show this section on the homepage?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Save changes" : "Create section"}
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

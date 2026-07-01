"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"

export async function insertMediaRecord(data: {
  file_name: string
  file_path: string
  file_type: string
  file_size: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error("Unauthorized")
  }

  const adminSupabase = createAdminClient()
  const { error } = await adminSupabase.from("media").insert({
    uploader_id: user.id,
    file_name: data.file_name,
    file_path: data.file_path,
    file_type: data.file_type,
    file_size: data.file_size,
  })

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

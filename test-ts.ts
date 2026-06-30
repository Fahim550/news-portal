import { Database } from "./src/types/database.types"
import { SupabaseClient } from "@supabase/supabase-js"

type Pub = Database['public']

type Check = Pub extends {
  Tables: Record<string, any>
  Views: Record<string, any>
  Functions: Record<string, any>
} ? true : false

const a: Check = true


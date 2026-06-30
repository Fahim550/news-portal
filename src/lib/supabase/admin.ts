import { createClient } from '@supabase/supabase-js'

// This client uses the service role key and bypasses RLS.
// ONLY USE THIS ON THE SERVER for admin tasks like creating auth users.
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL")
    // Return a dummy client or throw an error based on your preference. 
    // Throwing an error ensures it fails fast if configured incorrectly.
    throw new Error('Missing Supabase Service Role Key')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

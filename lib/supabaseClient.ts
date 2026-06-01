import { createClient } from "@supabase/supabase-js"

// Browser Supabase client. Uses the publishable (anon) key, which is safe to
// expose because Row Level Security restricts every query to the signed-in
// user's own rows. The secret key is never used client-side.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

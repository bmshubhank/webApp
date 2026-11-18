import { createClient } from '@supabase/supabase-js'

// These come from your .env.local file
// Vite exposes env vars that start with VITE_ automatically
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// This is the Supabase client - you use it everywhere to talk to your database
export const supabase = createClient(supabaseUrl, supabaseKey)
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for the marketing site.
 *
 * Deliberately uses the ANON key, not the service role. The only write this
 * site performs is an enquiry insert, and the RLS policy allows exactly that
 * and nothing else — so there is no reason to hold a key that could do more.
 */
export function supabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Single browser Supabase client. Session is persisted in localStorage and the
 * OAuth redirect is parsed automatically (detectSessionInUrl).
 *
 * `supabase` is null only if env vars are missing — callers should treat a null
 * client as "auth disabled" and fall back to anonymous (localStorage) mode.
 */
export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: "pkce",
        },
      })
    : null;

export const isSupabaseEnabled = !!supabase;

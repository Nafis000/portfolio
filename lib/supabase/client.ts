import { createBrowserClient } from "@supabase/ssr";

// Browser client sharing the admin's cookie session. Used only for direct-to-Storage uploads,
// which the "media" bucket policies restrict to admins.
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
}

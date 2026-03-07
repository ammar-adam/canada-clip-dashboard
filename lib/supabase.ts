import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Browser client for realtime (use in components) */
export function createBrowserClient() {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

/** Server client with service role for API routes (insert) */
export function createServerClient() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey);
}

export type ClipEvent = {
  id: string;
  created_at: string;
  merchant_id: string;
  query: string;
  intercepted: string;
  action: "Viewed" | "Clicked" | "Purchased";
  province: string;
};

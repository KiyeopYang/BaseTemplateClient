import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string,
  { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
);

// 서버에서 사용
export const createSupabaseClient = (accessToken?: string) => {
  const sb = createClient(supabaseUrl as string, supabaseAnonKey as string, {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  });
  if (accessToken) {
    sb.auth.setAuth(accessToken);
  }
  return sb;
};

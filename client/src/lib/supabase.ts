
import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_HOST_URL_COMBINENATION_PLATFORM || !import.meta.env.VITE_SUPABASE_ANON_KEY_COMBINENATION_PLATFORM) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_HOST_URL_COMBINENATION_PLATFORM,
  import.meta.env.VITE_SUPABASE_ANON_KEY_COMBINENATION_PLATFORM
);

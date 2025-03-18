
import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_HOST_URL_COMBINENATION_PLATFORM || !process.env.SUPABASE_ANON_KEY_COMBINENATION_PLATFORM) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  process.env.SUPABASE_HOST_URL_COMBINENATION_PLATFORM,
  process.env.SUPABASE_ANON_KEY_COMBINENATION_PLATFORM
);

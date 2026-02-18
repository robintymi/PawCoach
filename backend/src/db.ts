import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL und SUPABASE_ANON_KEY müssen in .env gesetzt sein');
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);

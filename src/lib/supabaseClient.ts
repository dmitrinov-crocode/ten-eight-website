import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // Surface misconfiguration early rather than failing silently at call time.
  // eslint-disable-next-line no-console
  console.error(
    'Missing Supabase env vars: REACT_APP_SUPABASE_URL and/or REACT_APP_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '', {
  auth: { persistSession: false },
});

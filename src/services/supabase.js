// src/services/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log(import.meta.env.VITE_TEST_VAR);
if (!supabaseUrl ) {
  throw new Error("Missing Supabase URL variables");
}
if (|| !supabaseKey) {
  throw new Error("Missing Supabase KEY ");
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

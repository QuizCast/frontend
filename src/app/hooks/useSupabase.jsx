"use client";

import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    return supabase;
};

export default useSupabase;
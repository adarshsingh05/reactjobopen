import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async supabaseAccessToken =>{
// all is done with this with supabase and th clerk
// /connecting and accessing supabse only to authorized users
const supabase=createClient(supabaseUrl,supabaseKey,{    
        global:{
        headers:{
            Authorization:`Bearer ${supabaseAccessToken}`,
        },
    },
    });
    return supabase;
};
export default supabaseClient;
        
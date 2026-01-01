import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

let supabaseDb;

export async function connectToSupabaseDb(){
    try {
        if (supabaseDb){
            return supabaseDb
        }
        supabaseDb = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY
        );
        console.log("SupabaseDB connected:");
        return supabaseDb
    } catch (error){
        console.log(`the problem is in connect to supabase: ${error}`);
    }
}
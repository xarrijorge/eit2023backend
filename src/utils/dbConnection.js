import { createClient } from '@supabase/supabase-js'


// Create a single supabase client for interacting with your database
const Supabase_Client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default Supabase_Client
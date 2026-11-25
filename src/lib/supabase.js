// Supabase client — created once, used everywhere.
// The anon key is published on purpose. It identifies the project
// and grants nothing by itself. The safety is in the database (RLS).

// import { createClient } from "@supabase/supabase-js";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const supabase = createClient(
//   process.env.EXPO_PUBLIC_SUPABASE_URL,
//   process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
//   {
//     auth: {
//       storage: AsyncStorage, // session survives app restart
//       autoRefreshToken: true,
//       persistSession: true,
//       detectSessionInUrl: false, // no URL in a phone app
//     },
//   }
// );





import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Platform } from 'react-native'


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const storage = Platform.OS === 'web' ? localStorage : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

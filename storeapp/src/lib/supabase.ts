import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { REACT_NATIVE_SUPABASE_ANON_KEY, REACT_NATIVE_SUPABASE_URL } from "../../keys/keys";
import { Database } from "../types/supabase";
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'


const supabase: SupabaseClient = createClient<Database>(REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_ANON_KEY)

export default supabase
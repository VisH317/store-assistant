import { createClient } from "@supabase/supabase-js";
import { REACT_NATIVE_SUPABASE_ANON_KEY, REACT_NATIVE_SUPABASE_URL } from "../../keys/keys";
import { Database } from "../types/supabase";

const supabase = createClient<Database>(REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_ANON_KEY)

export default supabase
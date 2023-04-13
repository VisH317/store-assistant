import { type AppType } from "next/app";

import { api } from "~/utils/api";

// auth imports
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {

    const [supabaseClient] = useState(() => createBrowserSupabaseClient())

    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <Component {...pageProps} />
        </SessionContextProvider>
    )
};

export default api.withTRPC(MyApp);

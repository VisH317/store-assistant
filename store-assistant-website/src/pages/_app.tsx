import { type AppType } from "next/app";

import { api } from "~/utils/api";

// auth imports
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

import "~/styles/globals.css";

import { createGlobalStyle } from "styled-components";
import { config, dom } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`;


const MyApp: AppType = ({ Component, pageProps }) => {

    const [supabaseClient] = useState(() => createBrowserSupabaseClient())

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            <GlobalStyles/>
            <Component {...pageProps} />
        </SessionContextProvider>
    )
};

export default api.withTRPC(MyApp);

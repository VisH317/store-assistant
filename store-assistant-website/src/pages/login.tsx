import React, { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function Login() {
    const session = useSession()
    const supabase = useSupabaseClient()
    const router = useRouter() // add reroute when session already present

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const loginHandler = () => {
        void (async () => {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            await router.push("/dashboard")
        })()
    }

    return (
        <div className=' w-1/3 mx-[33.3%] h-full my-[15%] flex-1 items-center'>
            {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa, className: { container: 'w-full h-full' } }} theme="light" redirectTo='http://localhost:3000/'/> */}
            <h1>Login Pog</h1>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email:"/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password:"/>
            <button onClick={loginHandler}>Login</button>
        </div>
    )
}
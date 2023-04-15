import React, { useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Nav from '~/Components/Nav/nav'
import { raleway } from '~/utils/fonts'
import Link from 'next/link'

export default function Login() {
    const session = useSession()
    const supabase = useSupabaseClient()
    const router = useRouter() // add reroute when session already present

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const loginHandler = () => {
        void (async () => {
            const { data, error } = await supabase.auth.signUp({ email, password })
            await router.push("/login")
        })()
    }

    return (
        <div className="bg-white h-screen">
            <Nav/>
            <div className={`w-1/2 mx-[25%] h-1/2 my-[10%] rounded-md flex bg-white items-center flex-col ${raleway.variable} font-sans gap-10`}>
                {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa, className: { container: 'w-full h-full' } }} theme="light" redirectTo='http://localhost:3000/'/> */}
                <h1 className="text-6xl text-slate-800">Sign Up</h1>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email:" className='w-[60%] border-2 duration-300 rounded-md border-slate-200 p-5 hover:border-slate-400 hover:bg-slate-100 focus:bg-slate-100'/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password:" className='w-[60%] border-2 rounded-md duration-300 border-slate-200 p-5 hover:border-slate-400  hover:bg-slate-100 focus:bg-slate-100'/>
                <button onClick={loginHandler} className='w-[60%] h-20 text-violet-500 border-violet-500 border-2 hover:border-violet-600 text-2xl font-normal disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-violet-50 rounded-md disabled:bg-violet-100 enabled:hover:bg-violet-600 enabled:hover:text-gray-200 enabled:hover:-translate-y-1 enabled:hover:shadow-md duration-300'>Sign Up</button>
                <Link href="/login" className="text-lg cursor-pointer hover:underline duration-300">{"Already have an account? Log In"}</Link>
            </div>
        </div>
    )
}
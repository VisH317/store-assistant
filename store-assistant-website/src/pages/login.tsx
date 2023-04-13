import React, { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function Login() {
    const session = useSession()
    const supabase = useSupabaseClient()
    const router = useRouter() // add reroute when session already present

    return (
        <div className=' w-1/3 mx-[33.3%] h-full my-[15%] flex-1 items-center'>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa, className: { container: 'w-full h-full' } }} theme="light"/>
        </div>
    )
}
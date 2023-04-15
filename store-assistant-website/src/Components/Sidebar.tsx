import { useRouter } from 'next/router'
import React from 'react'
import { raleway } from '~/utils/fonts'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

interface SidebarProps {
    active: number
}

export default function Sidebar(props: SidebarProps) {
    const { active } = props
    const router = useRouter()

    return (
        <div className="w-64 bg-slate-200 h-screen flex flex-col">
            <div className={`w-full p-10 xl:text-7xl text-4xl font-sans ${raleway.variable}`}>Logo</div>
            <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded md:my-10 dark:bg-slate-500"/>
            <div className="w-full flex flex-col">
                <Action text="Stores" path="/dashboard" isActive={active===0}/>
                <Action text="New Store" path="/newStore" isActive={active===1}/>
                <Action text="Account Settings" path="/dashboard" isActive={active===2}/>
                <LogoutAction/>
            </div>
        </div>
    )
}

interface ActionProps {
    text: string
    path: string
    isActive: boolean
}

function Action(props: ActionProps) {
    const { text, path, isActive } = props

    return (
        <div className={`w-full p-5 ${isActive ? "bg-violet-500 hover:bg-violet-400" : "hover:bg-slate-400"} duration-300 cursor-pointer`}>
            <Link href={path} className={`font-sans ${raleway.variable} text-lg ${isActive ? "text-white" : "text-slate-600"}`}>{text}</Link>
        </div>
    )
}

function LogoutAction() {
    const router = useRouter()
    const supabase = useSupabaseClient()

    const logoutHandler = async () => {
        await supabase.auth.signOut()
        await router.push("/")
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <div className={`w-full p-5 hover:bg-red-500 hover:text-white duration-300 cursor-pointer font-sans ${raleway.variable} text-lg text-slate-600`} onClick={logoutHandler}>Logout</div>
    )
}
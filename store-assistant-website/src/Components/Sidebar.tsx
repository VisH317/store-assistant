import { useRouter } from 'next/router'
import React from 'react'
import { raleway } from '~/utils/fonts'
import Link from 'next/link'

interface SidebarProps {
    active: number
}

export default function Sidebar(props: SidebarProps) {
    const { active } = props
    const router = useRouter()

    return (
        <div className="w-[12.5%] bg-slate-200 h-screen flex flex-col">
            <div className={`w-full p-10 text-7xl font-sans ${raleway.variable}`}>Logo</div>
            <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
            <div className="w-full flex flex-col">
                <Action text="Stores" path="/dashboard" isActive={active===0}/>
                <Action text="New Store" path="/newStore" isActive={active===1}/>
                <Action text="Account Settings" path="/dashboard" isActive={active===2}/>
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
        <div className={`w-full p-5 ${isActive ? "bg-violet-500 hover:bg-violet-400" : "hover:bg-slate-400"} duration-300`}>
            <Link href={path} className={`font-sans ${raleway.variable} text-lg ${isActive ? "text-white" : "text-slate-600"}`}>{text}</Link>
        </div>
    )
}
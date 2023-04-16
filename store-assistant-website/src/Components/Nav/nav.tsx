import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { raleway } from '~/utils/fonts'

export default function Nav() {

    return (
        <div className={`w-full h-24 bg-slate-200 flex justify-center items-center gap-10 font-sans sticky top-0 ${raleway.variable}`}>
            <Link href="/" className="text-5xl font-black text-slate-800">StoreGPT</Link>
            <div className="w-[10%]"/>
            <Link href="/" className="font-bold text-slate-500 text-xl px-5 hover:text-slate-400 duration-300">About</Link>
            <Link href="/" className="font-bold text-slate-500 text-xl px-5 hover:text-slate-400 duration-300">Product</Link>
            <button className="text-violet-500 py-3 rounded-lg font-bold text-xl px-5 hover:bg-violet-500 hover:text-slate-200 duration-300 hover:-translate-y-1"><Link href="/login">Login</Link></button>
        </div>
    )
}
import React from 'react'
import { raleway } from '~/utils/fonts'

export default function Footer() {
    return (
        <div className={`w-full flex h-[16rem] bg-slate-300 p-10 font-sans justify-center ${raleway.variable}`}>
            <div className="w-96 flex justify-center items-center font-normal text-5xl text-slate-500 border-r-2 border-slate-500"><p>StoreGPT</p></div>
            <div className="w-48 hover:w-64 duration-300 ml-16 flex flex-col justify-center items-start gap-5">
                <p className="font-medium text-xl text-slate-500">Contact:</p>
                <input type="text" placeholder="Email: " className="p-2 rounded-lg bg-slate-300 border-2 border-slate-500 w-full duration-300"/>
                <a href="mailto:vt201916384@gmail.com" className="self-end"><button className="p-3 bg-slate-800 text-slate-100 self-end rounded-lg px-4 hover:-translate-y-1 hover:bg-violet-500 hover:shadow-lg duration-300 delay-100">Contact</button></a>
            </div>
        </div>
    )
}
import React from 'react'
import { raleway } from '~/utils/fonts'

export default function Project() {
    return (
        <div className={`flex flex-col gap-10 justify-center items-center w-full bg-slate-100 font-sans ${raleway.variable} p-10`}>
            <p className="text-5xl text-slate-700 font-bold">Our Product</p>
            <div className="flex flex-row justify-center w-[70%] gap-10">
                <ProjectItem num={1} title="Register and Setup Your Store" desc="Go through our website to set up your store in just a few minutes! Provide basic details such as name and location. Then provide a description of the aisles, the items they hold, and their relative locations"/>
                <ProjectItem num={2} title="Tell Customers About the Assistant" desc="Tell customers about the assistant and direct them to download our app, which will provide an amazing user experience and improve your customers' experience with your store"/>
                <ProjectItem num={3} title="Reap the Benefits of the Service!" desc="StoreGPT can provide suggestions for items to buy based on a general description, and provide locations of different items. It can also translate to different languages!"/>
            </div>
        </div>
    )
}

interface ProjectItemProps {
    num: number
    title: string
    desc: string
}

function ProjectItem({ num, title, desc }: ProjectItemProps) {
    return (
        <div className="w-80 h-[32rem] bg-white rounded-xl hover:shadow-lg duration-300 shadow-md border-slate-200 flex flex-col items-center justify-center p-5 pt-10">
            <div className="flex-none w-16 aspect-square rounded-[50%] bg-violet-500 text-white text-center text-4xl py-2 hover:scale-110 duration-300 hover:-translate-y-1">{num}</div>
            <div className="flex-none h-12"/>
            <p className="flex-none font-medium text-3xl text-slate-800 text-center hover:-translate-y-1 duration-300">{title}</p>
            <div className="flex-none h-4"/>
            <p className="grow font-light text-xl text-slate-500 text-center hover:-translate-y-1 duration-300">{desc}</p>
        </div>
    )
}
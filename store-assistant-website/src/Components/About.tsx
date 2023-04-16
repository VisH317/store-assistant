import React from 'react'
import Image from 'next/image'
import { raleway } from '~/utils/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'


export default function About() {
    return (
        <div className={`p-10 w-9/12 ml-[12.5%] gap-20 flex flex-row font-sans ${raleway.variable} py-20 cursor-default`}>
            <div className="w-1/2 flex justify-center">
                <Image src="/undraw_shopping_bags_tdby.svg" alt="bruh" width={700} height={100} className="hover:-translate-y-1 duration-300"/>
            </div>
            <div className="w-2/3 flex flex-col justify-start justify-center gap-10">
                <p className="text-6xl font-bold">About StoreGPT</p>
                <AboutPiece title="Set Up Your Assistant In Minutes" desc="StoreGPT provides simple and effective tools for you to create a chatbot-based store directory for people to navigate your store. Just provide your store's location and a description and we got the rest" icon="store"/>
                <AboutPiece title="Customers Can Access Your Assistant Easily" desc="Customers can access your store through our app as soon as they walk to your location. There's no complex access mechanisms here, and its available to anyone with a phone" icon="user"/>
                <AboutPiece title="Make Your Store More Accessible to All People" desc="Our chatbot will provide directions or suggestions for things to buy based on the description of items in your store, and can translate to other languages as well!"/>
            </div>
        </div>
    )
}

interface AboutPieceProps {
    title: string
    desc: string
    icon?: string
}

function AboutPiece({ title, desc, icon }: AboutPieceProps) {
    return (
        <div className="w-full flex flex-row gap-3">
            <div className="w-[11%] flex justify-end hover:scale-110 duration-300">
                <FontAwesomeIcon icon={icon==="store" ? faStore : icon==="user" ? faUser : faLanguage} className="text-violet-500 text-4xl" />
            </div>
            <div className="w-[150%] flex flex-col gap-4 justify-start">
                <p className="text-3xl font-medium text-slate-700">{title}</p>
                <p className='text-lg font-light text-slate-400'>{desc}</p>
            </div>
        </div>
    )
}
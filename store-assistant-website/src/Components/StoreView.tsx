import { Store } from '@prisma/client'
import React from 'react'

interface StoreProps {
    store: Store,
    key: string,
    update: (s: Store) => void,
    del: (s: Store) => void,
}

export default function StoreView({ store, key, update, del }: StoreProps) {
    return (
        // <div className="w-96 xl:w-[32rem] xl:h-[20rem] rounded-lg bg-white border-slate-200 p-5 relative shadow-md hover:shadow-none hover:translate-y-1 duration-300 justify-between" key={key}>
        //     {/* <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-xl font-slate-800 font-medium">{store.name}</p> */}
        //     {/* <div className="h-2"/>
        //     <p className="xl:text-lg lg:text-lg md:text-md sm:text-sm font-slate-700 font-normal">Location: {store.location}</p>
        //     <div className="h-4"/> */}
        //     <div className="grow border-black border-2 whitespace-normal mb-auto text-md font-slate-600 font-light whitespace-normal">{store.description}  uhbru ruhbru hbruhbruhb ruhbr uhbru hbruhb ruhb ruhbr uhbruh bruh</div>
        //     <div className="flex-none border-black grow border-2"> rbuh
        //         {/* <hr className="h-px mt-4 mb-3 bg-gray-200 border-0 dark:bg-gray-700"/>
        //         <div className="flex flex-row justify-end w-full gap-5 align-self-end">
        //             <button className="shadow-md bg-slate-800 text-white font-normal text-center px-5 py-3 hover:-translate-y-1 hover:bg-violet-500 duration-300 hover:rounded-md hover:shadow-xl">Update</button>
        //             <button className="shadow-md bg-red-500 text-white font-normal text-center px-5 py-3 hover:-translate-y-1 hover:bg-red-400 duration-300 hover:rounded-md hover:shadow-xl">Delete</button>
        //         </div> */}
        //     </div>
        // </div>
        <div className="flex ... flex-col w-96 cursor-default xl:w-[32rem] xl:h-[21rem] lg:w-[24rem] lg:h-[16rem] md:w-[20rem] md:h-[16rem] rounded-lg bg-white border-slate-200 p-5 shadow-md hover:shadow-none hover:translate-y-1 duration-300" key={key}>
            <div className="flex-none">
                <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-xl font-slate-800 font-medium">{store.name}</p>
               <div className="h-2"/>
               <p className="xl:text-lg lg:text-lg md:text-md sm:text-sm font-slate-700 font-normal">Location: {store.location}</p>
               <div className="h-4"/>
            </div>
            <div className="grow h-14 ...">
                {store.description}
            </div>
            <div className="flex-none w-full h-14 ... relative -top-[7%]">
                <hr className="h-1 rounded-lg mt-4 mb-3 bg-gray-200 border-0 dark:bg-slate-400"/>
                   <div className="flex flex-row justify-end w-full gap-5 align-self-end">
                       <button className="shadow-md bg-slate-800 text-white font-normal text-center px-5 py-3 hover:-translate-y-1 hover:bg-violet-500 duration-300 hover:rounded-md hover:shadow-xl" onClick={() => update(store)}>Update</button>
                       <button className="shadow-md bg-red-500 text-white font-normal text-center px-5 py-3 hover:-translate-y-1 hover:bg-red-400 duration-300 hover:rounded-md hover:shadow-xl" onClick={() => del(store)}>Delete</button>
                   </div>
            </div>
            </div>

    )
}
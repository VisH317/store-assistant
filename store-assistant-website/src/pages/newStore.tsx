import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-nextjs'
import type { GetServerSidePropsContext } from 'next'

import { api } from '../utils/api'
import { Store } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from '~/utils/supabase'
import crypto from 'crypto'
import Sidebar from '~/Components/Sidebar'
import { raleway } from '~/utils/fonts'
import { router } from '@trpc/server'
import { useRouter } from 'next/router'
import { create } from 'domain'

export default function NewStore({ user }: { user: User }) {

    const createStore = api.store.createStore.useMutation()

    const newuser = useUser()
    const supabase = useSupabaseClient<Database>()

    const router = useRouter()

    // form states
    const [name, setName] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [loc, setLoc] = useState<string>("")
    const [prompt, setPrompt] = useState<string>("")

    const [disabled, setDisabled] = useState<boolean>(false)
    const [createAlert, setCreateAlert] = useState<string>("")

    useEffect(() => {
        if(name.length===0 || desc.length===0 || loc.length===0 || prompt.length===0) setDisabled(true)
        else setDisabled(false)
    }, [loc, prompt, name, desc])

    const updateAlert = (): boolean => {
        if(name.length===0) {
            setCreateAlert("A Name must be provided")
            return false
        } else if(desc.length===0) {
            setCreateAlert("A description must be provided")
            return false
        } else if(loc.length===0) {
            setCreateAlert("A location must be provided")
            return false
        } else if(prompt.length===0) {
            setCreateAlert("A prompt must be provided")
            return false
        }
        setCreateAlert("")
        return true
    }

    const submitHandler = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(!updateAlert()) return
        const body = {
            createdAt: ((new Date()).toISOString()).toLocaleString(),
            userid: user.id,
            name,
            description: desc,
            location: loc,
            prompt,
        }

        // createStore.mutate(body)
        const { data, error } = await supabase.from("Store").insert(body)
        await router.push("/dashboard")
    }

    return (
        <div className='flex flex-row'>
            <Sidebar active={1}/>
            <div className="bg-slate-50 w-full flex justify-center items-center">
                <form onSubmit={submitHandler} className={`${raleway.variable} font-sans flex flex-col w-1/2 bg-white p-10 h-5/12 shadow-md hover:shadow-lg duration-300 rounded-md gap-7`}>
                    <div className="flex-none flex flex-col w-full items-center gap-5">
                        <p className="text-5xl font-semibold text-slate-600 font-medium">Create a New Store Assistant:</p>
                        <div className="h-2"/>
                    </div>
                    <div className="grow flex flex-col items-center justify-center gap-6">
                        <input type="text" placeholder="Name:" value={name} onChange={e => setName(e.target.value)} className="w-[60%] border-2 duration-300 border-slate-200 p-5 hover:border-slate-400"/>
                        <textarea placeholder="Description:" value={desc} onChange={e => setDesc(e.target.value)} className="w-[60%] border-2 duration-300 border-slate-200 p-5 hover:border-slate-400"/>
                        <input type="text" placeholder="Location:" value={loc} onChange={e => setLoc(e.target.value)} className="w-[60%] border-2 duration-300 border-slate-200 p-5 hover:border-slate-400"/>
                        <textarea placeholder={`Prompt: Include description of each aisle/location with a colon at the end, its items, and its relative location from the entrance (separated by line)\n\nExample: Aisle 1: item 1, item 2, item 3; location`} rows={8} cols={30} value={prompt} onChange={e => setPrompt(e.target.value)} className="w-[60%] border-2 duration-300 border-slate-200 p-5 hover:border-slate-400"/>
                    </div>
                    <div className={`${createAlert.length===0 ? "hidden" : "block"} rounded-xl bg-red-200 border-red-500 text-red-500 p-5 w-[80%] h-8`}>{createAlert}</div>
                    <div className="flex-none flex justify-center">
                        <button type="submit" disabled={disabled} className="w-[80%] h-16 bg-violet-500 text-2xl font-normal disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-violet-50 text-white rounded-md disabled:bg-violet-100 enabled:hover:bg-violet-600 enabled:hover:text-gray-200 enabled:hover:-translate-y-1 enabled:hover:shadow-md duration-300">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()
  
    if (!session)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
  
    // Run queries with RLS on the server
    const { data } = await supabase.from('users').select('*')
  
    return {
        props: {
            initialSession: session,
            user: session.user,
            data: data ?? [],
        },
    }
}
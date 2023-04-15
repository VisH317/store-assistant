import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-nextjs'
import type { GetServerSidePropsContext } from 'next'

import { api } from '../utils/api'
import { Store } from '@prisma/client'
import React, { useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from '~/utils/supabase'
import crypto from 'crypto'

export default function NewStore({ user }: { user: User }) {

    const createStore = api.store.createStore.useMutation()

    const newuser = useUser()
    const supabase = useSupabaseClient<Database>()

    // form states
    const [name, setName] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [loc, setLoc] = useState<string>("")
    const [prompt, setPrompt] = useState<string>("")

    const submitHandler = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
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
        console.log("data: ", data)
        console.log("error: ", error)
        

    }

    return (
        <div>
            <form onSubmit={submitHandler} className="bg-gray-200">
                <input type="text" placeholder="Name:" value={name} onChange={e => setName(e.target.value)}/>
                <textarea placeholder="Description:" value={desc} onChange={e => setDesc(e.target.value)}/>
                <input type="text" placeholder="Location:" value={loc} onChange={e => setLoc(e.target.value)}/>
                <textarea placeholder="Prompt" rows={5} cols={30} value={prompt} onChange={e => setPrompt(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
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
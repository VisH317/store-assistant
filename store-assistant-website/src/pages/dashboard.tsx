import { useState } from 'react'
import { User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { GetServerSidePropsContext } from 'next'

import { api } from '../utils/api'
import { Store } from '@prisma/client'

export default function Dashboard({ user }:{ user: User }) {
    const { status, data } = api.store.getStores.useQuery(undefined, { trpc: { ssr: true } })

    const mapStores = () => {
        return data?.map((s: Store) => (
            <div className="w-96 h-64" key={s.id.toString()}>
                <h1>{s.name}</h1>
                <h5>{s.location}</h5>
                <p>{s.description}</p>
                <button onClick={() => console.log("wants to update")}>Update Prompt</button>
            </div>
        ))
    }

    return status==="success" ? (
        <div>
            {mapStores()}
        </div>
    ) : <div>LOADING or ERROR</div>
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
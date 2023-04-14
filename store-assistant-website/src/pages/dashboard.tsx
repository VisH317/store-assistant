import { useState } from 'react'
import { User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { GetServerSidePropsContext } from 'next'

import { api } from '../utils/api'

export default function Dashboard({ user }) {
    const stores = api.store.useQuery()
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
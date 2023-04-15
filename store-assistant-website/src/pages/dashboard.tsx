import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-nextjs'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import type { GetServerSidePropsContext } from 'next'

import { api } from '../utils/api'
import type { Store } from '@prisma/client'
import Modal from '~/Components/Modal'
import type { Database } from '~/utils/supabase'
import Link from 'next/link'

export default function Dashboard({ user }:{ user: User }) {

    const [stores, setStores] = useState<any[]>()
    const newuser = useUser()
    console.log("New User Pog: ", newuser)

    const supabase = useSupabaseClient<Database>()

    useEffect(() => {
      async function loadData() {
        const res = await supabase.from("Store").select("*")
        console.log("store data: ", res)
        setStores(res.data)
      }
      if(user) loadData()
    }, [user])

    // const { status, data } = api.store.getStores.useQuery(newuser?.id)
    // console.log("status: ", status)
    // console.log("data: ", data)
    // const updateStoreMutation = api.store.changeStorePrompt.useMutation()

    // modal stuff
    const [open, setOpen] = useState<boolean>(false)
    const [store, setStore] = useState<Store>()

    const [prompt, setPrompt] = useState<string>("")

    const openModal = (s: Store): void => {
        setStore(s)
        setOpen(true)
    }

    const updateStore = async () => {
        // updateStoreMutation.mutate(prompt)
        await supabase.from("Store").update({ prompt }).eq('id', store?.id)
        setOpen(false)
        alert("Updated prompt!")
    }

    const mapStores = () => {
        return stores?.map((s: Store) => (
            <div className="w-96 h-64" key={s.id.toString()}>
                <h1>{s.name}</h1>
                <h5>{s.location}</h5>
                <p>{s.description}</p>
                <button onClick={() => openModal(s)}>Update Prompt</button>
            </div>
        ))
    }

    return (
        <div>
            My Stores:
            {mapStores()}
            <Link href="/newStore">Register New Store</Link>
            <Modal open={open} close={() => setOpen(false)}>
                <h1>Edit the description for your store: </h1>
                <textarea placeholder={store?.prompt} rows={10} cols={50} value={prompt} onChange={e => setPrompt(e.target.value)}/>
                <button onClick={updateStore}>Submit New Description</button>
            </Modal>
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

    const out = await supabase.auth.getSession()
    console.log("out: ", out)
  
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
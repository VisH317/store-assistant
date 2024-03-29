/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-nextjs'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import type { GetServerSidePropsContext } from 'next'

import { api } from '../utils/api'
import { OnlineStore, type Store } from '@prisma/client'
import Modal from '~/Components/Modal'
import type { Database } from '~/utils/supabase'
import Link from 'next/link'
import Sidebar from '~/Components/Sidebar'
import { raleway } from '~/utils/fonts'
import StoreView from '~/Components/StoreView'

export default function Dashboard({ user }:{ user: User }) {

    const [stores, setStores] = useState<Store[]>()
    const [onlineStores, setOnlineStores] = useState<OnlineStore[]>()
    const newuser = useUser()

    const { status, data } = api.store.getStores.useQuery(newuser?.id as string)
    useEffect(() => setStores(data), [data])

    const updateStoreMutation = api.store.changeStorePrompt.useMutation()
    const deleteStoreMutation = api.store.deleteStore.useMutation()
    
    // onlinestore trpc stuff
    const onlineStoreData = api.onlineStore.getStores.useQuery(newuser?.id as string)
    useEffect(() => setOnlineStores(onlineStoreData.data), [onlineStoreData.data])

    const updateOnlineStoreMutation = api.onlineStore.changeStorePrompt.useMutation()
    const deleteOnlineStoreMutation = api.onlineStore.deleteStore.useMutation()


    // modal stuff
    const [open, setOpen] = useState<boolean>(false)
    const [store, setStore] = useState<Store>()

    const [prompt, setPrompt] = useState<string>("")
    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => {
      if(prompt.length===0) setDisabled(true)
      else setDisabled(false)
    }, [prompt])

    const openModal = (s: Store | OnlineStore): void => {
        setStore(s as Store)
        setDeleteModal(false)
        setOpen(true)
    }

    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    const openDeleteModal = (s: Store | OnlineStore): void => {
      setStore(s as Store)
      setOpen(false)
      setDeleteModal(true)
    }

    const updateStore = async () => {
        // updateStoreMutation.mutate(prompt)
        // await supabase.from("Store").update({ prompt }).eq('id', store?.id)
        await updateStoreMutation.mutateAsync({ prompt, id: store?.id as string })
        setOpen(false)
        alert("Updated prompt!")
    }

    const closeDeleteModal = (): void => {
      setDeleteModal(false)
    }

    const deleteStore = async (s: Store) => {
      // await supabase.from("Store").delete().eq("id", s.id)
      await deleteStoreMutation.mutateAsync(s.id)
      setDeleteModal(false)
    }

    const mapStores = () => {
        return stores?.map((s: Store) => (
            <StoreView store={s} key={s.id} update={openModal} del={openDeleteModal}/>
        ))
    }

    // onlinestore modal states
    const [onlineUpdateOpen, setOnlineUpdateOpen] = useState<boolean>(false)
    const [onlineDeleteOpen, setOnlineDeleteOpen] = useState<boolean>(false)
    const [currentOnlineStore, setCurrentOnlineStore] = useState<OnlineStore>()
    
    const openOnlineUpdate = (s: Store | OnlineStore) => {
      setCurrentOnlineStore(s as OnlineStore)
      setOnlineDeleteOpen(false)
      setOnlineUpdateOpen(true)
    }

    const openOnlineDelete = (s: Store | OnlineStore) => {
      setCurrentOnlineStore(s as OnlineStore)
      setOnlineUpdateOpen(false)
      setOnlineDeleteOpen(true)
    }

    const closeOnlineUpdate = () => { setOnlineUpdateOpen(false) }
    const closeOnlineDelete = () => { setOnlineDeleteOpen(false) }

    const mapOnlineStores = () => {
        return onlineStores?.map(s => (
          <StoreView store={s} key={s.id} update={openOnlineUpdate} del={openOnlineDelete}/>
        ))
    }

    const updateOnlineStore = async () => {
        await updateOnlineStoreMutation.mutateAsync({ id: currentOnlineStore?.id as string, prompt: currentOnlineStore?.prompt as string })
		setOnlineUpdateOpen(false)
    }

	const deleteOnlineStore = async () => {
		await deleteOnlineStoreMutation.mutateAsync(currentOnlineStore?.id as string)
	}

    return (
        <>
            <div className="flex flex-row">
                <Sidebar active={0}/>
                <div className={`p-20 ${raleway.variable} font-sans bg-slate-100 w-full`}>
                  <p className={`font-semibold text-6xl text-slate-700`}>My In-Person Stores:</p>
                  <div className="h-16"/>
                  <div className="flex flex-row flex-wrap gap-2">
                    {mapStores()}
                  </div>
                  <hr className="w-96 h-2 ml-20 my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-slate-300"/>
                  <p className={`font-semibold text-6xl text-slate-700`}>My Online Stores:</p>
                  <div className="h-16"/>
                  <div className="flex flex-row flex-wrap gap-2">
                    {mapOnlineStores()}
                  </div>
                  <button className="bg-violet-500 rounded-[50%] min-[1920px]:w-24 max-[1920px]:w-16 aspect-square hover:bg-violet-400 duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-lg absolute bottom-20 right-20"><Link href="/newStore" className="text-7xl text-white font-light p-5 aspect-square">+</Link></button>
                </div>
            </div>
            <Modal open={open} close={() => setOpen(false)} del={false}>
                <div className="flex-none">
                  <p className={`text-5xl text-slate-700 ${raleway.variable} font-sans`}>Edit the description for your store: </p>
                </div>
                <div className="grow w-full flex justify-center">
                  <textarea placeholder={store?.prompt} rows={10} cols={50} value={prompt} onChange={e => setPrompt(e.target.value)} className={`w-[60%] border-2 duration-300 border-slate-200 p-5 hover:border-slate-400 ${raleway.variable} font-sans`}/>
                </div>
                <div className="flex-none w-full flex justify-center">
                  <button disabled={disabled} onClick={updateStore} className={`w-[80%] h-16 bg-violet-500 text-2xl font-normal disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-violet-50 text-white rounded-md disabled:bg-violet-100 enabled:hover:bg-violet-600 enabled:hover:text-gray-200 enabled:hover:-translate-y-1 enabled:hover:shadow-md duration-300 ${raleway.variable} font-sans`}>Submit New Description</button>
                </div>
            </Modal>
            <Modal open={deleteModal} close={closeDeleteModal} del>
                <p className={`text-4xl ${raleway.variable} font-sans font-bold text-center`}>Are you sure?</p>
                <button onClick={() => deleteStore(store!)} className={`shadow-md bg-red-500 text-white font-normal text-center px-5 py-3 hover:-translate-y-1 hover:bg-red-400 duration-300 hover:rounded-md hover:shadow-xl ${raleway.variable} font-sans`}>Delete</button>
            </Modal>

            <Modal open={onlineUpdateOpen} close={closeOnlineUpdate} del={false}>
                <div className="flex-none">
                  <p className={`text-5xl text-slate-700 ${raleway.variable} font-sans`}>Edit the description for your store: </p>
                </div>
                <div className="grow w-full flex justify-center">
                  <textarea placeholder={store?.prompt} rows={10} cols={50} value={prompt} onChange={e => setPrompt(e.target.value)} className={`w-[60%] border-2 duration-300 border-slate-200 p-5 hover:border-slate-400 ${raleway.variable} font-sans`}/>
                </div>
                <div className="flex-none w-full flex justify-center">
                  <button disabled={disabled} onClick={updateOnlineStore} className={`w-[80%] h-16 bg-violet-500 text-2xl font-normal disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-violet-50 text-white rounded-md disabled:bg-violet-100 enabled:hover:bg-violet-600 enabled:hover:text-gray-200 enabled:hover:-translate-y-1 enabled:hover:shadow-md duration-300 ${raleway.variable} font-sans`}>Submit New Description</button>
                </div>
            </Modal>
            <Modal open={onlineDeleteOpen} close={closeOnlineDelete} del>
                <p className={`text-4xl ${raleway.variable} font-sans font-bold text-center`}>Are you sure?</p>
                <button onClick={deleteOnlineStore} className={`shadow-md bg-red-500 text-white font-normal text-center px-5 py-3 hover:-translate-y-1 hover:bg-red-400 duration-300 hover:rounded-md hover:shadow-xl ${raleway.variable} font-sans`}>Delete</button>
            </Modal>
        </>
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
import React from 'react'
import { useRouter } from 'next/router'
import {  } from ''
import { api } from '~/utils/api'
import Sidebar from '~/Components/Sidebar'
import { raleway } from '~/utils/fonts'

export default function OnlineStoreView() {
    const router = useRouter()
    const { id } = router.query

    const { status, data } = api.onlineStore.getById.useQuery(id as string)

    return (
        <div className="w-screen h-screen">
            <Sidebar active={0}/>
            <div className={`font-sans ${raleway.variable}`}>
                {id}
            </div>
        </div>
    )
}
import React, { useState } from 'react'

interface ModalProps {
    children: React.ReactNode,
    open: boolean,
    close: () => void,
    del: boolean
}

export default function Modal(props: ModalProps) {
    return (
        <div className={`min-w-full h-full ${props.open ? "fixed" : "hidden"} top-0 left-0 bg-[rgba(10,10,10,0.5)] flex justify-center items-center`} onClick={props.close}>
            <div className={`${props.del ? `min-[1920px]:w-2/12 min-[1920px]:h-1/6 bg-white rounded-md p-5 flex flex-col gap-5 items-center justify-center` : `max-[1920px]:w-7/12 min-[1920px]:w-5/12 max-[1920px]:h-1/2 min-[1920px]:h-1/2 bg-white rounded-lg p-10 flex flex-col gap-5 items-center`}`} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}
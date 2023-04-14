import React, { useState } from 'react'

interface ModalProps {
    children: React.ReactNode,
    open: boolean,
    close: () => void
}

export default function Modal(props: ModalProps) {
    return (
        <div className={`min-w-screen min-h-screen ${props.open ? "fixed" : "hidden"} top-0 left-0 bg-[rgba(10, 10, 10, 0.5)] flex justify-center items-center`} onClick={props.close}>
            <div className={`w-1/2 h-1/2 bg-white rounded-lg p-5`} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}
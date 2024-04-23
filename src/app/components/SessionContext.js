"use client"
import React from 'react'
import { SessionProvider, useSession } from "next-auth/react"


export default function SessionContext({ children }) {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

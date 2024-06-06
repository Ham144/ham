"use client"
import { signIn } from 'next-auth/react'
import React, { createContext } from 'react'

export const GlobalContext = createContext(null)

const AuthenticationProvider = ({ children }) => {

    async function handleGoogle() {
        const response = await signIn("google", { callbackUrl: "/" })
        console.log(response)
    }


    return (
        <GlobalContext.Provider value={{ handleGoogle }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AuthenticationProvider
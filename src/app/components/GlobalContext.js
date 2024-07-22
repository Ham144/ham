"use client"
import { signIn, useSession } from 'next-auth/react'
import React, { createContext } from 'react'

export const GlobalContext = createContext(null)

const AuthenticationProvider = ({ children }) => {
    async function handleGoogle() {
        await signIn("google", { callbackUrl: "/" })
    }

    async function handleSubmitLogin(setloginInProgress, email, password, signIn) {
        setloginInProgress(true)
        try {
            await signIn("credentials", { email, password, callbackUrl: "/" });
        } catch (error) {
            console.log("rigth here error", error)
        }
        setloginInProgress(false)
    }


    return (
        <GlobalContext.Provider value={{ handleGoogle, handleCredentials: handleSubmitLogin, }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AuthenticationProvider

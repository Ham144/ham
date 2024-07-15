"use client"
import { getCartLength } from '@/features/cart/cartSlice'
import { signIn } from 'next-auth/react'
import React, { createContext } from 'react'
import { useDispatch } from 'react-redux'

export const GlobalContext = createContext(null)

const AuthenticationProvider = ({ children }) => {

    const dispatch = useDispatch()
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

    dispatch(getCartLength())

    return (
        <GlobalContext.Provider value={{ handleGoogle, handleCredentials: handleSubmitLogin }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AuthenticationProvider
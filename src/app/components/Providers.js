"use client"
import { getCartLength, getFavoriteLength } from '@/features/cart/cartSlice'
import { store } from '@/store'
import React from 'react'
import { Provider } from 'react-redux'
import useUserinfosProduct from './hooks/useUserinfosProduct'
import { UserInfo } from '../models/userInfo'
import { useSession } from 'next-auth/react'

const Providers = ({ children }) => {
    const { user } = useUserinfosProduct()
    const session = useSession()

    if (session.status == "authenticated") {
        store.dispatch(getFavoriteLength(user?._id))
        store.dispatch(getCartLength(user?._id))
    }

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Providers
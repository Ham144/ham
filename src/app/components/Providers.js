"use client"
import { getCartLength, getFavoriteLength, getItemsInCart } from '../../features/cart/cartSlice'
import { store } from '@/store'
import React from 'react'
import { Provider } from 'react-redux'
import useUserinfosProduct from './hooks/useUserinfosProduct'
import { useSession } from 'next-auth/react'
import { setUserdata } from '@/features/user/userSlice'

const Providers = ({ children }) => {
    const { user } = useUserinfosProduct()
    const session = useSession()

    if (session.status == "authenticated") {
        store.dispatch(getFavoriteLength(user?._id))
        store.dispatch(getCartLength(user?._id))
        store.dispatch(getItemsInCart(user?._id))
        store.dispatch(setUserdata(user))
    }

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Providers
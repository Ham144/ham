"use client"
import CartProvider from "./CartContext";


export default function GlobalProvider({ children }) {
    return (

        <CartProvider>
            {children}
        </CartProvider>
    )
}
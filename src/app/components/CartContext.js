"use client"
import { createContext, useState } from "react";

export const CartContext = createContext(null)

export default function CartProvider({ children }) {
    const [totalProduct, setTotalProduct] = useState(localStorage.getItem("totalQuantity"))


    return (
        <CartContext.Provider value={{ totalProduct, setTotalProduct }}>
            {children}
        </CartContext.Provider>
    )

}
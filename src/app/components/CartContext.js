"use client"
import { createContext, useEffect, useState } from "react";
import useUserinfosProduct from "./hooks/useUserinfosProduct";

export const CartContext = createContext(null)

export default function CartProvider({ children }) {
    const [totalProductinCart, setTotalProductinCart] = useState(0)
    const [user, setUser] = useState()

    //Favorites ----------------------------
    const [favorites, setFavorites] = useState();
    const [favoriteTotal, setFavoritesTotal] = useState(0);

    function fetcingFavorites() {
        fetch("/api/addedtocart?userInfos_id=" + user?._id).then(res => res.json()).then((data) => {
            setFavorites(data?.filter((item) => {
                return item.isFavorite === true
            }))
        }
        )
    }


    useEffect(() => {
        if (!user) {
            fetch("/api/profile").then(res => res.json()).then(user => setUser(user))
        }
        else if (!favorites) {
            fetcingFavorites()
        }
        else {
            setFavoritesTotal(favorites.length)
        }
    }, [user, favorites])


    if (user) {
        fetch("/api/addedtocart?userInfos_id=" + user?._id).then(res => res.json()).then(data =>
            setTotalProductinCart(data.reduce((total, item) => total + item.quantity, 0))
        )
    }

    return (
        <CartContext.Provider value={{ totalProductinCart, setTotalProductinCart, user, favorites, favoriteTotal, setFavoritesTotal }}>
            {children}
        </CartContext.Provider>
    )

}
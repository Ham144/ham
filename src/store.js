"use client"
import { configureStore } from "@reduxjs/toolkit";
import cartRedurer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice"

export const store = configureStore({
    reducer: {
        cart: cartRedurer,
        user: userReducer
    },
})
"use client"
import { configureStore } from "@reduxjs/toolkit";
import cartRedurer from "./features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartRedurer
    },
})
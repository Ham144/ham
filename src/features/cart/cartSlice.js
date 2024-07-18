import axios from "axios"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const base = "/api/addedtocart"

const initialState = {
    cartItems: [],
    cartLength: 0,
    favoriteLength: 0
}


//mendapatkan jumlah pesanan di cart
export const getCartLength = createAsyncThunk("cart/getCartLength", async (userInfos_id) => {
    const res = await axios.get(`${base}?userInfos_id=${userInfos_id}`)
    const length = res?.data?.reduce((acc, current) => {
        return acc + (current?.quantity || 0);
    }, 0);
    return length;
})

//mendapatkan jumlah item yang isfavorite == true
export const getFavoriteLength = createAsyncThunk("cart/getFavoriteLength", async (userInfos_id) => {
    const res = await axios.get(`${base}?userInfos_id=${userInfos_id}`)
    const length = await res?.data?.filter(item => item?.isFavorite === true).length
    return length;
})

export const deleteOne = createAsyncThunk("cart/deleteOne", async (_id, userInfos_id) => {
    const response = await fetch(base, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id,
            userInfos_id
        })
    })
    const data = await response.json()
    if (data.ok) return true
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartLength.fulfilled, (state, action) => {
                state.cartLength = action.payload
            })
            .addCase(getFavoriteLength.fulfilled, (state, action) => {
                state.favoriteLength = action.payload
            })
            .addCase(deleteOne.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
                state.cartLength = state.cartLength - 1
            })
    }
})

export const { } = cartSlice.actions
export default cartSlice.reducer


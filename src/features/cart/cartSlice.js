import axios from "axios"

const { createSlice, createAsyncThunk, current } = require("@reduxjs/toolkit")


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
    }

})

export const { } = cartSlice.actions
export default cartSlice.reducer


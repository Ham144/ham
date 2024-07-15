import axios from "axios"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const base = "/api/addedtocart"

const initialState = {
    cartItems: [],
    cartLength: 99
}


export const getCartLength = createAsyncThunk("cart/getCartLength", async () => {
    const res = await axios.get(base)
    const countLength = res.data.length
    return countLength
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartLength.fulfilled, (state, action) => {
                console.log("getCartLength", action.payload);
                return state.cartLength = action.payload
            })
    }

})

export const { } = cartSlice.actions
export default cartSlice.reducer


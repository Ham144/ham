import axios from "axios"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const base = "/api/addedtocart"

const initialState = {
    cartItems: [],
    cartLength: 0,
    favoriteLength: 0,
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

export const getItemsInCart = createAsyncThunk("cart/getItemsInCart", async (userInfos_id) => {
    const res = await axios.get(`${base}?userInfos_id=${userInfos_id}`)
    return res?.data
})

export const addPlusMinusQuantity = createAsyncThunk("cart/addorMinusOne", async (menuItemId, userInfos_id, plusMinus) => {
    if (!userInfos_id || !menuItemId || !plusMinus) throw new Error("field required")
    console.log("menuItemId:", menuItemId, "userInfos_id:", userInfos_id, "plusMinus:", plusMinus)
    async function updateQuantity(quantity) {
        console.log(quantity, userInfos_id, menuItemId)
        const response = await axios.patch(base, {
            _id: menuItemId, userInfos_id, quantity
        })
        if (response.data.ok) return quantity
        else console.log("failed update quantity")
    }
    if (plusMinus == "plus") {
        updateQuantity(quantity + 1)
    }
    else if (plusMinus == "minus") {
        updateQuantity(quantity - 1)
    }
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
            .addCase(getItemsInCart.fulfilled, (state, action) => {
                if (action.payload.length > 1 || action.payload.msg != "You don't have any item yet") {
                    state.cartItems = action.payload
                }
            })
            .addCase(addPlusMinusQuantity.fulfilled, (state, action) => {
                const found = state.cartItems.find(item => item._id === action.payload._id)
                if (found) found.quantity = action.payload.quantity
            })
    }
})

export const getAddedToCart = (state => state?.cart.cartItems)
export const getQuantityofItem = ((state, menuItemId) => {
    return state?.cart?.cartItems.find(item => item?.menuItemId === menuItemId)?.quantity
}
)

export const { } = cartSlice.actions
export default cartSlice.reducer


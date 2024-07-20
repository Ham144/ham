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

export const addPlusMinusQuantity = createAsyncThunk("cart/addorMinusOne", async ({ menuItemId, userInfos_id, plusMinus, quantity }) => {
    if (!userInfos_id || !menuItemId || !plusMinus || !quantity) {
        console.log(menuItemId, userInfos_id, plusMinus)
        throw new Error("field required")
    }

    try {
        if (plusMinus == "plus") {
            if (!menuItemId || !userInfos_id || !quantity) {
                console.log("nulll")
            }

            quantity += 1
            const response = await axios.patch(base, {
                data: { menuItemId, userInfos_id, quantity }
            })
            if (response.data.ok) {
                console.log("success update quantity")
                const result = {
                    quantity, menuItemId
                }
                return result
            }
            else throw new Error("failed update quantity")
        }
        else if (plusMinus == "minus") {

            quantity -= 1

            const response = await axios.patch(base, {
                menuItemId, userInfos_id, quantity
            })
            if (response.data.ok) console.log("success update quantity")
            else console.log("failed update quantity")
        }
    } catch (error) {
        console.log("error here", error)
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
                const { quantity, menuItemId } = action.payload.result
                const found = state.cartItems.find(item => item?.menuItemId === menuItemId)
                if (found) found.quantity = quantity
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


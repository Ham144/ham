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

    async function updateQuantity(newQuantity) {
        if (newQuantity < 1) return console.log("quantity cannot be less than 1")
        if (!menuItemId || !userInfos_id || !newQuantity) {
            throw new Error("field required")
        }

        const response = await axios.patch(base, {
            _id: menuItemId, userInfos_id, quantity: newQuantity
        })
        if (response.data.ok) {
            const result = { menuItemId, newQuantity }
            return { result }
        }
        else throw new Error("failed update quantity")
    }

    try {
        if (plusMinus == "plus") {
            return await updateQuantity(quantity + 1)
        }
        else if (plusMinus == "minus") {
            return await updateQuantity(quantity - 1)
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
        changeCheck: (state, action) => {
            const found = state.cartItems.find(item => item?.menuItemId === action.payload.menuItemId)
            found.checked = action.payload.isChecked
        },
        changeIsFavorite: (state, action) => {
            const found = state.cartItems.find(item => item?.menuItemId === action.payload.menuItemId && item?.userInfos_id === action.payload.userInfos_id)
            found.isFavorite = action.payload.isFavorite
        },
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
                try {
                    const { menuItemId, newQuantity } = action.payload?.result
                    const found = state.cartItems.find(item => item?.menuItemId === menuItemId)
                    if (found) found.quantity = newQuantity
                } catch (error) {
                    console.log("no less then one")
                }
            })
    }
})

export const getAddedToCart = (state => state?.cart.cartItems)
export const getIsChecked = ((state, menuItemId) => state.cart.cartItems.find(item => item.menuItemId == menuItemId)?.checked)
export const getQuantityofItem = ((state, menuItemId) => {
    return state?.cart?.cartItems.find(item => item?.menuItemId === menuItemId)?.quantity
}
)
export const getIsFavorite = ((state, menuItemId) => state.cart.cartItems.find(item => item.menuItemId == menuItemId)?.isFavorite)
export const { changeCheck, changeIsFavorite } = cartSlice.actions
export default cartSlice.reducer


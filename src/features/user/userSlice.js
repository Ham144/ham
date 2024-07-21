const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const initialState = {
    user: null
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserdata(state, action) {
            state.user = action.payload
        }
    },

})

export const getUserData = ((state, status) => {
    if (status != "authenticated") return null
    else return state?.user
})

export const { setUserdata } = userSlice.actions
export default userSlice.reducer
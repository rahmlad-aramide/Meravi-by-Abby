import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: null,
    // authToken: null,
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        }
    }
})

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
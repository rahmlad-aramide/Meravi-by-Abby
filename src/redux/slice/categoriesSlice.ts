import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    categories: null,
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        clearCategories: (state) => {
            state.categories = null
        }
    }
})

export const { setCategories, clearCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
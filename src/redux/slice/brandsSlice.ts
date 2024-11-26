import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    brands: null,
}

const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        setBrands: (state, action) => {
            state.brands = action.payload
        },
        clearBrands: (state) => {
            state.brands = null
        }
    }
})

export const { setBrands, clearBrands } = brandsSlice.actions;
export default brandsSlice.reducer;
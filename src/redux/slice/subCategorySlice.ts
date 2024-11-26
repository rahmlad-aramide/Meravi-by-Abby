import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    clothing: null,
    shoes: null,
    accessories: null,
    speakers: null,
    bags: null,
    allSubCategory: null
}

const subCategorySlice = createSlice({
    name: "subCategory",
    initialState,
    reducers: {
        setClothing: (state, action) => {
            state.clothing = action.payload
        },
        setShoes: (state, action) => {
            state.shoes = action.payload
        },
        setAccesories: (state, action) => {
            state.accessories = action.payload
        },
        setSpeakers: (state, action) => {
            state.speakers = action.payload
        },
        setBags: (state, action) => {
            state.bags = action.payload
        },
        setAllSubCategory: (state, action) => {
            state.allSubCategory = action.payload
        },
        // clearBrands: (state) => {
        //     state.brands = null
        // }
    }
})

export const { setClothing, setShoes, setAccesories, setBags, setSpeakers, setAllSubCategory } = subCategorySlice.actions;
export default subCategorySlice.reducer;
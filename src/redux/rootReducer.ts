import { combineReducers } from 'redux'
import authSlice from './slice/authSlice'
import cartSlice from './slice/cartSlice'
import wishlistSlice from './slice/wishlistSlice'
import categoriesSlice from './slice/categoriesSlice'
import brandsSlice from './slice/brandsSlice'
import subCategorySlice from './slice/subCategorySlice'
// import notificationSlice from './slice/notificationSlice'

export const rootReducer = combineReducers({
    auth: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    categories: categoriesSlice,
    brands: brandsSlice,
    subCategory: subCategorySlice
})

// export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
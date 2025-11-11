import { configureStore } from "@reduxjs/toolkit"
import authSlice from './authSlice.js'
import productsSlice from './productsSlice.js'

const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productsSlice
    }
})

export default store




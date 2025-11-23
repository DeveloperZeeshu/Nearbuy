import { configureStore } from "@reduxjs/toolkit"
import authSlice from './authSlice.ts'
import productsSlice from './productsSlice.ts'

const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store





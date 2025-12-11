import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShopInfo } from "../types/shop.types";

interface AuthState {
    status: boolean
    shop: ShopInfo | null
}

const initialState: AuthState = {
    status: false,
    shop: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        login: (state, action: PayloadAction<ShopInfo>) => {
            state.status = true
            state.shop = action.payload
        },
        logout: (state) => {
            state.status = false
            state.shop = null
        },
        updateProfile: (state, action: PayloadAction<ShopInfo>) => {
            state.shop = action.payload
        }
    }
})

export const { login, logout, updateProfile } = authSlice.actions
export default authSlice.reducer

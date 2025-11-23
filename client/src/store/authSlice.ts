import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { UserProfile } from "../types/shop.types"

interface AuthState {
    status: boolean,
    accessToken: string | null
    user: UserProfile | null
}

interface LoginPayload {
    accessToken: string
    user: UserProfile
}

const initialState: AuthState = {
    status: false,
    accessToken: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.status = true,
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user
        },
        logout: (state) => {
            state.status = false,
            state.accessToken = null
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer


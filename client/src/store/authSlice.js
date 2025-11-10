import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: false,
    accessToken: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        login: (state, action) => {
            state.status = true,
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user || null
        },
        logout: (state, action) => {
            state.status = false,
            state.accessToken = null
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer


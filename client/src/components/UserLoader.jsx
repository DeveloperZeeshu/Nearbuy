
import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { login, logout } from "../store/authSlice.js"
import axios from "axios"

export const UserLoader = () => {
    const dispatch = useDispatch()

    const fetchRefreshToken = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/refresh`, { withCredentials: true })
            if (res.status === 200 && res.data?.accessToken) {
                const { accessToken, ownerName, sub, email } = res.data
                dispatch(login({ accessToken, user: { sub, ownerName, email } }))
            } else {
                dispatch(logout())
            }
        } catch (err) {
            console.log(err)
            dispatch(logout())
        }

    }, [dispatch])

    useEffect(() => {
        fetchRefreshToken()
    }, [fetchRefreshToken])
}


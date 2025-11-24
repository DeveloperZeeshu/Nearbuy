
import { useCallback, useContext, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../store/authSlice.js"
import axios from "axios"
import type { RootState } from "../store/store.js"
import { AppContext } from "../context/AppContext.js"

export const useUserLoader = () => {
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { setLoading } = context

    const dispatch = useDispatch()
    const status = useSelector((state: RootState) => state.auth.status)
    const hasChecked = useRef(false)

    const fetchRefreshToken = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/refresh`, { withCredentials: true })
            if (res.status === 200 && res.data?.accessToken) {
                const { accessToken, ownerName, email } = res.data
                dispatch(login({ accessToken, user: { ownerName, email } }))
            } else {
                dispatch(logout())
            }
        } catch (err) {
            // console.log(err)
            dispatch(logout())
        } finally {
            setLoading(false)
        }

    }, [dispatch])

    useEffect(() => {
        if (!status && !hasChecked.current) {
            hasChecked.current = true
            fetchRefreshToken()
        }
    }, [status, fetchRefreshToken])
}


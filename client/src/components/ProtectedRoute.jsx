
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../store/authSlice.js"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const checkAuth = useCallback(async () => {
        if (!accessToken) {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/refresh`, { withCredentials: true })
                if (res.status === 200 && res.data?.accessToken) {
                    const { accessToken, ownerName, sub, email } = res.data
                    dispatch(login({ accessToken, user: { sub, ownerName, email } }))
                } else {
                    dispatch(logout())
                    navigate('/login')
                }
            } catch (err) {
                console.log(err)
                dispatch(logout())
                navigate('/login')
            }
        }

        setLoading(false)

    }, [dispatch, accessToken, navigate])

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (loading)
        return <div className="text-center">Loading...</div>

    return accessToken ? children : null
}


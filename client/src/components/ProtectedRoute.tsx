
import { type ReactNode } from "react"
import { useSelector } from "react-redux"

import type { RootState } from "../store/store.js"
import { Navigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext.js"

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { loading } = useAppContext()

    const status = useSelector((state: RootState) => state.auth.status)

    if (!status)
        return <Navigate to='/' replace />

    if (!loading)
        return <>{children}</>
}




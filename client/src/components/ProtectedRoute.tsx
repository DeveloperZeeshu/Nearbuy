
import { type ReactNode } from "react"
import { useSelector } from "react-redux"

import type { RootState } from "../store/store.js"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

    const accessToken = useSelector((state: RootState) => state.auth.accessToken)

    if (!accessToken)
        <Navigate to='/' replace />

    return children
}


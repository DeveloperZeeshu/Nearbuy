
import { type ReactNode } from "react"
import { useSelector } from "react-redux"

import type { RootState } from "../store/store.js"

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)

    return accessToken ? children : null
}


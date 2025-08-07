'use client'

import axios from "axios";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const [isSignInOpen, setIsSignInOpen] = useState(false)
    const [isAddProductOpen, setIsAddProductOpen] = useState(false)
    const [isEditProductOpen, setIsEditProductOpen] = useState(false)
    const [prodInfo, setProdInfo] = useState(null)

    //Shop dashboard hooks
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/shopDetails', {
                    withCredentials: true
                })
                setUser(res.data)

            } catch (err) {
                console.log(err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        if (pathname.startsWith('/shop'))
            fetchUser()

        else setLoading(false)

    }, [pathname])

    const handleSideBarToggle = () => {
        setIsSideBarOpen(true)
        setIsSignInOpen(false)
    }

    const handleSignIn = () => {
        setIsSignInOpen(true)
        setIsSideBarOpen(false)
    }

    const handleAddProduct = () => {
        setIsSideBarOpen(false)
        setIsAddProductOpen(true)

    }

    const handleEditProduct = (item) => {
        setProdInfo(item)
        setIsSideBarOpen(false)
        setIsAddProductOpen(false)
        setIsEditProductOpen(true)
    }

    return <AppContext.Provider value={{ isSideBarOpen, setIsSideBarOpen, isSignInOpen, setIsSideBarOpen, handleSignIn, setIsSignInOpen, handleSideBarToggle, handleAddProduct, setIsAddProductOpen, isAddProductOpen, user, loading, setUser, handleEditProduct, setIsEditProductOpen, isEditProductOpen, prodInfo }}>{children}</AppContext.Provider>
}


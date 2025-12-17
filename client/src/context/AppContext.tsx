import React, { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { ProductTabDetails } from "../types/product.types";
import apiClient from "../api/apiClient";
import { login, logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { handleAxiosError } from "../api/utils/handleAxiosError";
import { setAllProducts } from "../store/productsSlice";

interface AppProviderProps {
    children: ReactNode
}

interface AppContextType {
    isProductFormOpen: boolean
    isSidebarOpen: boolean
    loading: boolean
    productsLoading: boolean
    editingProduct: ProductTabDetails | null
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    openSidebar: () => void
    closeSidebar: () => void
    openProductForm: () => void
    closeProductForm: () => void
    openEditProductForm: (product: ProductTabDetails) => void
    authorizeUser: () => void
    fetchAllProducts: () => void
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children }: AppProviderProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
    const [isProductFormOpen, setIsProductFormOpen] = useState<boolean>(false)
    const [editingProduct, setEditingProduct] = useState<ProductTabDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [productsLoading, setProductsLoading] = useState<boolean>(false)

    const dispatch = useDispatch()

    const openProductForm = () => {
        setIsProductFormOpen(true)
        setEditingProduct(null)
    }

    const closeProductForm = () => {
        setIsProductFormOpen(false)
    }

    const openEditProductForm = (product: ProductTabDetails) => {
        setEditingProduct(product);
        setIsProductFormOpen(true);
    };

    const openSidebar = () => {
        setIsSidebarOpen(true)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    //Authorize User
    const authorizeUser = useCallback(async () => {
        try {
            const res = await apiClient.get('/getMe')
            if (res.status === 200) {
                const shop = res.data.shopInfo
                dispatch(login(shop))
            } else {
                dispatch(logout())
            }
        } catch (err: unknown) {
            dispatch(logout())
            // console.log(err)
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    //Fetch App Products of shop
    const fetchAllProducts = useCallback(async () => {
        setProductsLoading(true)
        try {
            const res = await apiClient.get(`product/products`)
            if (res.status === 200) {
                dispatch(setAllProducts(res.data.products))
            }
        } catch (err: unknown) {
            handleAxiosError(err)
        } finally {
            setProductsLoading(false)
        }
    }, [dispatch])

    return <AppContext.Provider value={{
        isProductFormOpen,
        openProductForm,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        openEditProductForm,
        editingProduct,
        closeProductForm,
        setLoading,
        loading,
        productsLoading,
        authorizeUser,
        fetchAllProducts
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context)
        throw new Error('App Context Error.')

    return context
}

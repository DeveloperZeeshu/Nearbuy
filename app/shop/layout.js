'use client'

import { useContext } from "react"
import AppLayout from "../components/AppLayout"
import { AddProduct } from "./components/AddProduct"
import { AppContext } from "../context/AppContext"
import { EditProd } from "./components/EditProd"

export const ShopLayout = ({ children }) => {
    const { isAddProductOpen, isEditProductOpen } = useContext(AppContext)
    return (
        <AppLayout varient='dashboard' shopName='Zeeshaan Store'>
            <div className="flex flex-col items-center">

                {(isAddProductOpen || isEditProductOpen) && <div className="fixed inset-0 bg-black/55 "></div>}
                {isAddProductOpen && <AddProduct />}
                {isEditProductOpen && <EditProd />}
                {children}
            </div>
        </AppLayout>
    )
}

export default ShopLayout


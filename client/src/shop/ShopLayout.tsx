import { Outlet } from "react-router-dom"
import { ProtectedRoute } from '../components/ProtectedRoute.js'
import { useAppContext } from '../context/AppContext.js'
import { ProductForm } from './components/productForm/ProductForm.js'
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from '../store/productsSlice.ts'
import type { AppDispatch, RootState } from "../store/store.js"
import { useEffect } from "react"

const ShopLayout = () => {
    const { isProductFormOpen, editingProduct, closeProductForm } = useAppContext()
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (isProductFormOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => document.body.classList.remove('overflow-hidden')
    }, [isProductFormOpen])
    return (
        <main className="flex justify-center items-center">
            <ProtectedRoute>
                {
                    isProductFormOpen && (
                        <div
                            className="fixed inset-0 bg-black/30 z-20"
                        />
                    )
                }

                {isProductFormOpen && (
                    <ProductForm
                        mode={editingProduct ? 'Edit' : 'Add'}
                        product={editingProduct}
                        onSuccess={() => {
                            closeProductForm()
                            dispatch(fetchProducts(accessToken))
                        }}
                    />
                )}
                <main className={isProductFormOpen ? 'pointer-events-none' : ''}>
                    <Outlet />
                </main>
            </ProtectedRoute>
        </main>
    )
}

export default ShopLayout



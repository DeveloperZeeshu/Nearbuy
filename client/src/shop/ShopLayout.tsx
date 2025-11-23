import { Outlet } from "react-router-dom"
import { ProtectedRoute } from '../components/ProtectedRoute.js'
import { useContext } from "react"
import { AppContext } from '../context/AppContext.js'
import { ProductForm } from './components/productForm/ProductForm.js'
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from '../store/productsSlice.ts'
import type { AppDispatch, RootState } from "../store/store.js"

const ShopLayout = () => {
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { isProductFormOpen, editingProduct, closeProductForm } = context
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch<AppDispatch>()
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



import { Outlet } from "react-router-dom"
import { ProtectedRoute } from '../components/ProtectedRoute.js'
import { useAppContext } from '../context/AppContext.js'
import { ProductForm } from './components/productForm/ProductForm.js'
import { useEffect } from "react"

const ShopLayout = () => {
    const { isProductFormOpen, editingProduct } = useAppContext()

    useEffect(() => {
        if (isProductFormOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => document.body.classList.remove('overflow-hidden')
    }, [isProductFormOpen])

    return (
        <ProtectedRoute>
            {
                isProductFormOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 z-50"
                    />
                )
            }

            {isProductFormOpen && (
                <ProductForm
                    mode={editingProduct ? 'Edit' : 'Add'}
                    product={editingProduct}
                />
            )}
            <div className={isProductFormOpen ? 'pointer-events-none' : ''}>
                <Outlet />
            </div>
        </ProtectedRoute>
    )
}

export default ShopLayout



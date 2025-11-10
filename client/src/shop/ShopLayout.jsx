import { Outlet } from "react-router-dom"
import { ProtectedRoute } from '../components/ProtectedRoute'
import { useContext } from "react"
import { AppContext } from '../context/AppContext'
import { ProductForm } from './components/productForm/ProductForm'
import { useDispatch, useSelector } from "react-redux"
import {fetchProducts} from '../store/productsSlice.js'

const ShopLayout = () => {
    const { isProductFormOpen, editingProduct, closeProductForm } = useContext(AppContext)
    const accessToken = useSelector(state => state.auth.accessToken)
    const dispatch = useDispatch()
    return (
        <main className="flex justify-center items-center">
            <ProtectedRoute>
                {isProductFormOpen && (
                    <ProductForm
                        mode={editingProduct ? 'edit' : 'add'}
                        product={editingProduct}
                        onSuccess={() => {
                            closeProductForm()
                            dispatch(fetchProducts(accessToken))
                        }}
                    />
                )}
                <Outlet />
            </ProtectedRoute>
        </main>
    )
}

export default ShopLayout


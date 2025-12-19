import { useCallback } from "react"
import type { Product } from "../../../types/product.types"
import { handleAxiosError } from "../../../api/utils/handleAxiosError"
import apiClient from "../../../api/apiClient"
import { useDispatch } from "react-redux"
import { editProductStatus } from "../../../store/productsSlice"
import toast from "react-hot-toast"
import { useAppContext } from "../../../context/AppContext"

interface ProductListPropType {
    product: Product
}

const ProductListCard = ({ product }: ProductListPropType) => {
    const dispatch = useDispatch()

    const { openEditProductForm } = useAppContext()

    const restockProduct = useCallback(async () => {
        try {
            const res = await apiClient.post(`/product/reactivateProd`, { id: product._id })
            if (res.status === 200) {
                dispatch(editProductStatus(product._id))
                toast.success(`Product restock successfully`)
            }
        } catch (err: unknown) {
            handleAxiosError(err)
        }
    }, [])

    const deactivateProduct = useCallback(async () => {
        try {
            const res = await apiClient.post(`/product/deactivateProd`, { id: product._id })
            if (res.status === 200) {
                dispatch(editProductStatus(product._id))
                toast.success(`Product deactivated successfully`)
            }
        } catch (err: unknown) {
            handleAxiosError(err)
        }
    }, [])

    return (
        <div
            className="bg-white rounded-lg shadow-sm hover:shadow-xl p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:gap-15 transition-all duration-300 border border-gray-200"
        >
            {/* PRODUCT INFO */}
            <div className="flex items-center gap-3 flex-1">
                <img
                    src={`https://placehold.co/80x80?text=${product.name}`}
                    alt={product.name}
                    className="h-16 w-16 object-cover rounded"
                />
                <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.description}</p>
                    <p className="mt-1 font-semibold text-purple-600">
                        ₹{product.price.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* STATUS TAGS */}
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                    Stock: {product.isAvailable ? 12 : 0}
                </span>
                <span
                    className={`text-xs px-2 py-1 rounded-full ${product.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {product.isAvailable ? "In Stock" : "Out of Stock"}
                </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                <button
                    onClick={() => openEditProductForm(product)}
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-md px-3 py-1 text-sm font-medium"
                >
                    Edit
                </button>
                <button
                    disabled={product.isAvailable}
                    onClick={() => restockProduct()}
                    className="bg-green-50 text-green-600 hover:bg-green-100 rounded-md px-3 py-1 text-sm font-medium"
                >
                    Restock
                </button>
                <button
                    disabled={!product.isAvailable}
                    onClick={() => deactivateProduct()}
                    className="bg-red-50 text-red-600 hover:bg-red-100 rounded-md px-3 py-1 text-sm font-medium"
                >
                    Deactivate
                </button>
            </div>
        </div>
    )
}

export default ProductListCard


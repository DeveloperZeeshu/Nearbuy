import { AppContext } from "@/app/context/AppContext"
import axios from "axios"
import { useContext } from "react"
import toast from "react-hot-toast"

export const ProductTab = ({ p }) => {
    const { handleEditProduct } = useContext(AppContext)

    const handleDeactivateProduct = async (item) => {
        const confirmRes = confirm(`Are you sure you want to deactivate ${item.name}?`)
        if (!confirmRes) return

        try {
            const res = await axios.post(`/api/deactivateProd`, { id: item.id })
            if (res.status === 200) toast.success('Item deactivated successfully')

        } catch (err) {
            console.log(err)
            toast.error(`Something went wrong while deactivating product! ${err.message}`)
        }
    }

    const reactivateProd = async (item) => {
        const confirmRes = confirm(`Are you sure you want restock ${item.name}?`)
        if (!confirmRes) return

        try {
            const res = await axios.post('/api/reactivateProd', { id: item.id })
            if (res.status === 200) {
                toast.success('Product reactivate successfully')
            }
        }
        catch (err) {
            console.log(err)
            toast.error("Error reactivating product")
        }
    }

    const handleEditProd = (item) => {
        handleEditProduct(item)
    }

    return (
        <>
            <div className="border flex flex-col lg:flex-row justify-between items-center gap-[2rem] border-gray-300 p-6 rounded-xl bg-white">
                <div className="flex items-center justify-center gap-6">
                    <img src={p.image || `https://placehold.co/400x400?text=${p.name}`} alt={p.name} className="h-16 w-16 rounded" loading="lazy"/>
                    <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-gray-500 text-xl">{p.description}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:gap-[6rem] lg:flex-row">
                    <div className="text-gray-700 text-end justify-center items-center flex gap-6 lg:gap-[6rem] text-2xl space-y-1">
                        <span>₹{p.price}</span>
                        <span className={`px-3 py-1 ${p.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-full`}>{p.isAvailable ? 'In stock' : 'Out of stock'}</span>
                    </div>

                    <div className="flex items-center justify-center gap-6 text-2xl">
                        <button className="text-purple-600 hover:text-purple-800" onClick={() => handleEditProd(p)}>Edit</button>
                        <button onClick={() => reactivateProd(p)} className="text-gray-500 hover:text-gray-700">Restock</button>
                        <button className="text-red-600 hover:text-red-800" onClick={() => handleDeactivateProduct(p)} >Deactivate</button>
                    </div>
                </div>
            </div>
        </>
    )
}


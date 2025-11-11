import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { updateProductStatus } from '../../store/productsSlice.js'
import { useContext } from "react"
import {AppContext} from '../../context/AppContext.jsx'

export const ProductTab = ({ p }) => {
    const accessToken = useSelector(state => state.auth.accessToken)
    const dispatch = useDispatch()
    const {openEditProductForm} = useContext(AppContext)

    const handleDeactivateProduct = async (item) => {
        if (!accessToken) return

        const confirmRes = confirm(`Are you sure you want to deactivate ${item.name}?`);
        if (!confirmRes) return;

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/product/deactivateProd`,
                { id: item._id },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            if (res.status === 200) {
                dispatch(updateProductStatus({ _id: item._id, isAvailable: false }));
                toast.success('Item deactivated successfully');
            }
        } catch (err) {
            console.error(err);
            toast.error(`Something went wrong while deactivating product! ${err.message}`);
        }
    };

    const reactivateProd = async (item) => {
        if (!accessToken) return

        const confirmRes = confirm(`Are you sure you want to restock ${item.name}?`);
        if (!confirmRes) return;

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/product/reactivateProd`,
                { id: item._id },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            if (res.status === 200) {
                dispatch(updateProductStatus({ _id: item._id, isAvailable: true }));
                toast.success('Product reactivated successfully');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error reactivating product');
        }
    };


    return (
        <>
            <div className="border flex flex-col text-lg lg:flex-row justify-between items-center gap-6 border-gray-300 p-4 rounded-xl bg-white">
                <div className="flex items-center justify-center gap-6">
                    <img src={p?.image || `https://placehold.co/400x400?text=${p?.name}`} alt={p?.name} className="h-13 w-13 rounded" loading="lazy" />
                    <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-gray-500 text-sm">{p.description}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:gap-4 lg:flex-row">
                    <div className="text-gray-700 text-end justify-center items-center flex gap-6 lg:gap-4 space-y-1">
                        <span>₹{p?.price}</span>
                        <span className={`px-3 text-sm py-1 ${p?.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-full`}>{p?.isAvailable ? 'In stock' : 'Out of stock'}</span>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                        <button className="text-purple-600 hover:text-purple-800" onClick={() => openEditProductForm(p)}>Edit</button>
                        <button onClick={() => reactivateProd(p)} className="text-gray-500 hover:text-gray-700">Restock</button>
                        <button className="text-red-600 hover:text-red-800" onClick={() => handleDeactivateProduct(p)} >Deactivate</button>
                    </div>
                </div>
            </div>
        </>
    )
}


'use client'

import { AppContext } from "@/app/context/AppContext"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ProductTab } from "../components/ProductTab"

const ManageProducts = () => {
    const { user, loading } = useContext(AppContext)
    const [product, setProducts] = useState(null)
    const [formData, setFormData] = useState({
        query: '',
        shopId: ''
    })

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, shopId: user.id }))
        }
    }, [user])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const query = params.get('query')
        const shopId = params.get('shopId')

        if (query && shopId) {
            axios.get(`/api/searchStock?query=${query}&shopId=${shopId}`)
                .then((res) => {
                    if (res.status === 200) {
                        setProducts(res.data)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error('Error fetching item')
                })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set('query', formData.query)
        newUrl.searchParams.set('shopId', formData.shopId)
        window.history.pushState({}, '', newUrl)

        try {
            const res = await axios.get(`/api/searchStock?query=${formData.query}&shopId=${formData.shopId}`)
            if (res.status === 200) {
                setProducts(res.data)
                setFormData(prev => ({ ...prev, query: '' }))
            }
        } catch (err) {
            console.log(err)
            toast.error('Item not found')
        }
    }

    if (loading) return <div>Loading...</div>
    return (
        <>
            <main className="w-full flex flex-col px-10 pt-24 pb-24 gap-16 mx-auto">
                <div className="flex flex-col justify-center items-center text-center">
                    <h2 className="text-4xl font-bold mb-4">Manage your Inventory 🧩</h2>
                    <p className="text-gray-500 mb-6">View, update, and manage all your shop's products in one place.</p>
                </div>

                <form className="flex flex-col p-6 border border-gray-300 rounded-2xl lg:flex-row justify-center items-center gap-8 w-full" onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={formData.query} className="px-[2rem] py-[1rem] lg:min-w-[40rem] w-full border-2 border-[#808080cb] rounded-2xl" type="search" placeholder="Search for products…" id="query" name="query" required />

                    <input type="submit" className="cursor-pointer text-white bg-purple-600 hover:bg-purple-500 py-[1.3rem] text-3xl font-[500] px-[3rem] lg:px-[2.5rem] rounded-2xl " value='Search' />
                </form>

                {product && product.map((p) => (
                    <ProductTab key={p.id} p={p} />
                ))}

                <div className="w-full lg:w-[80rem]">
                    <Products shopId={user.id} />
                </div>
            </main>
        </>
    )
}

export const Products = ({ shopId }) => {
    const { handleAddProduct } = useContext(AppContext)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`/api/shopProducts?shopId=${shopId}`)
            if (res.status === 200) {
                setProducts(res.data)
            }
        } catch (err) {
            console.log('Error fetching products')
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <>
            <div className="bg-white w-full border text-2xl flex gap-9 flex-col border-gray-300 rounded-xl p-6">
                <div className="flex justify-between gap-5 items-center">
                    <h2 className="text-3xl lg:text-4xl font-bold">Inventory Management</h2>
                    <button onClick={handleAddProduct} className="bg-purple-600 hover:bg-purple-500 cursor-pointer text-white px-6 py-4 rounded-xl">Add Product</button>
                </div>

                <div className="w-full">
                    <div className="space-y-6 text-2xl">
                        {products.map((p) => (
                            <ProductTab key={p.id} p={p} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageProducts



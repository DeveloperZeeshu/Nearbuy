'use client'

import { useSearchParams } from "next/navigation"
import { ProductCard } from "../components/ProductCard"
import { useEffect, useState } from "react"
import axios from "axios"
import AppLayout from "../components/AppLayout"
import toast from "react-hot-toast"

const SearchPage = () => {
    const searchParams = useSearchParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const query = searchParams.get('query')
        const category = searchParams.get('category')
        const radius = searchParams.get('radius')
        const lat = searchParams.get('lat')
        const lng = searchParams.get('lng')

        if (query && category && lat && lng) {
            axios.post('/api/searchProducts', {
                query,
                category,
                radius,
                latitude: lat,
                longitude: lng
            })
                .then((res) => {
                    setLoading(false)
                    if(res.status === 200){
                    setProducts(res.data)
                    }
                })
                .catch((err) => {
                    setLoading(false)
                    toast.error('Product not found!')
                    console.log(err)
                })
        }
    }, [searchParams])

    return (
        <>
            <AppLayout varient="public">
                <main className="max-w-[142rem] flex justify-center items-center px-[2.4rem] text-center py-24 gap-[4rem] mx-auto my-auto flex-col">
                    
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-4xl font-bold mb-4">🔍Find What You Need, Nearby.</h2>
                        <p className="text-gray-500">Showing products available near your location.</p>
                    </div>

                    {loading ? <div>Loading...</div> : <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem]">
                        {
                            products.map((s) => (
                                <ProductCard
                                    key={s.id}
                                    prodInfo={{
                                        name: s.name,
                                        price: s.price,
                                        description: s.description,
                                        img: s.image,
                                        phone: s.shop_phone,
                                        shopName: s.shop_name,
                                        address: s.shop_address,
                                        distance: s.shop_distance,
                                        lat: s.latitude,
                                        lng: s.longitude
                                    }} />
                            ))
                        }
                    </ul>}
                </main>
            </AppLayout>
        </>
    )
}

export default SearchPage

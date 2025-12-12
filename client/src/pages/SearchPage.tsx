import { ProductCard } from '../components/ui/ProductCard'
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Container from '../components/container/Container'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../components/ui/Loader'
import Button from '../components/ui/button/Button'
import { motion } from 'motion/react'
import { fromLeftVariants } from '../animations/fromLeftVariants'
import apiClient from '../api/apiClient'

interface ShopInfo {
    shopName: string
    address: string
    phone: number
    location?: {
        coordinates: [number, number]
    }
}

interface SearchedProductInfo {
    _id: string
    name: string
    price: number
    description: string
    image: string
    shopId?: ShopInfo
}

const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState<SearchedProductInfo[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchProducts = async () => {
            const query = searchParams.get('query');
            const category = searchParams.get('category');
            const radius = searchParams.get('radius') || 10000;
            const lat = searchParams.get('lat');
            const lng = searchParams.get('lng');

            if (!lat || !lng) {
                toast.error('Location data missing');
                setLoading(false);
                return;
            }

            try {
                const res = await apiClient.get(`/product/search`, {
                    params: { query, category, radius, lat, lng },
                });

                if (res.data.success) {
                    setProducts(res.data.products || []);
                } else {
                    setProducts([]);
                    toast.error('No products found');
                }
            } catch (err) {
                // console.error(err);
                toast.error('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams]);

    if (loading)
        return (
            <Container>
                <Loader />
            </Container>
        )

    if (products.length < 1)
        return (
            <Container>
                <motion.div
                    variants={fromLeftVariants}
                    initial='hidden'
                    animate='show'
                    className='flex flex-col justify-center items-center bg-white px-3 pb-5 rounded-xl shadow-lg'>
                    <img
                        src='/noProductFound.svg'
                        alt='no product found nearby'
                        loading='lazy'
                        className='h-80 w-80'
                    />
                    <p className='text-xl font-semibold mb-5 text-center'>No Product found nearby.</p>
                    <Button
                        type='button'
                        text='Go Back'
                        onClick={() => navigate('/')}
                    />
                </motion.div>
            </Container>
        )

    return (
        <>
            <Container>
                <div className='bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 min-h-screen rounded-xl shadow-md p-3 lg:p-5'>
                    <div className="text-center mb-6">
                        <h2 className="text-3xl text-slate-800 font-bold">🔍Find What You Need, Nearby.</h2>
                        <p className="text-gray-500 text-sm mt-1">Showing products available near your location.</p>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center mt-4">
                        {
                            products && products.map((p) => (
                                <ProductCard
                                    key={p._id}
                                    prodInfo={{
                                        id: p._id,
                                        name: p.name,
                                        price: p.price,
                                        description: p.description,
                                        img: p.image,
                                        shopName: p.shopId?.shopName,
                                        address: p.shopId?.address,
                                        phone: p.shopId?.phone,
                                        lat: p.shopId?.location?.coordinates[0],
                                        lng: p.shopId?.location?.coordinates[1]
                                    }}
                                />
                            ))}
                    </ul>
                </div>
            </Container>
        </>
    )
}

export default SearchPage

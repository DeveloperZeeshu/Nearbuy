import { ProductCard } from '../../components/ui/SearchedProductCard/ProductCard'
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import Container from '../../components/container/Container'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../../components/ui/button/Button'
import apiClient from '../../api/apiClient'
import SearchPageSkeleton from './SearchPageSkeleton'
import { ArrowLeft } from 'lucide-react'

interface SearchedProductInfo {
    _id?: string
    name: string
    category: string
    description: string
    price: number
    imageUrl?: string
    isAvailable?: boolean
}

export interface SearchedShopInfo {
    _id?: string
    shopName: string
    ownerName?: string
    email?: string
    phone: string
    address: string
    city?: string
    state?: string
    zipcode?: string
    location?: {
        coordinates: [number, number]
    }
    distanceKm: number
    imageUrl?: string
    isVerified?: boolean
    product: SearchedProductInfo
}

const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState<SearchedShopInfo[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchProducts = useCallback(async () => {
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

            if (res.status === 200) {
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
    }, [])

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    if (loading)
        return (
            <Container>
                <div className='w-full'>
                    <button
                        onClick={() => navigate('/')}
                        className='text-sm mb-2 text-blue-600 font-semibold hover:text-blue-500 flex gap-.5 items-center cursor-pointer'
                    ><ArrowLeft size={18} />
                        Back to Home
                    </button>
                </div>
                <SearchPageSkeleton />
            </Container>
        )

    if (products.length < 1)
        return (
            <Container>
                <div
                    className='flex flex-col items-center min-h-screen'>
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
                </div>
            </Container>
        )

    return (
        <>
            <Container>
                <div className='w-full'>
                    <button
                        onClick={() => navigate('/')}
                        className='text-sm mb-2 text-blue-600 font-semibold hover:text-blue-500 flex gap-.5 items-center cursor-pointer'
                    ><ArrowLeft size={18} />
                        Back to Home
                    </button>
                </div>
                <div className='min-h-screen'>
                    <div className="text-center mb-6">
                        <h2 className="text-3xl text-slate-800 font-bold">🔍Find What You Need, Nearby.</h2>
                        <p className="text-gray-500 text-sm mt-1">Showing products available near your location.</p>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center mt-4">
                        {
                            products && products.map((p) => (
                                <ProductCard
                                    key={p._id}
                                    prodInfo={p}
                                />
                            ))}
                    </ul>
                </div>
            </Container>
        </>
    )
}

export default SearchPage


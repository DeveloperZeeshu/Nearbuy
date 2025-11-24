import { ProductCard } from '../components/ui/ProductCard'
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Container from '../components/container/Container'
import { useSearchParams } from 'react-router-dom'

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
    const [products, setProducts] = useState<SearchedProductInfo[]>([])
    const [loading, setLoading] = useState<boolean>(false)

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
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/search`, {
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
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </Container>
        )

    if (products.length < 1)
        return <Container>No Product found nearby.</Container>

    return (
        <>
            <Container>
                <div>
                    <div className="flex flex-col justify-center items-center px-3 mb-6">
                        <h2 className="text-2xl text-center font-bold">🔍Find What You Need, Nearby.</h2>
                        <p className="text-gray-500 text-center">Showing products available near your location.</p>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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

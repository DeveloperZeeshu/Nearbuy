import { ProductCard } from '../components/ui/ProductCard'
import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Container from '../components/container/Container'
import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

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
                console.error(err);
                toast.error('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams]);

    return (
        <>
            <Container>

                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold mb-4">🔍Find What You Need, Nearby.</h2>
                    <p className="text-gray-500">Showing products available near your location.</p>
                </div>

                {loading ? <div>Loading...</div> :
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {
                            products && products.map((s) => (
                                <ProductCard
                                    key={s._id}
                                    prodInfo={{
                                        id: s._id,
                                        name: s.name,
                                        price: s.price,
                                        description: s.description,
                                        img: s.image,
                                        shopName: s.shopId?.shopName,
                                        address: s.shopId?.address,
                                        phone: s.shopId?.phone,
                                        lat: s.shopId?.location?.coordinates[0],
                                        lng: s.shopId?.location?.coordinates[1]
                                    }}
                                />
                            ))}
                    </ul>}
            </Container>
        </>
    )
}

export default SearchPage

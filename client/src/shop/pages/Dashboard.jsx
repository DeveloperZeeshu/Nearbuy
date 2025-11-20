import { StatCard } from '../components/StateCard'
import { AdminProfile } from '../components/AdminProfile'
import { QuickStats } from '../components/StateCard'
import { Products } from '../pages/Products'
import Container from '../../components/container/Container'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const DashboardPage = () => {
    const accessToken = useSelector(state => state.auth.accessToken)
    const [shop, setShop] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchShopData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/me`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setShop(res.data.shop);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to load shop info');
        } finally {
            setLoading(false);
        }
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return
        fetchShopData()
    }, [accessToken, fetchShopData])

    if (loading) return <div className='text-center'>Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <>
            <Container>
                <div className="w-full rounded-lg flex flex-col gap-4 shadow-xl p-4">
                    <StatCard ownerName={shop?.ownerName} />

                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Left Side */}
                        <div className="flex-1 space-y-4">
                            <AdminProfile shop={shop} />
                            <QuickStats />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Products shopId={shop?._id} />
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-300 rounded-lg p-4">
                                    <h3 className="font-bold mb-9">Recent Orders</h3>
                                </div>
                                <div className="bg-white border border-gray-300 rounded-lg p-4">
                                    <h3 className="font-bold mb-9">Quick Actions</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="bg-gray-100 py-2 font-semibold hover:bg-gray-200 px-3 rounded-lg text-center">
                                            Update Hours
                                        </button>
                                        <button className="bg-gray-100 py-2 font-semibold hover:bg-gray-200 px-3 rounded-lg text-center">
                                            View Analytics
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default DashboardPage

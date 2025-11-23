import { StatCard } from '../components/StateCard'
import { AdminProfile } from '../components/AdminProfile'
import { QuickStats } from '../components/StateCard'
import { Products } from './Products'
import Container from '../../components/container/Container'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import type { RootState } from '../../store/store'
import type { ShopInfo } from '../../types/shop.types'

const DashboardPage = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    const [shop, setShop] = useState<ShopInfo>()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchShopData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/me`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setShop(res.data.shop);
        } catch (err: any) {
            // console.error(err);
            setError(err.response?.data?.message || 'Failed to load shop info');
        } finally {
            setLoading(false);
        }
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return
        fetchShopData()
    }, [accessToken, fetchShopData])

    if (loading) return (
        <Container>
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </Container>
    )
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
                            <Products />
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-300 rounded-lg p-4">
                                    <h3 className="font-bold mb-9">Recent Orders</h3>
                                </div>
                                <div className="bg-white border border-gray-300 rounded-lg p-4">
                                    <h3 className="font-bold mb-9">Quick Actions</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="bg-gray-100 py-2.5 font-semibold hover:bg-gray-200 text-sm px-3 rounded-lg text-center">
                                            Update Hours
                                        </button>
                                        <button className="bg-gray-100 py-2.5 font-semibold hover:bg-gray-200 text-sm px-3 rounded-lg text-center">
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

import { useCallback, useEffect, useState } from "react"
import ShopForm from "../../components/Forms/ShopForm"
import Container from '../../components/container/Container'
import { useSelector } from 'react-redux'
import toast from "react-hot-toast"
import axios from "axios"
import type { RootState } from "../../store/store"

const EditProfile = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    const [shop, setShop] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchShopDetails = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/me`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            setShop(res.data.shop)
        } catch (err) {
            // console.log(err)
            toast.error('Unable to fetch details.')
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return
        fetchShopDetails()
    }, [accessToken, fetchShopDetails])

    if (loading) return (
        <Container>
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </Container>
    )
    if (error) return <div className="text-center">{error}</div>

    return (
        <Container>
            <ShopForm
                shopInfo={shop}
            />
        </Container>
    )
}

export default EditProfile


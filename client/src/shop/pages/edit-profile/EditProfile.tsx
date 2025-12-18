import ShopForm from "../../../components/Forms/ShopForm"
import Container from '../../../components/container/Container'
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import { useAppContext } from "../../../context/AppContext"
import ShopFormSkeleton from "./ShopFormSkeleton"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {
    const navigate = useNavigate()

    const shop = useSelector((state: RootState) => state.auth.shop)
    const { loading } = useAppContext()

    if (loading) return (
        <Container>
            <ShopFormSkeleton />
        </Container>
    )

    return (
        <Container>
            <div className="bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 p-3 lg:p-5 rounded-xl shadow-md min-h-screen">
                <div className='w-full mb-1'>
                    <button
                        onClick={() => navigate('/shop/dashboard')}
                        className='text-sm text-blue-600 font-semibold hover:text-blue-500 flex gap-.5 items-center cursor-pointer'
                    ><ArrowLeft size={18} />
                        Back to Dashboard
                    </button>
                </div>
                <ShopForm
                    shopInfo={shop}
                />
            </div>
        </Container>
    )
}

export default EditProfile


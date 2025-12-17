import ShopForm from "../../../components/Forms/ShopForm"
import Container from '../../../components/container/Container'
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import { useAppContext } from "../../../context/AppContext"
import ShopFormSkeleton from "./ShopFormSkeleton"

const EditProfile = () => {
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
                <ShopForm
                    shopInfo={shop}
                />
            </div>
        </Container>
    )
}

export default EditProfile


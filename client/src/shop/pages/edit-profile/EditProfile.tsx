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
            <ShopForm
                shopInfo={shop}
            />
        </Container>
    )
}

export default EditProfile


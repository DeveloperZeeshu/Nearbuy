import ShopForm from "../components/Forms/ShopForm"
import Container from '../components/container/Container'

const Register = () => {
    return (
        <Container>
            <div className="bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 p-3 lg:p-5 rounded-xl shadow-md min-h-screen">
                <ShopForm />
            </div>
        </Container>
    )
}

export default Register

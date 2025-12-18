import { ArrowLeft } from "lucide-react"
import ShopForm from "../components/Forms/ShopForm"
import Container from '../components/container/Container'
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <div className="bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 p-3 lg:p-5 rounded-xl shadow-md min-h-screen">
                <div className='w-full mb-1'>
                    <button
                        onClick={() => navigate('/')}
                        className='text-sm text-blue-600 font-semibold hover:text-blue-500 flex gap-.5 items-center cursor-pointer'
                    ><ArrowLeft size={18} />
                        Back to Home
                    </button>
                </div>
                <ShopForm />
            </div>
        </Container>
    )
}

export default Register

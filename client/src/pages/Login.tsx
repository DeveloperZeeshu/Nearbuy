import { useNavigate } from 'react-router-dom'
import SignIn from '../components/Forms/SignIn'
import Container from '../components/container/Container'
import { ArrowLeft } from 'lucide-react'

const Login = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <div className='bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 p-3 lg:p-5 rounded-xl shadow-md min-h-screen'>
                <div className='w-full mb-1'>
                    <button
                        onClick={() => navigate('/')}
                        className='text-sm text-blue-600 font-semibold hover:text-blue-500 flex gap-.5 items-center cursor-pointer'
                    ><ArrowLeft size={18} />
                        Back to Home
                    </button>
                </div>
                <SignIn />
            </div>
        </Container>
    )
}

export default Login

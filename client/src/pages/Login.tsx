import SignIn from '../components/Forms/SignIn'
import Container from '../components/container/Container'

const Login = () => {
    return (
        <Container>
            <div className='bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 p-3 lg:p-5 rounded-xl shadow-md min-h-screen'>
                <SignIn />
            </div>
        </Container>
    )
}

export default Login

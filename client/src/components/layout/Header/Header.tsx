import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext.js'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../services/auth.sevice.js'
import toast from 'react-hot-toast'
import { logout } from '../../../store/authSlice.js'
import type { AppDispatch, RootState } from '../../../store/store.js'
import Button from '../../ui/Button.js'
import { LogOut, Menu } from 'lucide-react'

interface NavItem {
    name: string
    slug: string
    active: boolean
}

const Header = () => {

    const { openSidebar } = useAppContext()

    const authStatus = useSelector((state: RootState) => state.auth.status)
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const navItems: NavItem[] = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'DashBoard',
            slug: '/shop/dashboard',
            active: authStatus
        },
        {
            name: 'Manage Products',
            slug: '/shop/products',
            active: authStatus
        },
        {
            name: 'Profile',
            slug: '/shop/edit-profile',
            active: authStatus
        },
        {
            name: 'Shops',
            slug: '/shops',
            active: true
        },
        {
            name: 'About Us',
            slug: '/about',
            active: true
        }
    ]

    const handleLogout = async () => {
        if (!accessToken)
            return
        try {
            const res = await logoutUser(accessToken)
            if (res?.success) {
                toast.success('Logout successfully.')
                dispatch(logout())
                navigate('/')
            }
        } catch (err) {
            // console.log(err)
            toast.error('Error logout user.')
        }
    }

    // if (loading)
    //     return (
    //         <Loader />
    //     )

    return (
        <header className="max-w-8xl shadow-xl z-20 flex justify-between items-center w-full rounded-b-xl bg-white px-4 py-4 mx-auto my-auto fixed">

            <div className="flex w-full lg:w-auto justify-between lg:justify-center items-center">
                <button onClick={openSidebar} className="text-2xl cursor-pointer lg:hidden">
                    <Menu />
                </button>
                <Link to='/' className="text-2xl font-bold text-indigo-600">NearBuy</Link>
            </div>

            <nav className="hidden lg:flex justify-center items-center gap-8">
                {
                    navItems.map(nav => (
                        nav.active && <NavLink
                            className={({ isActive }) => `${isActive ? 'font-bold text-indigo-600' : null}`}
                            key={nav.name}
                            to={nav.slug}>
                            {nav.name}
                        </NavLink>
                    ))
                }
            </nav>
            {
                authStatus ?
                    <button onClick={handleLogout} className='hidden lg:flex justify-center items-center gap-1 cursor-pointer'>
                        <LogOut className='text-xl' size={18} />
                        <span>Logout</span>
                    </button>
                    :
                    <div className={`hidden lg:flex justify-center items-center gap-6`}>
                        <Link to='/login' className="font-medium cursor-pointer">Login</Link>
                        <Button
                            type='button'
                            text='Register Shop'
                            onClick={() => navigate('/register')}
                        />
                    </div>}
        </header>
    )
}

export default Header


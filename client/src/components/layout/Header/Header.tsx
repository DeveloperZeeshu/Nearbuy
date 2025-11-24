import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../context/AppContext.js'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../services/auth.sevice.js'
import toast from 'react-hot-toast'
import { logout } from '../../../store/authSlice.js'
import type { AppDispatch, RootState } from '../../../store/store.js'
import Button from '../../ui/Button.js'
import { IoLogOutOutline } from 'react-icons/io5'
import Container from '../../container/Container.js'

interface NavItem {
    name: string
    slug: string
    active: boolean
}

const Header = () => {
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { openSidebar, loading } = context

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
            name: 'About',
            slug: '/about',
            active: true
        },
        {
            name: 'Shops',
            slug: '/shops',
            active: !authStatus
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

    if (loading)
        return (
            <div className='p-4 max-w-8xl w-full flex justify-center items-center'>
                <div className="w-8 text-center h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </div>
        )

    return (
        <header className="max-w-8xl shadow-xl z-20 flex justify-between items-center w-full rounded-b-xl bg-white px-4 py-4 mx-auto my-auto fixed">

            <div className="flex w-full lg:w-auto justify-between lg:justify-center items-center">
                <button onClick={openSidebar} className="text-2xl cursor-pointer lg:hidden">☰</button>
                <Link to='/' className="text-xl font-bold">Near Buy</Link>
            </div>

            <nav className="hidden lg:flex justify-center items-center gap-8">
                {
                    navItems.map(nav => (
                        nav.active && <NavLink
                            className={({ isActive }) => `${isActive ? 'font-bold' : null}`}
                            key={nav.name}
                            to={nav.slug}>
                            {nav.name}
                        </NavLink>
                    ))
                }
            </nav>
            {
                authStatus ?
                    <button onClick={handleLogout} className='hidden lg:flex justify-center items-center gap-1'><IoLogOutOutline className='text-xl' />Logout</button>
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


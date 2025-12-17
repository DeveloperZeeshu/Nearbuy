import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext.js'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../services/auth.sevice.js'
import toast from 'react-hot-toast'
import { logout } from '../../../store/authSlice.js'
import type { AppDispatch, RootState } from '../../../store/store.js'
import { Bell, Menu, Search } from 'lucide-react'
import HeaderSkeleton from './HeaderSkeleton.js'

interface NavItem {
    name: string
    slug: string
    active: boolean
}

const Header = () => {

    const { openSidebar, loading } = useAppContext()

    const authStatus = useSelector((state: RootState) => state.auth.status)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const navItems: NavItem[] = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Manage Products',
            slug: '/shop/products',
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
        try {
            const res = await logoutUser()
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
            <HeaderSkeleton />
        )

    return (
        <header className="fixed bg-white top-0 left-0 w-full z-50 shadow-sm">
            <div className="max-w-8xl mx-auto h-16 px-3 lg:px-4 flex items-center justify-between">

                {/* Menu & Logo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={openSidebar}
                        className="lg:hidden text-2xl text-gray-700"
                    >
                        <Menu />
                    </button>

                    <Link
                        to={authStatus ? '/shop/dashboard' : '/'}
                        className="text-xl font-bold tracking-tight text-black"
                    >
                        NearBuy
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center ml-10 text-sm">
                        {navItems.map(
                            (nav) =>
                                nav.active && (
                                    <NavLink
                                        key={nav.name}
                                        to={nav.slug}
                                        className={({ isActive }) =>
                                            `transition ${isActive
                                                ? "text-black font-semibold"
                                                : "text-gray-600 hover:text-black"
                                            } hover:bg-gray-200/70 rounded-full px-3 py-1`
                                        }
                                    >
                                        {nav.name}
                                    </NavLink>
                                )
                        )}
                    </nav>
                </div>

                {/* CENTER: SEARCH BAR */}
                <div className="hidden md:flex flex-1 max-w-md mx-6">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search products or shops..."
                            className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black shadow-xs"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                            <Search size={19} />
                        </span>
                    </div>
                </div>

                {/* RIGHT: ACTIONS */}
                <div className="flex items-center gap-5">

                    {/* Notifications */}
                    {authStatus && (
                        <button className="relative text-gray-600 hover:text-indigo-600">
                            <Bell />
                            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                    )}

                    {/* Auth Section */}
                    {authStatus ? (
                        <div className="relative group">
                            {/* Avatar */}
                            <button className="flex items-center gap-2">
                                <img
                                    src="/profile_icon.svg"
                                    alt="profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="hidden md:block text-sm font-medium">
                                    My Account
                                </span>
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-300">
                                <Link
                                    to="/shop/dashboard"
                                    className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/shop/edit-profile"
                                    className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden lg:flex gap-3 h-9">
                            <Link
                                to="/login"
                                className="text-sm font-medium text-black hover:text-black border bg-gray-50 rounded-md border-gray-300 px-3.5 h-full flex justify-center items-center hover:bg-gray-100 transition duration-150 "
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="text-sm font-medium border border-black text-white rounded-md bg-black px-3.5 h-full flex justify-center items-center hover:bg-gray-800"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* MOBILE SEARCH */}
            {/* <div className="md:hidden px-4 pb-3">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full h-10 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-black"
                />
            </div> */}
            <div className='md:hidden px-3 lg:px-4 pb-3'>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search products or shops..."
                        className="w-full h-10 px-3 pl-9.5 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black shadow-xs"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                        <Search size={19} />
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header

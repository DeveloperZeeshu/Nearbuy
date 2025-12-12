
import Button from '../../ui/button/Button.js'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { type ElementType } from 'react';
import { useAppContext } from '../../../context/AppContext.js'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../services/auth.sevice.js';
import toast from 'react-hot-toast';
import { logout } from '../../../store/authSlice.js'
import type { RootState } from '../../../store/store.js';
import { House, LayoutDashboard, Link as LinkIcon, LogOut, Store, Tag, UserRoundPen, X } from 'lucide-react';

interface NavItem {
    name: string
    slug: string
    icon: ElementType | null
    active: boolean
}

const SideBar = () => {
    const navigate = useNavigate()

    const { closeSidebar } = useAppContext()
    const authStatus = useSelector((state: RootState) => state.auth.status)
    const dispatch = useDispatch()

    const navItems: NavItem[] = [
        {
            name: 'Home',
            slug: '/',
            icon: House,
            active: true
        },
        {
            name: 'DashBoard',
            slug: '/shop/dashboard',
            icon: LayoutDashboard,
            active: authStatus
        },
        {
            name: 'Manage Products',
            slug: '/shop/products',
            icon: Tag,
            active: authStatus
        },
        {
            name: 'Profile',
            slug: '/shop/edit-profile',
            icon: UserRoundPen,
            active: authStatus
        },
        {
            name: 'Shops',
            slug: '/shops',
            icon: Store,
            active: true
        },
        {
            name: 'About Us',
            slug: '/about',
            icon: LinkIcon,
            active: true
        }
    ]

    const handleLogout = async () => {
        try {
            const res = await logoutUser()
            if (res?.success) {
                toast.success('Logout successfully.')
                dispatch(logout())
                closeSidebar()
                navigate('/')
            }
        } catch (err) {
            // console.log(err)
            toast.error('Error logout user.')
        }
    }

    return (
        <>
            <aside className='shadow-2xl p-4 flex flex-col justify-start bg-white h-full w-full rounded-r-lg gap-9'>

                <p className="flex justify-end w-full"><X className="text-2xl cursor-pointer" onClick={closeSidebar} /></p>
                {
                    !authStatus &&
                    <div className={`flex justify-center items-center gap-5`}>
                        <Link onClick={closeSidebar} to='/login'
                            className="font-medium cursor-pointer">
                            Login
                        </Link>
                        <Button
                            text='Register Shop'
                            onClick={() => {
                                closeSidebar()
                                navigate('/register')
                            }}
                        />
                    </div>
                }

                <nav className="flex flex-col w-full space-y-1">
                    {
                        navItems.map(nav => (
                            nav.active &&
                            <NavLink
                                key={nav.name}
                                to={nav.slug}
                                onClick={closeSidebar}
                                className={({ isActive }) => `${isActive ? 'bg-gray-100' : null} w-full py-2 text-left duration-200 rounded-lg hover:bg-gray-100 px-2 flex gap-1.5 items-center`}>
                                {nav.icon && <nav.icon className='' size={19} />}
                                {nav.name}
                            </NavLink>
                        ))
                    }
                </nav>
                {
                    authStatus &&
                    <div className='w-full hover:bg-gray-100 rounded-lg py-2'>
                        <button
                            className='flex px-2 justify-center items-center cursor-pointer gap-1'
                            onClick={handleLogout}>
                            <LogOut size={19} />
                            Logout
                        </button>
                    </div>
                }
            </aside>
        </>
    )
}

export default SideBar


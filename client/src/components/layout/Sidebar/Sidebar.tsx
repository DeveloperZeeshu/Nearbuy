
import Button from '../../ui/Button.js'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCloseOutline, IoLogOutOutline } from 'react-icons/io5'
import { useContext, type ElementType } from 'react';
import { AppContext } from '../../../context/AppContext.js'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../services/auth.sevice.js';
import toast from 'react-hot-toast';
import { logout } from '../../../store/authSlice.js'
import type { RootState } from '../../../store/store.js';
import { GoHome } from 'react-icons/go';
import { IoIosLink } from 'react-icons/io';
import { CiShop } from 'react-icons/ci';
import { LuLayoutDashboard, LuUserRoundPen } from 'react-icons/lu';
import { HiOutlineTag } from 'react-icons/hi';

interface NavItem {
    name: string
    slug: string
    icon: ElementType | null
    active: boolean
}

const SideBar = () => {
    const navigate = useNavigate()
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { closeSidebar } = context
    const authStatus = useSelector((state: RootState) => state.auth.status)
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()

    const navItems: NavItem[] = [
        {
            name: 'Home',
            slug: '/',
            icon: GoHome,
            active: true
        },
        {
            name: 'DashBoard',
            slug: '/shop/dashboard',
            icon: LuLayoutDashboard,
            active: authStatus
        },
        {
            name: 'Manage Products',
            slug: '/shop/products',
            icon: HiOutlineTag,
            active: authStatus
        },
        {
            name: 'Profile',
            slug: '/shop/edit-profile',
            icon: LuUserRoundPen,
            active: authStatus
        },
        {
            name: 'Shops',
            slug: '/shops',
            icon: CiShop,
            active: true
        },
        {
            name: 'About Us',
            slug: '/about',
            icon: IoIosLink,
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

                <p className="flex justify-end w-full"><IoCloseOutline className="text-2xl cursor-pointer" onClick={closeSidebar} /></p>

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
                                className={({ isActive }) => `${isActive ? 'bg-gray-100' : null} w-full py-2 text-left duration-200 rounded-lg hover:bg-gray-100 px-2 flex gap-1.5`}>
                                {nav.icon && <nav.icon className='text-xl' />}
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
                            <IoLogOutOutline className='text-xl' />
                            Logout
                        </button>
                    </div>
                }
            </aside>
        </>
    )
}

export default SideBar


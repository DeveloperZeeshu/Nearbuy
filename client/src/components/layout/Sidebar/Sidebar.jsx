
import Button from '../../ui/Button'
import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline } from 'react-icons/io5'
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../services/auth.sevice.js';
import toast from 'react-hot-toast';
import {logout} from '../../../store/authSlice.js'

const SideBar = () => {
    const navigate = useNavigate()
    const { closeSidebar } = useContext(AppContext)
    const authStatus = useSelector(state => state.auth.status)
    const accessToken = useSelector(state => state.auth.accessToken)
    const dispatch = useDispatch()

    const navItems = [
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
            if (res.success) {
                toast.success('Logout successfully.')
                dispatch(logout())
                navigate('/')
            }
        } catch (err) {
            console.log(err)
            toast.error('Error logout user.')
        }
    }

    return (
        <>
            <aside className='shadow-2xl p-4 text-lg flex flex-col justify-start items-center fixed top-0 left-0 bg-white z-10 h-screen w-[18rem] rounded-r-xl gap-9'>

                <p onClick={closeSidebar} className="flex justify-end w-full"><IoCloseOutline className="text-4xl cursor-pointer" /></p>

                {
                    authStatus ?
                        <button onClick={handleLogout}>Logout</button>
                        :
                        <div className={`flex justify-center items-center gap-5`}>
                            <Link to='/login'
                                className="font-medium cursor-pointer">
                                Login
                            </Link>
                            <Button
                                text='Register Shop'
                                onClick={() => navigate('/register')}
                            />
                        </div>}

                <nav className="flex justify-center items-center  flex-col w-full space-y-2">
                    {
                        navItems.map(nav => (
                            nav.active &&
                            <Link
                                key={nav.name}
                                to={nav.slug}
                                onClick={closeSidebar}
                                className={`w-full py-3 text-center  duration-200 rounded-xl `}>
                                {nav.name}
                            </Link>
                        ))
                    }
                </nav>
            </aside>
        </>
    )
}

export default SideBar


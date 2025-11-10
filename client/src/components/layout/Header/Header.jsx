import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../context/AppContext'
import { useSelector } from 'react-redux'

const Header = () => {
    const { openSidebar } = useContext(AppContext)
    const authStatus = useSelector(state => state.auth.status)

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

    return (
        <header className="max-w-[1420px] shadow-xl flex justify-between items-center w-full text-white rounded-b-xl bg-purple-600 px-4 py-4 mx-auto text-lg my-auto">

            <div className="flex w-full lg:w-auto justify-between lg:justify-center items-center">
                <button onClick={openSidebar} className="text-2xl cursor-pointer lg:hidden">☰</button>
                <h3 className="text-xl font-bold">Near Buy</h3>
            </div>

            <nav className="hidden lg:flex justify-center items-center gap-8">
                {
                    navItems.map(nav => (
                        nav.active && <Link key={nav.name} to={nav.slug}>{nav.name}</Link>
                    ))
                }
            </nav>
            {
                authStatus ?
                    <button>Logout</button>
                    :
                    <div className={`hidden lg:flex justify-center items-center gap-6`}>
                        <Link to='/login' className="font-medium cursor-pointer">Login</Link>
                        <Link to='/register' className="cursor-pointer bg-[white] hover:bg-[#f1f1f1] py-[.6rem] text-purple-600 font-medium px-5 shadow-lg rounded-lg ">Register Shop</Link>
                    </div>}
        </header>
    )
}

export default Header


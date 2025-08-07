'use client'

import { SignIn } from "./SignIn"

import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { SideBar } from "./Sidebar"
import { Header } from "./Header"
import { Toaster } from "react-hot-toast"
import { HeaderDashboard } from "../shop/components/HeaderDashboard"
import { SideBarDashboard } from "../shop/components/SidebarDashboard"

const AppLayout = ({ children, varient = 'public' }) => {
    const { isSideBarOpen, setIsSignInOpen, isSignInOpen, handleSideBarToggle } = useContext(AppContext)

    return (
        <div className="flex flex-col justify-center items-center">
            <div className={`bg-[white] shadow-xl rounded-r-3xl h-full fixed top-0 left-0 transform transition-transform duration-300 z-30 w-[30rem] p-[2rem] ${isSideBarOpen ? ' translate-x-0' : '-translate-x-full'}`}>
                {varient === 'dashboard' ? <SideBarDashboard /> : <SideBar />}
            </div>

            {(isSideBarOpen || isSignInOpen) && (<div className="fixed inset-0 bg-black/55 "></div>)}

            {isSignInOpen && <SignIn handleToggle={setIsSignInOpen} />}

            {varient === 'dashboard' ? <HeaderDashboard handleToggle={handleSideBarToggle} /> : <Header handleToggle={handleSideBarToggle} />}
            <main>
                <Toaster position="top-center" />
                {children}
            </main>
        </div>
    )
}

export default AppLayout

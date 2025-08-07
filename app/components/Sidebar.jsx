'use client'

import { useContext } from "react"
import { IoCloseOutline } from "react-icons/io5";
import { AppContext } from "../context/AppContext"
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideBar = () => {
    const { setIsSideBarOpen, handleSignIn } = useContext(AppContext)
    const pathname = usePathname()

    return (
        <>
            <aside className='flex justify-center items-center gap-[4rem] flex-col'>
                <p className="flex justify-end w-full"><IoCloseOutline className="text-5xl cursor-pointer" onClick={() => setIsSideBarOpen(false)} /></p>
                
                <div className={`flex justify-center items-center gap-[2rem]`}>
                    <button onClick={handleSignIn} className="font-[500] cursor-pointer text-[2rem]">Login</button>
                    <Link href='/registration' onClick={() => setIsSideBarOpen(false)} className="cursor-pointer bg-purple-600 hover:bg-purple-500 py-[1.2rem] text-white text-3xl font-[500] px-[3rem] lg:px-[2rem] rounded-2xl ">Register Shop</Link>
                </div>

                <nav className="flex justify-center items-center  flex-col w-full space-y-3">
                    <Link onClick={() => setIsSideBarOpen(false)} className={`w-full py-3 text-center  hover:text-white transition duration-200 rounded-xl ${pathname === '/' ? 'text-white bg-purple-600': 'hover:bg-[#2c2c2ca4]'}`} href='/'>Home</Link>

                    <Link onClick={() => setIsSideBarOpen(false)} className={`w-full py-3 text-center  hover:text-white transition duration-200 rounded-xl ${pathname === '/about' ? 'text-white bg-purple-600': 'hover:bg-[#2c2c2ca4]'}`} href='/about'>About</Link>

                    <Link onClick={() => setIsSideBarOpen(false)} className={`w-full py-3 text-center hover:text-white transition duration-200 rounded-xl ${pathname === '/shops' ? 'text-white bg-purple-600': 'hover:bg-[#2c2c2ca4]'}`} href='/shops'>Shops</Link>
                </nav>
            </aside>
        </>
    )
}



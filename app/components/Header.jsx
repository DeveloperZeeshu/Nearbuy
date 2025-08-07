'use client'

import Link from "next/link"
import { RxHamburgerMenu } from "react-icons/rx"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { usePathname } from "next/navigation"

export const Header = ({ handleToggle }) => {
    const { handleSignIn } = useContext(AppContext)
    const pathname = usePathname()

    return (
        <>
            <header className="max-w-[142rem] shadow-xl flex justify-between items-center w-full text-white rounded-b-3xl bg-purple-600 px-[2.4rem] py-[2rem] mx-auto my-auto">
                <div className="flex w-full lg:w-auto justify-between lg:justify-center items-center">
                    <button className="text-5xl cursor-pointer lg:hidden" onClick={handleToggle}>☰</button>
                    <h3 className="text-4xl font-bold">Near Buy</h3>
                </div>

                <nav className="hidden lg:flex justify-center items-center gap-[3rem]">
                    <Link className={`text-[1.7rem] ${pathname === '/' ? 'text-[1.8rem] font-bold' : ''}`} href='/'>Home</Link>

                    <Link className={`text-[1.7rem] ${pathname === '/about' ? 'text-[1.8rem] font-bold' : ''}`} href='/about'>About</Link>

                    <Link className={`text-[1.7rem] ${pathname === '/shops' ? 'text-[1.8rem] font-bold' : ''}`} href='/shops'>Shops</Link>
                </nav>
                <div className={`hidden lg:flex justify-center items-center gap-[2rem]`}>
                    <button onClick={handleSignIn} className="font-[500] cursor-pointer text-[2rem]">Login</button>
                    <Link href='/registration' className="cursor-pointer bg-[white] hover:bg-[#f1f1f1] py-[1.2rem] text-purple-600 text-3xl font-[500] px-[3rem] lg:px-[2rem] shadow-lg rounded-2xl ">Register Shop</Link>
                </div>
            </header>
        </>
    )
}



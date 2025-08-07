'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { RxHamburgerMenu } from "react-icons/rx"

export const HeaderDashboard = ({ handleToggle }) => {
    const pathname = usePathname()

    return (
        <>
            <header className="max-w-[142rem] shadow-xl flex justify-between items-center w-full text-white bg-purple-600 px-[2.4rem] py-[2rem] mx-auto my-auto rounded-b-3xl">

                <RxHamburgerMenu onClick={handleToggle} className="text-5xl cursor-pointer" />

                <h3 className="text-4xl font-bold">Near Buy</h3>

                <nav className="hidden lg:flex justify-center items-center gap-[3rem]">
                    <Link className={`py-1 text-[1.7rem] ${pathname === '/' ? 'font-bold text-[1.8rem]' : ''}`} href='/'>Home</Link>
                    <Link className={`py-1 text-[1.7rem] ${pathname === '/about' ? 'font-bold text-[1.8rem]' : ''}`} href='/about'>About</Link>
                    <Link className={`py-1 text-[1.7rem] ${pathname === '/contact' ? 'font-bold text-[1.8rem]' : ''}`} href='/contact'>Contact Us</Link>
                </nav>

            </header>
        </>
    )
}


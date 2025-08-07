'use client'

import { useContext } from "react"
import { IoCloseOutline } from "react-icons/io5";
import { FaHome, FaBoxOpen, FaCog, FaBell, FaClipboardList, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { RiFileUnknowFill  } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
import { AppContext } from "@/app/context/AppContext";
import { usePathname } from "next/navigation";

const sidebarSections = [
    {
        title: 'Manage',
        links: [
            { label: 'Dashboard', href: '/shop/dashboard', icon: <MdSpaceDashboard /> },
            { label: 'Products', href: '/shop/products', icon: <FaBoxOpen /> },
            { label: 'Orders', href: '/shop/orders', icon: <FaClipboardList /> },
        ]
    },
    {
        title: 'Tools',
        links: [
            { label: 'Notifications', href: '/shop/notifications', icon: <FaBell /> },
            { label: 'Edit Profile', href: '/shop/edit_profile', icon: <FaUserEdit /> },
        ],
    },
    {
        title: 'Others',
        links: [
            { label: 'HomePage', href: '/', icon: <FaHome /> },
            { label: 'About', href: '/about', icon: <RiFileUnknowFill /> },
            { label: 'Contact Us', href: '/contact', icon: <IoMdMail /> }
        ],
    },
    {
        title: 'Account',
        links: [
            { label: 'Logout', href: '../api/logout', icon: <FaSignOutAlt /> },
        ],
    },
]

export const SideBarDashboard = () => {
    const pathname = usePathname()
    const { setIsSideBarOpen, user, loading } = useContext(AppContext)

    if (loading)
        return <div>Loading...</div>

    return (
        <>
            <aside className='flex gap-[3rem] flex-col'>

                <div className="flex justify-center items-center flex-col w-full">
                    <p className="flex justify-end w-full"><IoCloseOutline className="text-5xl cursor-pointer mb-9" onClick={() => setIsSideBarOpen(false)} /></p>

                    <span>Hello, <span className="font-bold">{user.ownerName}</span></span>
                </div>

                {
                    sidebarSections.map((sections) => (
                        <div key={sections.title} className="">
                            <p className="font-semibold text-xl text-gray-400 uppercase tracking-wider">{sections.title}</p>
                            <ul className="space-y-3">
                                {
                                    sections.links.map(({ label, href, icon }) => (
                                        <li key={href}>
                                            <Link onClick={() => setIsSideBarOpen(false)} href={href} className={`p-3 flex items-center rounded-xl gap-4 transition duration-200 hover:text-white ${pathname === href ? 'bg-purple-600 text-white' : 'hover:bg-[#2c2c2ca4]'}`}>
                                                <span>{icon}</span>
                                                <span className="text-[1.6rem]">{label}</span>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </aside>
        </>
    )
}







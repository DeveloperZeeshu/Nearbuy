'use client'

import { useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignIn = ({ handleToggle }) => {
    const { setUser } = useContext(AppContext)

    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('../api/login', formData)
            if (res.status === 201) {
                toast.success('Logged In successfully!')
                const userRes = await axios.get('/api/shopDetails', { withCredentials: true })
                setUser(userRes.data)
                router.push('../shop/dashboard')

                handleToggle(false)
            }
        } catch (err) {
            console.log(err)
            toast.error(`Login failed! ${err.message}`)
        }

        setFormData({
            email: '',
            password: ''
        })
    }

    return (
        <>
            <div className="z-20 text-[1.7rem] fixed flex flex-col items-center justify-center bg-[white] top-[3rem] rounded-3xl p-[2rem] lg:p-[3rem] shadow-xl">

                <p className="flex justify-end w-full"><IoCloseOutline className="text-5xl cursor-pointer mb-[3rem]" onClick={() => handleToggle(false)} /></p>

                <div className="pb-[5rem] flex flex-col justify-center items-center">
                    <h2 className="text-5xl lg:text-6xl pb-5 text-center">Welcome Back</h2>
                    <p className="text-[1.6rem]">Please Sign in to your account</p>
                </div>

                <form className="min-w-[30rem] w-full lg:w-[40rem] flex flex-col" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="text-[1.5rem] lg:text-3xl" htmlFor="email">Email</label><br />
                        <input onChange={handleOnChange}
                            value={formData.email}
                            type="email"
                            id="email"
                            placeholder="Enter your email e.g., xyz@gmail.com"
                            name="email"
                            className="bg-[white] rounded-[.8rem] p-[1rem] w-full mb-9 mt-3 border-2 border-[#00000078]"
                            required autoComplete="off" /><br />

                        <label htmlFor="password" className="text-[1.5rem] lg:text-3xl">Password</label><br />
                        <input
                            onChange={handleOnChange}
                            value={formData.password}
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            name="password"
                            className="bg-[white] rounded-[.8rem] p-[1rem] w-full mt-3 border-2 border-[#00000078]"
                            required autoComplete="off" /><br />
                        <p className="cursor-pointer text-blue-600 text-right text-2xl">Forgot Password?</p>
                    </div>

                    <input
                        type="submit"
                        className="mt-[3rem] text-white px-[1.5rem] py-4.5 cursor-pointer mb-[2rem] rounded-[.8rem] bg-purple-600 hover:bg-purple-500" />
                </form>

                <p>Don't have an account? <Link onClick={() => handleToggle(false)} href='/registration' className=" text-blue-600 cursor-pointer">Register now</Link></p>
            </div>
        </>
    )
}


'use client'

import { AppContext } from "@/app/context/AppContext"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

const EditProfile = () => {
    const { user, loading } = useContext(AppContext)

    const [formData, setFormData] = useState({
        shopName: '',
        ownerName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        id: '',
        imageUrl: ''
    })

    useEffect(() => {
        if (user)
            setFormData({
                shopName: user.shopName || '',
                ownerName: user.ownerName || '',
                email: user.email || '',
                password: '',
                phone: user.phone || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                zipcode: user.zipCode || '',
                id: user.id || '',
                imageUrl: user.imageUrl || ''
            })
    }, [user])

    if (loading)
        return <div>Loading...</div>

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const confirmRes = confirm('Are you sure you want to update your profile?')
        if (!confirmRes) return

        try {
            const res = await axios.post('/api/updateProfile', formData)
            if (res.status === 200) {
                toast.success('Profile updated successfully')
                setFormData(prev => ({
                    ...prev,
                    password: ''
                }))
            }
        } catch (err) {
            console.log(err)
            toast.error(`Error updating profile ${err.message}`)
        }
    }

    return (
        <>
            <div className="text-[1.7rem] shadow-xl flex flex-col items-center justify-center bg-[white] mt-[3rem] rounded-3xl p-[2rem] lg:p-[3rem]">

                <div className="pb-[5rem] flex justify-between w-full items-center">
                    <h2 className="text-4xl lg:text-5xl pb-5 text-center">Edit profile</h2>
                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/65d096e3-647b-4285-9f7e-99639b28c344.png" alt="Shop logo" className="w-40 h-40 rounded-full object-cover" loading="lazy"/>
                </div>

                <form action='' className="w-full flex flex-col" onSubmit={handleSubmit}>
                    <div className="w-full">

                        <div className="w-full gap-0 lg:w-[70rem] lg:gap-5 flex flex-col lg:flex-row justify-center items-center">
                            <div className="w-full">
                                <label
                                    className="text-[1.5rem] lg:text-3xl" htmlFor="shopName">
                                    Shop Name
                                </label><br />
                                <input
                                    onChange={handleChange}
                                    value={formData.shopName}
                                    className="bg-[white] border-2 border-[#00000078] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 " type="text"
                                    id="shopName"
                                    placeholder="Enter your shop name"
                                    name="shopName"
                                    required autoComplete="off" />
                            </div>

                            <div className="w-full">
                                <label
                                    className="text-[1.5rem] lg:text-3xl" htmlFor="ownerName">
                                    Owner Name
                                </label><br />
                                <input
                                    onChange={handleChange}
                                    value={formData.ownerName}
                                    className="bg-[white] border-2 border-[#00000078] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 " type="text"
                                    id="ownerName"
                                    placeholder="Enter the owner name"
                                    name="ownerName"
                                    required autoComplete="off" />
                            </div>
                        </div>

                        <div className="w-full gap-0 lg:gap-5 flex flex-col lg:flex-row justify-center items-center">
                            <div className="w-full">
                                <label
                                    className="text-[1.5rem] lg:text-3xl" htmlFor="email">
                                    Email
                                </label><br />
                                <input
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder="Enter your email e.g., xyz@gmail.com"
                                    className="bg-[white] border-2 border-[#00000078] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 " type="email"
                                    id="email"
                                    name="email"
                                    required autoComplete="off" /><br />
                            </div>
                            <div className="w-full">
                                <label
                                    className="text-[1.5rem] lg:text-3xl" htmlFor="phone">
                                    Phone
                                </label><br />
                                <input
                                    onChange={handleChange}
                                    value={formData.phone}
                                    placeholder="Enter your Phone. xxxxx"
                                    className="bg-[white] border-2 border-[#00000078] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 " type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    minLength={10}
                                    maxLength={10}
                                    id="phone"
                                    name="phone"
                                    required autoComplete="off" /><br />
                            </div>
                        </div>

                        <div className="w-full gap-0 lg:gap-5 flex flex-col lg:flex-row justify-center">
                            <div className="w-full">
                                <label
                                    className="text-[1.5rem] lg:text-3xl" htmlFor="address">
                                    Address
                                </label><br />
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    value={formData.address}
                                    placeholder="Shop no., street"
                                    className="bg-[white] border-2 border-[#00000078] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3"
                                    id="address"
                                    name="address"
                                    required autoComplete="off" /><br />
                            </div>

                            <div className="w-full flex space-x-5 justify-between mb-9">
                                <div>
                                    <label
                                        className="text-[1.5rem] lg:text-3xl" htmlFor="city">
                                        City
                                    </label><br />
                                    <select
                                        onChange={handleChange}
                                        value={formData.city}
                                        className="bg-[white] border-2 border-[#00000078] rounded-[.8rem] p-[.8rem] w-full mt-3 "
                                        id="city"
                                        name="city"
                                        required autoComplete="off" >
                                        <option value='' disabled>Select city</option><option value="jaipur">Jaipur</option></select>
                                    <br />
                                </div>
                                <div>
                                    <label
                                        className="text-[1.5rem] lg:text-3xl" htmlFor="state">
                                        State
                                    </label><br />
                                    <select
                                        onChange={handleChange}
                                        value={formData.state}
                                        placeholder="e.g., Rajasthan"
                                        className="bg-[white] border-2 border-[#00000078] rounded-[.8rem] p-[.8rem] w-full mt-3 "
                                        id="state"
                                        name="state"
                                        required autoComplete="off" >
                                        <option value='' disabled>Select state</option>
                                        <option value='rajasthan'>Rajasthan</option>
                                    </select>
                                    <br />
                                </div>
                                <div>
                                    <label
                                        className="text-[1.5rem] lg:text-3xl" htmlFor="zipcode">
                                        Zip code
                                    </label><br />
                                    <input
                                        onChange={handleChange}
                                        value={formData.zipcode}
                                        type='text'
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        placeholder="e.g., xxxxxx"
                                        className="bg-[white] border-2 border-[#00000078] rounded-[.8rem] lg:w-[9rem] p-[1rem] w-[100%] mt-3 "
                                        id="zipcode"
                                        name="zipcode"
                                        minLength={6}
                                        maxLength={6}
                                        required autoComplete="off" />
                                    <br />
                                </div>

                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-0 lg:gap-5 lg:flex-row justify-center">

                            <div className="w-full">
                                <label
                                    htmlFor="password"
                                    className="text-[1.5rem] lg:text-3xl">
                                    Enter Password
                                </label><br />
                                <input
                                    onChange={handleChange}
                                    value={formData.password}
                                    className="bg-[white] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 border-2 border-[#00000078] " type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    required autoComplete="off" /><br />
                            </div>

                        </div>

                    </div>
                    <div>
                        <input
                            type="submit"
                            className="mt-[2.5rem] lg:mt-[1rem] px-[3rem] py-4.5 cursor-pointer text-white rounded-[.8rem] bg-purple-600 hover:bg-purple-500 mb-[2rem]" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProfile

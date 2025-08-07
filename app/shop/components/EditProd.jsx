import { AppContext } from "@/app/context/AppContext"
import axios from "axios"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { IoCloseOutline } from "react-icons/io5"

export const EditProd = () => {
    const { setIsEditProductOpen, prodInfo } = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: prodInfo.name,
        category: prodInfo.category,
        description: prodInfo.description,
        price: parseInt(prodInfo.price),
        image: prodInfo.image,
        shopId: prodInfo.shopId,
        id: prodInfo.id
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const confirmRes = confirm('Are you sure you want to update the product?')
        if(!confirmRes) return

        try {
            const res = await axios.post('/api/updateProd',formData)
            if(res.status === 200){
                toast.success('Item updated successfully')
                setIsEditProductOpen(false)
            }
        } catch (err) {
            console.log(err)
            toast.error(`Error Updating Item ${err.message}`)
        }
    }

    const handleDeleteItem = async () => {
        const confirmRes = confirm(`Are you sure you want to delete ${prodInfo.name} permanently?`)
        if (!confirmRes) return

        try {
            const res = await axios.post('/api/deleteProd', { id: prodInfo.id })
            if (res.status === 200) {
                toast.success('Item deleted Successfully')
                setIsEditProductOpen(false)
            }
        } catch (err) {
            console.log(err)
            toast.error(`Error Deleting Item ${err.message}`)
        }
    }
    return (
        <>
            <div className="z-20 text-[1.7rem] w-auto fixed flex flex-col items-center justify-center bg-[white] top-[10rem] rounded-3xl p-[2rem] shadow-xl">
                <p className="flex justify-end w-full"><IoCloseOutline onClick={() => setIsEditProductOpen(false)} className="text-5xl cursor-pointer mb-[3rem]" /></p>
                <form className="min-w-[20rem] w-auto lg:w-[47rem] flex flex-col" onSubmit={handleSubmit}>
                    <div className="flex w-full gap-6">
                        <div className="w-full">
                            <label className="text-[1.5rem] lg:text-3xl" htmlFor="name">Product name</label><br />
                            <input
                                onChange={handleChange}
                                value={formData.name}
                                type="text"
                                id="name"
                                placeholder="Enter full name of product"
                                name="name"
                                className="bg-[white] rounded-[.8rem] p-[1rem] w-full mb-9 mt-3 border-2 border-[#00000078]"
                                required autoComplete="off" /><br />
                        </div>
                        <div>
                            <label className="text-[1.5rem] lg:text-3xl" htmlFor="category">Category</label><br />
                            <select id="catogory" onChange={handleChange} value={formData.category} name="category" className="border-2 border-[#808080b4] py-[.8rem] rounded-2xl px-[.7rem] mt-3" required>
                                <option value='all categories'>All Categories</option>
                                <option value='groceries'>Groceries</option>
                                <option value='electronics'>Electronics</option>
                                <option value='clothing'>Clothing</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="text-[1.5rem] lg:text-3xl">Description</label><br />
                        <input

                            type="text"
                            id="description"
                            onChange={handleChange}
                            value={formData.description}
                            placeholder="Enter Product Description"
                            name="description"
                            className="bg-[white] rounded-[.8rem] mb-9 p-[1rem] w-full mt-3 border-2 border-[#00000078]"
                            autoComplete="off" /><br />
                    </div>

                    <div className="flex gap-6">
                        <div>
                            <label htmlFor="price" className="text-[1.5rem] lg:text-3xl">Price</label><br />
                            <input
                                type="text"
                                onChange={handleChange}
                                value={formData.price}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                id="price"
                                placeholder="Enter price"
                                name="price"
                                className="bg-[white] rounded-[.8rem] p-[1rem] w-full mt-3 border-2 border-[#00000078]"
                                required autoComplete="off" /><br />
                        </div>

                        <div>
                            <label htmlFor="image" className="text-[1.5rem] lg:text-3xl">Product Image</label><br />
                            <input
                                type="file"
                                onChange={handleChange}
                                value={formData.image}
                                id="image"
                                placeholder="Enter quantity"
                                name="image"
                                className="bg-[white] rounded-[.8rem] px-[.7rem] p-[1rem] w-full mt-3 border-2 border-purple-600"
                                autoComplete="off" /><br />
                        </div>
                    </div>
                    <div className="flex space-x-6">
                        <button onClick={handleDeleteItem} className="mt-[3rem] text-white px-[1.5rem] py-4.5 cursor-pointer mb-[2rem] rounded-[.8rem] bg-red-600 hover:bg-red-500">Delete Item</button>
                        <input
                            type="submit"
                            value='Update Item'
                            className="mt-[3rem] text-white px-[1.5rem] py-4.5 cursor-pointer mb-[2rem] rounded-[.8rem] bg-purple-600 hover:bg-purple-500" /></div>
                </form>
            </div>
        </>
    )
}


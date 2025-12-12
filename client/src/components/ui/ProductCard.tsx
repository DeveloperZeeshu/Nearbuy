import { fromLeftVariants } from '../../animations/fromLeftVariants'
import Button from './button/Button'
import { motion } from 'motion/react'

interface ProdInfo {
    id: string
    name: string
    price: number
    img: string
    description: string
    shopName?: string
    ownerName?: string
    distance?: number
    address?: string
    phone?: number
    lat?: number
    lng?: number
}

interface ProdInfoProps {
    prodInfo: ProdInfo
}

export const ProductCard = ({ prodInfo }: ProdInfoProps) => {
    const { name, price, img, description, shopName, distance = 5000, address, phone, lat, lng } = prodInfo

    return (
        <>
            <motion.div
                variants={fromLeftVariants}
                initial='hidden'
                animate='show'
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full lg:w-auto h-auto max-w-xs">
                <img src={img || `https://placehold.co/400x300?text=${name}`} alt={name} className="w-full h-50 object-cover rounded-lg mb-3" loading="lazy" />

                <h3 className="font-semibold text-lg text-left">{name}</h3>

                <p className="text-gray-600 text-sm mb-4 text-left">{description || 'Organic pure honey'}</p>

                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg text-indigo-800">₹{price}</span>
                    <span className=" bg-green-100 text-green-800 py-[.2rem] px-2 rounded text-sm border border-green-300">In Stock</span>
                </div>

                <div className="mt-5 border-t border-gray-100 text-left">
                    <p className="font-medium mb-2">{shopName}</p>
                    <p className="mb-3">{address}</p>
                    <p className="">📞+91 {phone}</p>
                    <p className=" text-gray-500 mt-6 text-sm">{Math.floor(distance / 1000)} km away</p>
                </div>
                <div className="flex mt-5 pt-6 border-t justify-between border-gray-100 items-center space-x-6">
                    <Button
                        text='💬Message'
                    />
                    <a href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" className="text-white px-4 py-2.5 cursor-pointer rounded-lg bg-[#007BFF] hover:bg-[#007bffd8]">📍Direction</a>
                </div>
            </motion.div>
        </>
    )
}


import { fromLeftVariants } from "../../animations/fromLeftVariants"
import type { ShopInfo } from "../../types/shop.types"
import { motion } from "motion/react"

interface ShopProps {
    shop?: ShopInfo | null
}

export const AdminProfile = ({ shop }: ShopProps) => {
    if (!shop)
        return <p>No Shop Found</p>

    const { address, city, shopName, state, phone } = shop

    return (
        <>
            <motion.div
                variants={fromLeftVariants}
                initial='hidden'
                animate='show'
                className="bg-gray-50 w-auto flex flex-col gap-5 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-5 lg:space-x-7 mb-4">
                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/65d096e3-647b-4285-9f7e-99639b28c344.png" alt="Shop logo" className="w-20 h-20 lg:w-23 lg:h-23 rounded-full object-cover" loading="lazy" />
                    <div>
                        <h2 className="text-xl font-bold">{shopName || 'Kanak medical'}</h2>
                        <p className="text-gray-500">Local Store</p>
                    </div>
                </div>
                <div className="space-y-4 max-w-152">
                    <p className="flex gap-4">
                        <span className="text-gray-500">Address:</span>
                        <span className="material-icons">{`${address}, ${city}, ${state}`}</span>
                    </p>
                    <p className="flex gap-4 items-center">
                        <span className="text-gray-500">Mobile:</span>
                        <span className="material-icons">{`+91 ${phone}`}</span>
                    </p>
                </div>
            </motion.div>
        </>
    )
}


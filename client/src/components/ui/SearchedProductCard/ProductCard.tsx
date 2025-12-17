import { MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import type { SearchedShopInfo } from '../../../pages/SearchPage/SearchPage'
import { fromLeftVariants } from '../../../animations/fromLeftVariants'
import Button from '../button/Button'

interface ProdInfoProps {
    prodInfo: SearchedShopInfo
}

export const ProductCard = ({ prodInfo }: ProdInfoProps) => {
    const {
        shopName,
        address,
        phone,
        distanceKm,
        location
    } = prodInfo

    const lat = location?.coordinates[1]
    const lng = location?.coordinates[0]

    const {
        name,
        imageUrl: img,
        description,
        price,
        category
    } = prodInfo.product

    return (
        <>
            <motion.div
                variants={fromLeftVariants}
                initial="hidden"
                animate="show"
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-xs"
            >
                {/* Product Image */}
                <div className="relative aspect-4/3 overflow-hidden rounded-lg mb-4">
                    <img
                        src={img || `https://placehold.co/400x300?text=${name}`}
                        alt={name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />

                    <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded border-green-300 border">
                        In Stock
                    </span>
                </div>

                {/* Product Info */}
                <span className="inline-block mb-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {category}
                </span>

                <h3 className="font-semibold text-lg leading-tight mb-1">{name}</h3>

                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {description || 'Organic pure honey'}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-blue-600">₹{price}</span>
                    <span className="text-sm text-gray-500">{distanceKm} km from you</span>
                </div>

                {/* Shop Info */}
                <div className="border-t border-gray-200 pt-3 text-sm">
                    <p className="font-medium text-gray-800">{shopName}</p>
                    <p className="truncate text-gray-500">{address}</p>
                    <p className="mt-1 flex items-center gap-1 text-gray-600">
                        <Phone size={16} />
                        <span>+91 {phone}</span>
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                    <a
                        href={`https://www.google.com/maps?q=${lat},${lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-2 rounded-md font-medium transition active:scale-95 flex justify-center items-center gap-2 w-full"
                    >
                        <MapPin size={18} />
                        <span>Directions</span>
                    </a>

                    <Button
                        text="Message"
                        className="hover:bg-gray-200 text-gray-800 w-full"
                    />
                </div>
            </motion.div>
        </>
    )
}



const SearchedProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm w-full max-w-xs animate-pulse">
            {/* Image Skeleton */}
            <div className="relative aspect-4/3 bg-gray-200 rounded-lg mb-4 h-50">
                <span className="absolute top-2 right-2 bg-gray-300 h-5 w-16 rounded"></span>
            </div>

            {/* Category */}
            <div className="h-5 w-20 bg-gray-200 rounded mb-2"></div>

            {/* Product Name */}
            <div className="h-5 bg-gray-300 rounded mb-2"></div>

            {/* Description */}
            <div className="space-y-1 mb-3">
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>

            {/* Price + Distance */}
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-20 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Shop Info */}
            <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
                <div className="h-10 bg-gray-300 rounded-md w-full"></div>
                <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
        </div>
    )
}

export default SearchedProductCardSkeleton

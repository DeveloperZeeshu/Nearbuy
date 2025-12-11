
const ProductsSkeleton = () => {
    return (
        <div className="bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 p-3 lg:p-5 rounded-xl shadow-md min-h-screen animate-pulse">

            {/* HEADER SKELETON */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="h-8 w-56 bg-slate-300 rounded mb-3"></div>
                    <div className="h-4 w-72 bg-slate-300 rounded"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <div className="h-10 w-full md:w-32 bg-slate-300 rounded-md"></div>
                    <div className="h-10 w-full md:w-64 bg-slate-300 rounded-md"></div>
                </div>
            </div>

            {/* PRODUCT LIST SKELETON */}
            <div className="flex flex-col gap-2">
                {Array(6).fill(null).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg shadow-sm p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                        {/* PRODUCT INFO */}
                        <div className="flex items-center gap-3 flex-1">
                            <div className="h-16 w-16 bg-gray-200 rounded"></div>
                            <div className="space-y-2 w-full lg:w-auto">
                                <div className="h-4 max-w-40 lg:w-40 bg-gray-200 rounded"></div>
                                <div className="h-3 w-full lg:w-56 bg-gray-200 rounded"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>

                        {/* STATUS TAGS */}
                        <div className="flex gap-2 mt-2 sm:mt-0">
                            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                            <div className="h-6 w-18 bg-gray-200 rounded-full"></div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-2 mt-2 sm:mt-0">
                            <div className="h-7 w-16 bg-gray-200 rounded-md"></div>
                            <div className="h-7 w-20 bg-gray-200 rounded-md"></div>
                            <div className="h-7 w-24 bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ProductsSkeleton



const HeaderSkeleton = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
            <div className="max-w-8xl mx-auto h-16 px-4 flex items-center justify-between animate-pulse">

                {/* Menu + Logo */}
                <div className="flex items-center gap-3">
                    <div className="h-6 w-6 bg-gray-200 rounded-lg lg:hidden" />
                    <div className="h-7 w-24 bg-gray-200 rounded-full" />

                    {/* Desktop Nav Skeleton */}
                    <div className="hidden lg:flex gap-6 ml-10">
                        <div className="h-5 w-16 bg-gray-200 rounded-full" />
                        <div className="h-5 w-16 bg-gray-200 rounded-full" />
                        <div className="h-5 w-16 bg-gray-200 rounded-full" />
                    </div>
                </div>

                {/* SEARCH BAR */}
                <div className="hidden md:flex flex-1 max-w-md mx-6">
                    <div className="h-10 w-full bg-gray-200 rounded-md" />
                </div>

                {/* RIGHT: ACTIONS */}
                <div className="flex items-center gap-4">

                    {/* Notification */}
                    <div className="h-6 w-6 flex lg:hidden bg-gray-200 rounded-full" />

                    {/* Avatar */}
                    <div className="h-9 w-9 flex lg:hidden bg-gray-200 rounded-full" />

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex gap-3 items-center ml-2 h-9">
                        <div className="h-full w-18 bg-gray-200 rounded-md" />
                        <div className="h-full w-19 bg-gray-200 rounded-md" />
                    </div>
                </div>

            </div>

            {/* MOBILE SEARCH SKELETON */}
            <div className="md:hidden px-4 pb-3">
                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
            </div>
        </div>

    )
}

export default HeaderSkeleton

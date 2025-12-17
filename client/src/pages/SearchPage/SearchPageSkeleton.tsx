import SearchedProductCardSkeleton from "../../components/ui/SearchedProductCard/SearchedProductCardSkeleton";

const SearchPageSkeleton = () => {
    return (
        <div className="bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 min-h-screen rounded-xl shadow-md p-3 lg:p-5 animate-pulse">

            {/* Header Skeleton */}
            <div className="text-center mb-6">
                <div className="h-8 w-64 bg-slate-300 rounded mx-auto mb-2"></div>
                <div className="h-4 w-70 lg:w-80 bg-slate-300/70 rounded mx-auto"></div>
            </div>

            {/* Product Grid Skeleton */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center mt-4">
                {Array(3).fill(null).map((_, i) => (
                    <li key={i}>
                        <SearchedProductCardSkeleton />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPageSkeleton

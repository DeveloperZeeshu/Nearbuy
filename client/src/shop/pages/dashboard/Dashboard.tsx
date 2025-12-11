import Container from "../../../components/container/Container";
import { useEffect, useState } from "react";
import DashboardSkeleton from "./DashboardSkeleton";
import { Search } from "lucide-react";
import { useAppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { ShopInfo } from "../../../types/shop.types";

const ShopDashboard = () => {
    const [search, setSearch] = useState<string>("");

    const { openProductForm, loading, fetchAllProducts, productLoading } = useAppContext()

    const shop = useSelector((state: RootState) => state.auth.shop)
    const products = useSelector((state: RootState) => state.products.products)

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (!products || products.length === 0)
            fetchAllProducts()
    }, [fetchAllProducts])

    if (loading || productLoading)
        return (
            <Container>
                <DashboardSkeleton />
            </Container>
        )

    return (
        <Container>
            <div className="bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 p-3 lg:p-5 rounded-xl shadow-md min-h-screen">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Shop Dashboard
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Control your store in real time
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 shadow-md" />
                    </div>
                </div>

                {/* STAT CARDS */}
                <StatCard
                    totalProducts={products.length}
                    totalInStock={products.reduce((acc, p) => acc += p.isAvailable ? 1 : 0, 0)}
                    totalOutofStock={products.reduce((acc, p) => acc += !p.isAvailable ? 1 : 0, 0)}
                />

                {/* QUICK ACTIONS */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <button
                        onClick={openProductForm}
                        className="px-5 py-2.5 rounded-lg bg-linear-to-r from-black to-gray-800 text-white text-sm font-medium active:scale-95 transition">
                        + Add Product
                    </button>

                    <Link
                        to='/shop/products'
                        className="px-5 py-2.5 rounded-lg bg-white/80 backdrop-blur shadow active:scale-95 transition">
                        View All Products
                    </Link>

                    <Link
                        to='/shop/edit-profile'
                        className="px-5 py-2.5 rounded-lg bg-white/80 backdrop-blur shadow active:scale-95 transition">
                        Edit Shop Profile
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-5">

                    {/* SHOP INFO */}
                    <ShopInfoCard
                        shop={shop}
                    />

                    {/* PRODUCTS */}
                    <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-lg p-6 shadow-sm">

                        {/* TOP BAR */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <h3 className="text-lg font-semibold">Products</h3>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                                    <Search size={19} />
                                </span>
                            </div>
                        </div>

                        {/* PRODUCT LIST */}
                        <div className="space-y-4">
                            {filtered.length === 0 && <p className="text-center text-gray-500">No Product found.</p>}
                            {filtered.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all"
                                >
                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            ₹{item.price} • Stock: {item.isAvailable ? 12 : 0}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${item.isAvailable
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {item.isAvailable ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM PANELS */}
                <div className="grid md:grid-cols-2 gap-3 lg:gap-5 mt-3 lg:mt-5">

                    <div className="bg-white/70 backdrop-blur-xl rounded-lg p-6 shadow-sm transition">
                        <h3 className="font-semibold mb-3 text-lg">Recent Orders</h3>
                        <p className="text-sm text-slate-500">
                            No recent orders yet.
                        </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-lg p-6 shadow-sm transition">
                        <h3 className="font-semibold mb-4 text-lg">Quick Actions</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-black text-white py-3 rounded-lg active:scale-95 transition">
                                Update Hours
                            </button>

                            <button className="bg-white py-3 rounded-lg active:scale-95 transition shadow-sm">
                                Go to Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ShopDashboard;


//StatCard Component
interface StatCardPropType {
    totalProducts: number
    totalInStock: number
    totalOutofStock: number
}

export const StatCard = ({
    totalProducts,
    totalInStock,
    totalOutofStock
}: StatCardPropType) => {
    const stats = [
        { label: "Products", value: totalProducts },
        { label: "In Stock", value: totalInStock },
        { label: "Out of Stock", value: totalOutofStock },
        { label: "Orders", value: 18 },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-10">
            {stats.map((item, i) => (
                <div
                    key={i}
                    className="bg-white/70 backdrop-blur-xl rounded-lg p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                    <p className="text-sm text-slate-500 mb-1">{item.label}</p>
                    <p className="text-3xl font-bold text-slate-800">
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    )
}

//ShopInfo Component
export const ShopInfoCard = ({ shop }: { shop: ShopInfo | null }) => {
    return (
        <div className="bg-white/70 backdrop-blur-xl rounded-lg p-6 shadow-sm transition">
            <h3 className="font-semibold text-slate-800 mb-4 text-lg">
                Shop Info
            </h3>

            <div className="space-y-3 text-sm text-slate-600">
                <p>Owner: <span className="font-semibold">{shop?.ownerName}</span></p>
                <p>Shop: <span className="font-semibold">{shop?.shopName}</span></p>
                <p>Phone: <span className="font-semibold">+91 {shop?.phone}</span></p>
                <p>Address: <span className="font-semibold">{shop?.address}</span></p>
                <p>Status: <span className="text-green-600 font-semibold">Active</span></p>
            </div>
        </div>
    )
}


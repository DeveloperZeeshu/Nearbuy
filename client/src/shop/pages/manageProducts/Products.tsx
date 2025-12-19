import { useEffect, useState, type ChangeEvent } from "react";
import Container from "../../../components/container/Container";
import { Search } from "lucide-react";
import Button from "../../../components/ui/button/Button";
import ProductsSkeleton from "./ProductsSkeleton";
import { useAppContext } from "../../../context/AppContext";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import ProductListCard from "./ProductListCard";

const ManageProducts = () => {
    const [search, setSearch] = useState<string>('')

    const { openProductForm, productsLoading, fetchAllProducts } = useAppContext()

    const products = useSelector((state: RootState) => state.products.products)

    useEffect(() => {
        if (!products || products.length === 0)
            fetchAllProducts()
    }, [fetchAllProducts])

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    )

    if (productsLoading)
        return (
            <Container>
                <ProductsSkeleton />
            </Container>
        )

    return (
        <Container>
            <div className="min-h-screen">
                {/* HEADER */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Manage Products</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            View, edit, restock, or deactivate your products.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-3 w-full md:w-auto lg:w-auto">
                        <Button
                            type="button"
                            text="Add Product"
                            className="h-10 w-full md:w-auto"
                            onClick={openProductForm}
                        />
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
                                <Search size={19} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* RESPONSIVE PRODUCT LIST */}
                <div className="flex flex-col gap-2">
                    {filtered.length === 0 && (
                        <p className="text-gray-500 text-center">No products found.</p>
                    )}

                    {filtered.map((product) => (
                        <ProductListCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ManageProducts;



import { useContext, useEffect } from "react"
import { ProductTab } from "../components/ProductTab.js"
import Input from '../../components/ui/Input.js'
import Button from '../../components/ui/Button.js'
import Container from '../../components/container/Container.js'
import { AppContext } from '../../context/AppContext.js'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/productsSlice.ts'
import type { AppDispatch, RootState } from "../../store/store.js"

const ManageProducts = () => {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-center items-center text-center px-3">
                        <h2 className="text-2xl font-bold">Manage your Inventory 🧩</h2>
                        <p className="text-gray-500 mb-6">View, update, and manage all your shop's products in one place.</p>
                    </div>

                    <form className="flex flex-col p-4 border border-gray-300 rounded-lg lg:flex-row justify-center items-center gap-4 w-full">
                        <Input
                            type="search"
                            placeholder="Search for products…"
                        />

                        <Button
                            type="submit"
                            text='Search'
                        />
                    </form>

                    {/* {product && product.map((p) => (
                    <ProductTab key={p.id} p={p} />
                ))} */}

                    <div className="w-full">
                        <Products />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ManageProducts



export const Products = () => {
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { openProductForm } = context
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    const { items: products, loading, error } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (accessToken) dispatch(fetchProducts(accessToken));
    }, [accessToken, dispatch]);

    if (loading) return (
        <Container>
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </Container>
    )
    if (error) return <p>Error: {error}</p>;

    if(!products || products.length < 1)
        return <div className="text-center">No Product Found.</div>

    return (
        <>
            <div className="bg-white w-full border flex gap-9 flex-col border-gray-300 rounded-lg p-4">
                <div className="flex justify-between gap-5 items-center">
                    <h2 className="text-xl font-bold">Manage Stock</h2>
                    <Button
                        onClick={openProductForm}
                        text='Add Product'
                    />
                </div>

                <div className="w-full">
                    <div className="space-y-4">
                        {
                            products.map(product => {
                                return <ProductTab key={product._id} product={product} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}





import { useEffect } from "react"
import { ProductTab } from "../components/ProductTab.js"
import Input from '../../components/ui/Input.js'
import Button from '../../components/ui/Button.js'
import Container from '../../components/container/Container.js'
import { useAppContext } from '../../context/AppContext.js'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/productsSlice.ts'
import type { AppDispatch, RootState } from "../../store/store.js"
import Loader from "../../components/ui/Loader.tsx"
import { motion } from "motion/react"
import { fromLeftVariants } from "../../animations/fromLeftVariants.ts"
import { fromRightVariants } from "../../animations/fromRightVariants.ts"
import { containerVariants } from "../../animations/containerVariants.ts"

const ManageProducts = () => {

    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <motion.div
                        variants={fromLeftVariants}
                        initial='hidden'
                        animate='show'
                        className="bg-white rounded-xl shadow-lg">
                        <div className="flex flex-col justify-center items-center text-center px-3">
                            <h2 className="text-2xl font-bold pt-3">Manage your Inventory 🧩</h2>
                            <p className="text-gray-500 mb-6">View, update, and manage all your shop's products in one place.</p>
                        </div>

                        <form className="flex flex-col p-4 bg-white rounded-xl lg:flex-row justify-center items-center gap-4 w-full">
                            <Input
                                type="search"
                                placeholder="Search for products…"
                            />

                            <Button
                                type="submit"
                                text='Search'
                            />
                        </form>
                    </motion.div>

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

    const { openProductForm } = useAppContext()

    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    const { items: products, loading, error } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (accessToken) dispatch(fetchProducts(accessToken));
    }, [accessToken, dispatch]);

    if (loading)
        return (
            <Loader />
        )
    if (error) return <p>Error: {error}</p>;

    if (!products || products.length < 1)
        return <div className="text-center">No Product Found.</div>

    return (
        <>
            <motion.div
                variants={fromRightVariants}
                initial='hidden'
                animate='show'
                className="bg-white w-full flex gap-9 flex-col shadow-lg rounded-xl p-4">
                <div className="flex justify-between gap-5 items-center">
                    <h2 className="text-xl font-bold">Manage Stock</h2>
                    <Button
                        onClick={openProductForm}
                        text='Add Product'
                    />
                </div>

                <div className="w-full">
                    <motion.div
                        variants={containerVariants}
                        initial='hidden'
                        animate='show'
                        className="space-y-4 w-full">
                        {
                            products.map(product => {
                                return <ProductTab key={product._id} product={product} />
                            })
                        }
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}



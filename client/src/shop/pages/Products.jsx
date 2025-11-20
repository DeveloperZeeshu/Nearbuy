

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ProductTab } from "../components/ProductTab"
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Container from '../../components/container/Container'
import { AppContext } from '../../context/AppContext'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/productsSlice.js'

const ManageProducts = () => {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-center items-center text-center">
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
    const { openProductForm } = useContext(AppContext)
    const accessToken = useSelector(state => state.auth.accessToken)
    const { items: products, loading, error } = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        if (accessToken) dispatch(fetchProducts(accessToken));
    }, [accessToken, dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="bg-white w-full border flex gap-9 flex-col border-gray-300 rounded-lg p-4">
                <div className="flex justify-between gap-5 items-center">
                    <h2 className="text-xl font-bold">Inventory Management</h2>
                    <Button
                        onClick={openProductForm}
                        text='Add Product'
                    />
                </div>

                <div className="w-full">
                    <div className="space-y-4">
                        {
                            products.map(p => {
                                return <ProductTab key={p._id} p={p} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}



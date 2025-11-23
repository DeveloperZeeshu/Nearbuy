import Product, { IProduct } from "../models/product.model.js"

export const getProductById = async (
    _id: string
): Promise<IProduct | null> => {
    try {
        return await Product.findOne({ _id })
    } catch (err) {
        // console.log('Error finding product:', err)
        throw err
    }
}

export const deleteProductById = async (
    _id: string
): Promise<IProduct | null> => {
    try {
        return await Product.findOneAndDelete({ _id })
    } catch (err) {
        // console.error('Error deleting product:', err)
        throw err
    }
}


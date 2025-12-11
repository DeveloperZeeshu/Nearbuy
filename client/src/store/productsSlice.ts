import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product.types";

interface ProductsState {
  products: Product[]
}

interface EditProductPayloadAction {
  _id: string
  product: Product
}

const initialState: ProductsState = {
  products: []
}

const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    setAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    editProduct: (state, action: PayloadAction<EditProductPayloadAction>) => {
      state.products = state.products.map(p => p._id === action.payload._id ? action.payload.product : p)
    },
    editProductStatus: (state, action: PayloadAction<string>) => {
      state.products = state.products.map(p => {
        if (p._id === action.payload)
          p.isAvailable = !p.isAvailable
        return p
      })
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p._id !== action.payload)
    }
  }
})

export const { setAllProducts, addProduct, editProduct, editProductStatus, deleteProduct } = productsSlice.actions
export default productsSlice.reducer

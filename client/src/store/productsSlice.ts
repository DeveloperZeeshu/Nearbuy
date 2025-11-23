
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product } from '../types/product.types';

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}

export const fetchProducts = createAsyncThunk<Product[], string | null>(
  'products/fetchProducts',
  async (accessToken, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/products`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data.products as Product[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load products');
    }
  }
);

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProductStatus: (
      state,
      action: PayloadAction<{ _id: string; isAvailable: boolean }>
    ) => {
      const { _id, isAvailable } = action.payload;
      const product = state.items.find((p) => p._id === _id);
      if (product) product.isAvailable = isAvailable;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addProduct, updateProductStatus } = productsSlice.actions;
export default productsSlice.reducer;



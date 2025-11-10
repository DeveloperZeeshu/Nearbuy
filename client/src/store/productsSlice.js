
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (accessToken, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/products`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load products');
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProductStatus: (state, action) => {
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
        state.error = action.payload;
      });
  },
});

export const { addProduct, updateProductStatus } = productsSlice.actions;
export default productsSlice.reducer;

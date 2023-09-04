import {createSlice} from '@reduxjs/toolkit';
import {ProductsState} from "../../interfaces/interfaces";
import {fetchProducts} from "../actions/productActions";

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  searchQuery: ''
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products.';
      });
  },
});

export default productsSlice.reducer;
// productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, NewProduct } from "../../interfaces/interfaces";

const initialState: ProductState = {
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<NewProduct | null>) => {
      state.selectedProduct = action.payload;
    },
    updateProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    deleteProduct: (state) => {
      state.selectedProduct = null; // Reset selectedProduct after deletion
    },
  },
});

export const { selectProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;

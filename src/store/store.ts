import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/allProductSlice';
import productReducer from './slices/singleProductSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
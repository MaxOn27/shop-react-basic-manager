import {Action, createAsyncThunk, ThunkAction} from '@reduxjs/toolkit';
import {NewProduct, Product} from "../../interfaces/interfaces";
import {RootState} from "../store";
import {selectProduct, updateProduct, deleteProduct} from "../slices/singleProductSlice";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }
  const data = await response.json();
  return data.products;
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct: NewProduct) => {
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error('Failed to add the product.');
  }

  console.log("Added product", await response.json());
  return await response.json();
});

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const updateProductAsync = (productId: number, updatedProductData: NewProduct): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProductData),
    });

    if (response.ok) {
      const updatedProduct: NewProduct = await response.json();

      console.log("Updated product", updatedProduct)
      dispatch(updateProduct(updatedProduct));
    } else {
      console.error('Failed to update product.');
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export const fetchProduct = (productId: number): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data: NewProduct = await response.json();
    dispatch(selectProduct(data));
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

export const deleteProductAsync = (productId: number | undefined): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteProduct());
      console.log("Product removed")
    } else {
      console.error('Failed to delete product.');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
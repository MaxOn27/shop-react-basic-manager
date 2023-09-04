import React, {Fragment, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import { fetchProduct } from '../../store/actions/productActions';
import { RootState } from '../../store/store';
import './product.css';
import ProductForm from "../../components/productForm/productForm";

function Product() {
  const formName = useRef("Update a product");
  const { id } = useParams<{ id: string }>();
  const selectedProduct = useSelector((state: RootState) => state.product.selectedProduct);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(Number(id)));
  }, [dispatch, id]);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div  className="product-container">
      <div className="product">
        <div className="product-title">{selectedProduct.title}</div>
        <div className="product-description">{selectedProduct.description}</div>
        <div className="product-price">Price: ${selectedProduct.price}</div>
        <div className="product-rating">Rating: {selectedProduct.rating}/5</div>
        <div className="product-stock">In Stock: {selectedProduct.stock}</div>
        <div className="product-category">Category: {selectedProduct.category}</div>
      </div>
      <div className="product-form-container">
        <h2>{formName.current}</h2>
        <ProductForm updateProduct={formName} id={id}/>
      </div>
    </div>
  );
}
export default Product;

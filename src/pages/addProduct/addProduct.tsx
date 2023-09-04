import React, {useRef} from 'react';
import "./addProduct.css";
import ProductForm from "../../components/productForm/productForm";

const AddProduct = () => {
  const formName = useRef("Add a product");

  return (
    <div className="product-form-container">
      <h2>{formName.current}</h2>
      <ProductForm addProduct={formName}/>
    </div>
  );
};

export default AddProduct;

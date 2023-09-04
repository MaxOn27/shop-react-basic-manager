import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {Link} from "react-router-dom";

import {fetchProducts, deleteProductAsync} from '../../store/actions/productActions';
import "./home.css"
import {RootState} from "../../store/store";

const Home = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const {products, status, error} = useSelector((state: RootState) => state.products);
  const selectedProduct = useSelector((state: RootState) => state.product.selectedProduct);
  const selectedProducts = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleDelete = () => {
    if (selectedProduct) {
      dispatch(deleteProductAsync(selectedProduct.id));
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul className="product-list">
        {selectedProducts.products.map((product: any) => (
          <li key={product.id} className="product-item">
            <div>
              <p><strong>{product.title}</strong></p>
            </div>
            <div className="product-buttons">
              <button className="product-details">
                <Link to={`/product/${product.id}`} className="update-product">Update</Link>
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
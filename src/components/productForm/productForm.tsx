import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {AnyAction} from "redux";
import {addProduct, updateProductAsync} from '../../store/actions/productActions';
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../store/store";
import "./productForm.css";

const ProductForm = (props: any) => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive').moreThan(0),
    rating: Yup.number().required('Rating is required').min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
    category: Yup.string().required('Category is required'),
    stock: Yup.number().required('Stock is required').integer('Stock must be an integer').min(0, 'Stock must be at least 0').moreThan(0),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      rating: 0,
      category: '',
      stock: 0,
    },
    validationSchema,
    onSubmit: (values, {resetForm}) => {
      if(props.addProduct) dispatch(addProduct(values));
      if(props.updateProduct) dispatch(updateProductAsync(props.id, values));

      resetForm({
        values: {
          title: '',
          description: '',
          price: 0,
          rating: 0,
          category: '',
          stock: 0,
        }
      })
    },
  });


  return (
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="error">{formik.errors.price}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
          />
          {formik.touched.rating && formik.errors.rating ? (
            <div className="error">{formik.errors.rating}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
          />
          {formik.touched.stock && formik.errors.stock ? (
            <div className="error">{formik.errors.stock}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="error">{formik.errors.category}</div>
          ) : null}
        </div>
        <button type="submit" className="add-product-button">Submit</button>
      </form>
  );
};

export default ProductForm;

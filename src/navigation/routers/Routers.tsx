import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "../../pages/home/home";
import AddProduct from "../../pages/addProduct/addProduct";
import Product from "../../pages/product/product";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addProduct" element={<AddProduct/>}/>
      <Route path="/product/:id" element={<Product/>}/>
    </Routes>
  );
};

export default Routers;
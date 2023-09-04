import React from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {useFormik} from "formik";

import "./navigation.css";
import Routers from "./routers/Routers";

const Navigation: React.FC = () => {

  return (
    <Router>
      <nav className="navigation">
        <ul className="nav-list">
          <li>
            <NavLink to="/" className="nav-link">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/addProduct" className="nav-link">ADD PRODUCT</NavLink>
          </li>
        </ul>
      </nav>
      <Routers/>
    </Router>
  );
};

export default Navigation;

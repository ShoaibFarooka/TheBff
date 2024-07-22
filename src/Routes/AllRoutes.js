import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home/Home";
import LoginSignup from "../components/pages/Auth/LoginSignup";
import Product from "../components/pages/Product/Product";
import Business from "../components/pages/Business/Business";
import Franchise from "../components/pages/Franchise/Franchise";
import Checkout from "../components/pages/Checkout/Checkout";
import Account from "../components/pages/Account/Account";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loginSignup" element={<LoginSignup />} />
      <Route path="/product" element={<Product />} />
      <Route path="/Business" element={<Business />} />
      <Route path="/Franchise" element={<Franchise />} />
      <Route path="/Checkout" element={<Checkout />} />
      <Route path="/Account" element={<Account />} />
    </Routes>
  );
};

export default AllRoutes;

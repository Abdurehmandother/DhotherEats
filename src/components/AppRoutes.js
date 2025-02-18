import React from "react";
import { Route, Routes } from "react-router-dom";
import Food from "../Pages/FoodPage/Food";
import Home from "../Pages/Home/Home";
import Default from "../Pages/Default/Default";
import CartPage from "../Pages/Cart/CartPage";
import LoginPage from "../Pages/Login/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/food/:id" element={<Food />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<Default />} />
    </Routes>
  );
}

import React from "react";
import { Route, Routes } from "react-router-dom";
import Food from "../Pages/FoodPage/Food";
import Home from "../Pages/Home";
import Default from "../Pages/Default";
import CartPage from "../Pages/Cart/CartPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/food/:id" element={<Food />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Default />} />
    </Routes>
  );
}

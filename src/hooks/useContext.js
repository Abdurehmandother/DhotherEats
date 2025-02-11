import React, { createContext, useContext, useState } from "react";
import { sample_foods } from "../Data";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState(
    sample_foods
      .slice(1, 4)
      .map((food) => ({ food, quantity: 1, price: food.price }))
  );
  const [totalPrice, setTotalPrice] = useState(40);
  const [totalCount, setTotalCount] = useState(3);
  const RemoveFromCart = (foodID) => {
    const filteredCart = cartItem.filter((item) => item.food.id !== foodID);
    setCartItem(filteredCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItem, totalPrice, totalCount },
        RemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

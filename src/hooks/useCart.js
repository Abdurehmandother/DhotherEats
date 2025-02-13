import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const CART_KEY = "Cart";
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() => {
    const totalPrice = sum(cartItems.map((item) => item.price));
    const totalCount = sum(cartItems.map((item) => item.quantity));

    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({ items: cartItems, totalPrice, totalCount })
    );
  }, [cartItems]);

  const sum = (item) => item.reduce((prev, cur) => prev + cur, 0);

  const RemoveFromCart = (foodID) => {
    const filteredCart = cartItems.filter((item) => item.food.id !== foodID);
    setCartItems(filteredCart);
  };

  const changeQuantity = (cartItem, newQauntity) => {
    const { food } = cartItem;

    const changedCartItem = {
      ...cartItem,
      quantity: newQauntity,
      price: food.price * newQauntity,
    };

    setCartItems(
      cartItems.map((item) =>
        item.food.id === food.id ? changedCartItem : item
      )
    );
  };

  const addToCart = (food) => {
    const CartItem = cartItems.find((item) => item.food.id === food.id);

    if (CartItem) {
      changeQuantity(CartItem, CartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        RemoveFromCart,
        changeQuantity,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

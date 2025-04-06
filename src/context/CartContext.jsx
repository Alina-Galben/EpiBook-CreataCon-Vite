import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.asin === book.asin);
      if (exists) {
        return prev.map((item) =>
          item.asin === book.asin ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (asin) => {
    setCart((prev) => prev.filter((item) => item.asin !== asin));
  };

  const updateQuantity = (asin, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.asin === asin ? { ...item, quantity: Math.max(item.quantity + amount, 1) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
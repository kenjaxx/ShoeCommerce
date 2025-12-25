import { createContext, useState, useContext, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils';
import { STORAGE_KEYS } from '../constants';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    loadCart();
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (cartItems.length > 0) {
      setStorageItem(STORAGE_KEYS.CART_DATA, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const loadCart = () => {
    const savedCart = getStorageItem(STORAGE_KEYS.CART_DATA);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  };

  const addToCart = (product, quantity = 1, size = null) => {
    setCartItems(prevItems => {
      // Check if product with same size already exists
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            id: Date.now(), // Temporary ID
            product,
            quantity,
            size,
            addedAt: new Date().toISOString()
          }
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setStorageItem(STORAGE_KEYS.CART_DATA, JSON.stringify([]));
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId, size = null) => {
    return cartItems.some(
      item => item.product.id === productId && (size === null || item.size === size)
    );
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
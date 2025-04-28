import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

// Create cart context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Load cart items from localStorage on mount for guest users
  // or from API for authenticated users
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        if (isAuthenticated) {
          // Fetch cart from API for authenticated users
          const response = await cartAPI.getCart();
          setCartItems(response.data);
        } else {
          // Load cart from localStorage for guest users
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        }
      } catch (err) {
        console.error('Error loading cart:', err);
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated]);

  // Save cart to localStorage whenever it changes for guest users
  useEffect(() => {
    if (!isAuthenticated && cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      setError(null);
      
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item exists
        return await updateQuantity(product.id, existingItem.quantity + quantity);
      }
      
      if (isAuthenticated) {
        // Add to cart via API for authenticated users
        const response = await cartAPI.addToCart(product.id, quantity);
        setCartItems(response.data);
      } else {
        // Add to cart locally for guest users
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
        };
        
        setCartItems(prevItems => [...prevItems, newItem]);
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart');
      throw err;
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, newQuantity) => {
    try {
      setError(null);
      
      if (newQuantity < 1) {
        return await removeFromCart(itemId);
      }
      
      if (isAuthenticated) {
        // Update via API for authenticated users
        const response = await cartAPI.updateCartItem(itemId, newQuantity);
        setCartItems(response.data);
      } else {
        // Update locally for guest users
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (err) {
      console.error('Error updating cart:', err);
      setError('Failed to update item quantity');
      throw err;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      setError(null);
      
      if (isAuthenticated) {
        // Remove via API for authenticated users
        const response = await cartAPI.removeFromCart(itemId);
        setCartItems(response.data);
      } else {
        // Remove locally for guest users
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove item from cart');
      throw err;
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setError(null);
      
      if (isAuthenticated) {
        // Clear via API for authenticated users
        await cartAPI.clearCart();
      }
      
      // Clear locally for all users
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Failed to clear cart');
      throw err;
    }
  };

  // Calculate cart totals
  const getCartTotals = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + shipping;
    
    return {
      subtotal,
      shipping,
      total,
      itemCount,
    };
  };

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 
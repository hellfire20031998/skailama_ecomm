import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${(page - 1) * 20}`);
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 20));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          cartItemCount={getTotalItems()}
          onCartClick={() => setIsCartOpen(true)}
        />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          updateCartItemQuantity={updateCartItemQuantity}
          onRemoveItem={removeFromCart}
          totalPrice={getTotalPrice()}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                products={products}
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={fetchProducts}
                onAddToCart={addToCart}
                updateCartItemQuantity={updateCartItemQuantity}
                cartItems={cartItems}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetails onAddToCart={addToCart} />}
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                updateCartItemQuantity={updateCartItemQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

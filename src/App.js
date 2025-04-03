import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * productsPerPage;
      const response = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${productsPerPage}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch products');
      }

      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / productsPerPage));
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

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
      // Create a new cart item with only the necessary data
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: quantity
      };
      return [...prevItems, cartItem];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Count unique products in cart
  const cartCount = cartItems.length;

  return (
    <div className="app">
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
      />
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <ProductList 
          products={products} 
          onAddToCart={addToCart}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default App;

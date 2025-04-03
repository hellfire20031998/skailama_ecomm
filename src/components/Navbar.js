import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ cartCount, toggleCart }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Fashion Store</h1>
      </div>
      <div className="navbar-cart" onClick={toggleCart}>
        <FaShoppingCart className="cart-icon" />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>
    </nav>
  );
};

export default Navbar; 
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartItemCount, onCartClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Skailama E-Commerce
        </Link>
        <div className="navbar-actions">
          {cartItemCount > 0 && (
            <Link to="/checkout" className="checkout-button">
              Checkout
            </Link>
          )}
          <button className="cart-button" onClick={onCartClick}>
            <span className="cart-icon">🛒</span>
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
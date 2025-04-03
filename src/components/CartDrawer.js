import React from 'react';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, cartItems, updateQuantity }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-drawer-overlay">
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <h2>Shopping Cart</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-drawer-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer; 
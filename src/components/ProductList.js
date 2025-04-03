import React, { useState } from 'react';
import './ProductList.css';

const ProductList = ({ products, onAddToCart, currentPage, totalPages, onPageChange }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > 0) {
      onAddToCart(product, quantity);
      setQuantities(prev => ({ ...prev, [product.id]: 0 }));
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {startPage > 1 && (
          <>
            <button
              className="pagination-button"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}
        {pages}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button
              className="pagination-button"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="product-list-container">
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.thumbnail} alt={product.title} />
              <div className="product-actions">
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                  <span>{quantities[product.id] || 0}</span>
                  <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                </div>
                <button 
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product)}
                  disabled={!quantities[product.id]}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <span className="product-rating">★ {product.rating}</span>
                <span className="product-stock">Stock: {product.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default ProductList; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch product details');
      }

      setProduct(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-details">
      <div className="product-details-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.title} />
          </div>
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="product-meta">
            <span className="brand">{product.brand}</span>
            <span className="category">{product.category}</span>
            <span className="rating">★ {product.rating}</span>
          </div>
          <div className="product-price">
            <span className="price">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="discount">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
          <p className="description">{product.description}</p>
          <div className="product-specs">
            <h3>Product Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Stock</span>
                <span className="spec-value">{product.stock}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Weight</span>
                <span className="spec-value">{product.weight}g</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Dimensions</span>
                <span className="spec-value">
                  {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth}mm
                </span>
              </div>
            </div>
          </div>
          <div className="add-to-cart-section">
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 
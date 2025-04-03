import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ products, loading, currentPage, totalPages, onPageChange, onAddToCart,updateCartItemQuantity,cartItems }) => {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }
  const getValues=(product)=>{
    const data=cartItems.filter(data=>data.id === product.id)
    if(data.length===0){
      return 0; 
    }
    return data[0].quantity

  }
  const getProductQuantity= (product,value)=>{   
    const data=cartItems.filter(data=>data.id === product.id)
    if(data.length===0){
      onAddToCart(product)
    }
   else{
    
    updateCartItemQuantity(product.id,data[0].quantity+value)
   }
    console.log(data)
    console.log(product)
   
  }
  console.log(cartItems)

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.thumbnail} alt={product.title} />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
                <div className="product-meta">
                  <span className="rating">★ {product.rating}</span>
                  <span className="stock">Stock: {product.stock}</span>
                </div>
              </div>
            </Link>
            <div className="product-actions">
              <button 
                className="add-to-cart-button"
                onClick={() => onAddToCart(product, 1)}
              >
                Add to Cart
              </button>
              <div className="quantity-controls">
                    <button disabled={getValues(product)===0}  onClick={() =>{
                       getProductQuantity(product,-1)
                      // updateCartItemQuantity(product.id, quty -1)
                    }}>-</button>
                    <span>{getValues(product)}</span>
                    {/* {console.log(getProductQuantity(product.id))} */}
                    
                    <button onClick={() =>{ 
                     getProductQuantity(product,1)
                      // updateCartItemQuantity(product.id,quty+ 1)
                      }}>+</button>
                  </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList; 
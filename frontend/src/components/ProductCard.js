import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <span className="product-stock">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button 
            onClick={() => onAddToCart(product.id)}
            className="btn btn-primary"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

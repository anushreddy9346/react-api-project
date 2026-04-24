import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
      </div>
      
      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title" title={product.title}>{product.title}</h3>
        
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating" title={`${product.rating.rate} out of 5 stars`}>
            ★ {product.rating.rate} <span style={{color: 'var(--secondary-text)', fontSize: '0.8rem'}}>({product.rating.count})</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

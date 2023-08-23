// ProductDetailsPage.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import products from '../data/products';
import '../styling/ProductDetails.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { cartDispatch } = useCart();

  const product = products.find((item) => item.id === parseInt(id));

  const handleAddToCart = (product) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Go to Cart</Link>
          </li>
        </ul>
      </nav>
      <div className="product-details">
        <div className="image-block">
          <img src={product.Image} alt={product.name} />
        </div>
        <div className="info-block">
          <h2 className="item-name">{product.name}</h2>
          <p className="price">${product.price}</p>
          <p className="description">{product.describtion}</p>
          <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

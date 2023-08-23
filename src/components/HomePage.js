// HomePage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import '../styling/HomePage.css';
import productsData from '../data/products.js'; // Adjust the path based on your file structure

const HomePage = () => {
  const { cartState, cartDispatch } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData); // Set the products using the imported data
  }, []);

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const itemInCart = cartState.items.find((item) => item.id === product.id);

    if (itemInCart) {
      // If the product is already in the cart, update its quantity
      cartDispatch({ type: 'UPDATE_QUANTITY', payload: { id: product.id, quantity: itemInCart.quantity + 1 } });
    } else {
      // If the product is not in the cart, add it with quantity 1
      cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">
              Go to Cart
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className="page-title">Welcome to the E-commerce Store</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            {/* Use Link to ProductDetailsPage for product name and image */}
            <Link to={`/product/${product.id}`}>
              <img src={product.Image} alt={product.name} />
              <h2>{product.name}</h2>
            </Link>
            <p className="product-price">Price: ${product.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

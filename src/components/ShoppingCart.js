import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import '../styling/ShoppingCart.css';

const ShoppingCart = () => {
  const { cartState, cartDispatch } = useCart();

  const handleIncrement = (productId) => {
    cartDispatch({ type: 'INCREMENT_ITEM', payload: productId });
  };

  const handleDecrement = (productId) => {
    const item = cartState.items.find((item) => item.id === productId);
    if (item) {
      if (item.quantity === 1) {
        cartDispatch({ type: 'REMOVE_ITEM_IF_ZERO', payload: productId });
      } else {
        cartDispatch({ type: 'DECREMENT_ITEM', payload: productId });
      }
    }
  };

  const handleRemoveItem = (productId) => {
    cartDispatch({ type: 'REMOVE_ITEM', payload: productId });
  };
  
  const getTotalPrice = () => {
    return cartState.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="shopping-cart">
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
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-items">
        {cartState.items.map((item) => (
          <div key={item.id} className="cart-item">
            <Link to={`/product/${item.id}`}>
              <img src={item.Image} alt={item.name} />
            </Link>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <p>Total Price: ${getTotalPrice()}</p>
      </div>
      <Link to="/checkout">
        <button className="checkout-btn">Checkout</button>
      </Link>
    </div>
  );
};

export default ShoppingCart;

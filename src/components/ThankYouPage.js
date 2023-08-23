// ThankYouPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/ThankYouPage.css';

const ThankYouPage = () => {
  return (
    <div>
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
      <h1>Thank You for Your Purchase!</h1>
      <div className="links">
        <Link to="/" className="return-link">
          Return to Shopping
        </Link>
        <Link to="/order-details" className="order-details-link">
          Order Details
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;

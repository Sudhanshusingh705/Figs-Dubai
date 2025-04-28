import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Welcome to Import-Export</h1>
        <p>Your trusted partner in global trade</p>
        <Link to="/products" className="shop-now-btn">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Banner; 
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">404</div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">Return to Homepage</Link>
          <Link to="/contact" className="btn btn-outline">Contact Support</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 
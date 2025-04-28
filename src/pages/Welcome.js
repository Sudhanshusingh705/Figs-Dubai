import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <h1>Welcome to ImportExport!</h1>
          <p className="welcome-subtitle">Your account has been created successfully</p>
        </div>

        <div className="welcome-card">
          <div className="welcome-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          
          <h2>Thank you for joining us</h2>
          <p>
            You've taken the first step towards simplifying your import-export operations.
            We're excited to help you streamline your global trade business.
          </p>

          <div className="next-steps">
            <h3>Next Steps</h3>
            <ul className="steps-list">
              <li>
                <span className="step-number">1</span>
                <div className="step-content">
                  <h4>Complete Your Profile</h4>
                  <p>Add your business information and preferences to customize your experience.</p>
                </div>
              </li>
              <li>
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>Explore Our Services</h4>
                  <p>Discover the wide range of import-export services we offer.</p>
                </div>
              </li>
              <li>
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>Create Your First Order</h4>
                  <p>Start your import-export journey by creating your first order.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="welcome-actions">
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            <Link to="/profile" className="btn btn-outline">Complete Profile</Link>
          </div>
        </div>

        <div className="welcome-help">
          <h3>Need Help?</h3>
          <p>Our support team is available to assist you with any questions.</p>
          <Link to="/contact" className="help-link">Contact Support</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 
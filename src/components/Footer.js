import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Logo and Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/images/logo-white.svg" alt="FIGS Dubai" onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150x50?text=FIGS+Dubai";
                e.target.style.filter = "brightness(0) invert(1)";
              }} />
            </div>
            <p className="footer-description">
              FIGS Dubai is a leading import-export company specializing in premium dry fruits, spices, and teas. 
              We connect global markets with quality products and exceptional service since 2010.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-section">
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-links">
              <li>
                <Link to="/services/bulk-ordering">Bulk Ordering</Link>
              </li>
              <li>
                <Link to="/services/custom-packaging">Custom Packaging</Link>
              </li>
              <li>
                <Link to="/services/wholesale">Wholesale Distribution</Link>
              </li>
              <li>
                <Link to="/services/international-shipping">International Shipping</Link>
              </li>
              <li>
                <Link to="/services/quality-testing">Quality Testing</Link>
              </li>
              <li>
                <Link to="/services/trade-consulting">Trade Consulting</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Business Bay, Dubai, UAE</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+971 4 XXX XXXX</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>info@figsdubai.com</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Monday-Friday: 9:00 AM - 6:00 PM</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Saturday: 10:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} FIGS Dubai. All Rights Reserved.
          </div>
          <div className="legal-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/shipping">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
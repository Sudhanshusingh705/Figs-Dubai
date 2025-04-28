import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import '../styles/Header.css';

const Header = ({ user }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user is logged in from the user prop or localStorage as fallback
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    } else {
      const role = localStorage.getItem('userRole');
      if (role) {
        setIsLoggedIn(true);
        setUserRole(role);
      } else {
        setIsLoggedIn(false);
        setUserRole('');
      }
    }
  }, [user, location]);

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('');
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Logo */}
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src="/images/logo.svg" alt={t('siteName')} className="logo-img" onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150x50?text=FIGS+Dubai";
            }} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label={t('toggleMenu')}
        >
          <span className="menu-icon"></span>
        </button>

        {/* Center: Navigation Menu */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list main-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                {t('home')}
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                {t('about')}
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                {t('products')}
              </Link>
            </li>
            
          {/*   <li className="nav-item">
              <Link to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                {t('shop')}
              </Link>
            </li> */}
            
            <li className="nav-item">
              <Link to="/services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                {t('services')}
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                {t('contact')}
              </Link>
            </li>
            
            {isLoggedIn && (
              <li className="nav-item mobile-only">
                <Link 
                  to="/orders" 
                  className="nav-link" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('orders')}
                </Link>
              </li>
            )}
            
            {isLoggedIn && userRole === 'admin' && (
              <li className="nav-item mobile-only">
                <Link 
                  to="/admin/dashboard" 
                  className="nav-link" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('admin')}
                </Link>
              </li>
            )}
            
            {isLoggedIn && (
              <li className="nav-item mobile-only">
                <Link 
                  to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                  className="nav-link" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('dashboard')}
                </Link>
              </li>
            )}
          </ul>
        </nav>
        
        {/* Right: Auth Buttons */}
        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <div className="user-menu desktop-only">
                <Link 
                  to="/orders" 
                  className="nav-link" 
                >
                  {t('orders')}
                </Link>
                
                {userRole === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    className="nav-link" 
                  >
                    {t('admin')}
                  </Link>
                )}
                
                <Link 
                  to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                  className="nav-link" 
                >
                  {t('dashboard')}
                </Link>
              </div>
              
              <button 
                onClick={handleLogout} 
                className="nav-link logout-btn"
              >
                {t('logout')}
              </button>
              <div className="language-toggle-container">
                <LanguageToggle />
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="nav-link login-btn" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('login')}
              </Link>
              <Link 
                to="/register" 
                className="nav-link register-btn" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('register')}
              </Link>
              <div className="language-toggle-container">
                <LanguageToggle />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 
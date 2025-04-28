import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth0 } from '../contexts/Auth0Context';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaUserShield } from 'react-icons/fa';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithRedirect, isAuthenticated, user: auth0User, isLoading } = useAuth0();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Check for success message passed from registration or redirect from Auth0
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      // Clear the location state after displaying the message
      window.history.replaceState({}, document.title);
    }
    
    // If authenticated with Auth0, redirect to profile
    if (isAuthenticated && auth0User && !isLoading) {
      if (setUser) {
        setUser(auth0User);
      }
      const destination = location.state?.from || '/profile';
      navigate(destination, { replace: true });
    }
  }, [location, isAuthenticated, auth0User, isLoading, navigate, setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      // Store token and user role in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('userRole', response.user.role);
      
      // Set user in app state
      if (setUser) {
        setUser(response.user);
      }
      
      // Redirect to profile page
      navigate('/profile');
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAuth0Login = async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: location.state?.from || '/profile' }
      });
    } catch (err) {
      console.error('Auth0 login error:', err);
      setError('Auth0 login failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-side">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your account to continue</p>
            </div>
            
            {error && (
              <div className="error-alert">
                {error}
              </div>
            )}
            
            {success && (
              <div className="success-alert">
                {success}
              </div>
            )}
            
            {/* Auth0 Login Button */}
            <div className="auth0-login-section">
              <button 
                onClick={handleAuth0Login}
                className="auth0-btn"
                disabled={loading || isLoading}
              >
                <FaUserShield /> Sign In with Auth0
              </button>
              
              <div className="auth-divider">
                <span>or continue with email</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <div className="input-icon">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                </div>
                <div className="input-group">
                  <div className="input-icon">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              
              <button 
                type="submit" 
                className="auth-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <FaSignInAlt /> Sign In with Email
                  </>
                )}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>
                Don't have an account? <Link to="/register" className="auth-link">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="auth-image-side">
          <div className="auth-overlay">
            <div className="auth-image-content">
              <h2>FIGS Dubai</h2>
              <p>Your trusted partner for premium dry fruits, spices, and tea</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background-color: #f8f9fa;
        }
        
        .auth-container {
          display: flex;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          width: 100%;
          max-width: 1000px;
          height: 600px;
          background-color: #fff;
        }
        
        .auth-form-side {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        
        .auth-form-container {
          width: 100%;
          max-width: 400px;
        }
        
        .auth-header {
          margin-bottom: 30px;
        }
        
        .auth-header h1 {
          font-size: 28px;
          color: #2c3e50;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .auth-header p {
          color: #7f8c8d;
          font-size: 16px;
        }
        
        .error-alert {
          padding: 15px;
          background-color: #fee2e2;
          color: #b91c1c;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
        
        .success-alert {
          padding: 15px;
          background-color: #d1fae5;
          color: #047857;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
        
        .auth-form {
          margin-bottom: 30px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #4a5568;
          font-size: 14px;
        }
        
        .password-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .forgot-password-link {
          font-size: 13px;
          color: #3498db;
          text-decoration: none;
        }
        
        .forgot-password-link:hover {
          text-decoration: underline;
        }
        
        .input-group {
          position: relative;
          display: flex;
        }
        
        .input-icon {
          position: absolute;
          left: 14px;
          top: 13px;
          color: #a0aec0;
          font-size: 16px;
        }
        
        .auth-form input[type="email"],
        .auth-form input[type="password"] {
          width: 100%;
          padding: 12px 12px 12px 42px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .auth-form input:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        
        .auth-form input::placeholder {
          color: #a0aec0;
        }
        
        .password-toggle {
          position: absolute;
          right: 10px;
          top: 10px;
          background: none;
          border: none;
          color: #a0aec0;
          cursor: pointer;
          font-size: 16px;
        }
        
        .form-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 25px;
        }
        
        .form-checkbox input {
          width: 16px;
          height: 16px;
          accent-color: #3498db;
        }
        
        .form-checkbox label {
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
        }
        
        .auth-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          background-color: #3498db;
          color: white;
          border: none;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .auth-btn:hover {
          background-color: #2980b9;
        }
        
        .auth-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .auth-footer {
          text-align: center;
          font-size: 14px;
          color: #4a5568;
        }
        
        .auth-link {
          color: #3498db;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .auth-link:hover {
          color: #2980b9;
          text-decoration: underline;
        }
        
        .auth-image-side {
          flex: 1;
          background-image: url('/images/dubai-spices.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .auth-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(44, 62, 80, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        
        .auth-image-content {
          color: white;
          text-align: center;
        }
        
        .auth-image-content h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        .auth-image-content p {
          font-size: 18px;
          max-width: 400px;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .auth-container {
            flex-direction: column;
            height: auto;
          }
          
          .auth-image-side {
            display: none;
          }
          
          .auth-form-side {
            padding: 30px 20px;
          }
        }
        
        /* New styles for Auth0 integration */
        .auth0-login-section {
          margin-bottom: 25px;
        }
        
        .auth0-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          background-color: #635BFF;
          color: white;
          border: none;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .auth0-btn:hover {
          background-color: #524AD1;
        }
        
        .auth0-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 0;
          color: #7f8c8d;
          margin-bottom: 20px;
        }
        
        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .auth-divider span {
          padding: 0 10px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Login;
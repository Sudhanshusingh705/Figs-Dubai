import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '../contexts/Auth0Context';
import { FaLock, FaUserPlus } from 'react-icons/fa';

const Auth0Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Redirect to the page they were trying to access or to profile
      const destination = location.state?.from || '/profile';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  // Handle login click
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: location.state?.from || '/profile' }
    });
  };

  // Handle signup click
  const handleSignUp = async () => {
    await loginWithRedirect({
      screen_hint: 'signup',
      appState: { returnTo: location.state?.from || '/profile' }
    });
  };

  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Loading authentication...</p>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-side">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Welcome to FIGS Dubai</h1>
              <p>Log in with your Auth0 account to continue</p>
            </div>
            
            {error && (
              <div className="error-alert">
                Authentication error. Please try again later.
              </div>
            )}
            
            <div className="auth-buttons">
              <button 
                onClick={handleLogin}
                className="auth-btn"
              >
                <FaLock /> Log In with Auth0
              </button>
              
              <div className="auth-divider">
                <span>or</span>
              </div>
              
              <button 
                onClick={handleSignUp}
                className="auth-btn signup-btn"
              >
                <FaUserPlus /> Sign Up with Auth0
              </button>
            </div>
            
            <div className="auth-info">
              <p>
                We use Auth0 for secure authentication. You can use social logins or create an email/password account.
              </p>
            </div>
            
          </div>
        </div>
        
        <div className="auth-image-side">
          <div className="auth-overlay">
            <div className="auth-image-content">
              <h2>FIGS Dubai</h2>
              <p>Premium dry fruits, spices, and tea from around the world</p>
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
          text-align: center;
          margin-bottom: 40px;
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
        
        .auth-buttons {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .auth-btn {
          padding: 14px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: #3498db;
          color: white;
          border: none;
        }
        
        .auth-btn:hover {
          background-color: #2980b9;
        }
        
        .signup-btn {
          background-color: #2ecc71;
        }
        
        .signup-btn:hover {
          background-color: #27ae60;
        }
        
        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 0;
          color: #7f8c8d;
        }
        
        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .auth-divider span {
          padding: 0 10px;
        }
        
        .auth-info {
          padding: 15px;
          background-color: #f8fafc;
          border-radius: 8px;
          font-size: 14px;
          color: #64748b;
          text-align: center;
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
        
        .auth-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f8f9fa;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
      `}</style>
    </div>
  );
};

export default Auth0Login; 
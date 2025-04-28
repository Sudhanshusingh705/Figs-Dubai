import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      await authAPI.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-side">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Reset Your Password</h1>
              <p>Enter your email to receive a password reset link</p>
            </div>
            
            {error && (
              <div className="error-alert">
                {error}
              </div>
            )}
            
            {success ? (
              <div className="success-alert">
                <p>We've sent password reset instructions to your email. Please check your inbox.</p>
                <p className="mt-3">If you don't receive an email within a few minutes, check your spam folder or <button 
                  onClick={handleSubmit} 
                  className="resend-link"
                  disabled={loading}
                >
                  click here to try again
                </button>
                </p>
                <Link to="/login" className="back-link">
                  <FaArrowLeft /> Back to Sign In
                </Link>
              </div>
            ) : (
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
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="auth-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
                
                <div className="auth-footer mt-4">
                  <Link to="/login" className="auth-link back-link">
                    <FaArrowLeft /> Back to Sign In
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
        
        <div className="auth-image-side">
          <div className="auth-overlay">
            <div className="auth-image-content">
              <h2>Import Export LLC</h2>
              <p>Global trade solutions at your fingertips</p>
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
          min-height: 600px;
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
        }
        
        .success-alert {
          padding: 20px;
          background-color: #ecfdf5;
          color: #065f46;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .mt-3 {
          margin-top: 15px;
        }
        
        .mt-4 {
          margin-top: 20px;
        }
        
        .resend-link {
          background: none;
          border: none;
          color: #3498db;
          text-decoration: underline;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
          color: #3498db;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
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
        
        .auth-form input[type="email"] {
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
        
        .auth-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          background-color: #3498db;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
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
        }
        
        .auth-image-side {
          flex: 1;
          background-image: url('/images/global-trade.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .auth-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(44, 62, 80, 0.8);
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
        
        @media (max-width: 992px) {
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

export default ForgotPassword; 
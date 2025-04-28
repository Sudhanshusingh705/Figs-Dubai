import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaCheck } from 'react-icons/fa';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setValidToken(false);
        return;
      }
      
      try {
        setLoading(true);
        await authAPI.verifyResetToken(token);
        setValidToken(true);
      } catch (err) {
        console.error('Invalid or expired token:', err);
        setValidToken(false);
        setError('This password reset link is invalid or has expired.');
      } finally {
        setLoading(false);
      }
    };
    
    verifyToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (error) setError('');
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    
    // At least 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { password, confirmPassword } = formData;
    
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
      return;
    }
    
    setLoading(true);
    
    try {
      await authAPI.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (validToken === null) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-form-side">
            <div className="auth-form-container text-center">
              <div className="loading-spinner large-spinner"></div>
              <p className="mt-3">Verifying your reset link...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-side">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Reset Your Password</h1>
              <p>Create a new secure password for your account</p>
            </div>
            
            {error && (
              <div className="error-alert">
                {error}
              </div>
            )}
            
            {!validToken && !loading ? (
              <div className="error-alert">
                <p>This password reset link is invalid or has expired.</p>
                <p className="mt-3">
                  Please request a new password reset link 
                  <Link to="/forgot-password" className="ml-1 auth-link">
                    here
                  </Link>.
                </p>
                <Link to="/login" className="back-link mt-3">
                  <FaArrowLeft /> Back to Sign In
                </Link>
              </div>
            ) : success ? (
              <div className="success-alert">
                <div className="success-icon">
                  <FaCheck />
                </div>
                <p>Your password has been successfully reset!</p>
                <p className="mt-2">Redirecting to login page...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <div className="input-group">
                    <div className="input-icon">
                      <FaLock />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter new password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="password-requirements">
                    <ul>
                      <li className={formData.password.length >= 8 ? 'valid' : ''}>
                        At least 8 characters
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                        Uppercase letter
                      </li>
                      <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                        Lowercase letter
                      </li>
                      <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                        Number
                      </li>
                      <li className={/[@$!%*?&]/.test(formData.password) ? 'valid' : ''}>
                        Special character (@$!%*?&)
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-group">
                    <div className="input-icon">
                      <FaLock />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {formData.password && formData.confirmPassword && (
                    <div className={`passwords-match ${formData.password === formData.confirmPassword ? 'valid' : 'invalid'}`}>
                      {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                    </div>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="auth-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    'Reset Password'
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
        
        .text-center {
          text-align: center;
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
          text-align: center;
        }
        
        .success-icon {
          background-color: #10b981;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-size: 24px;
        }
        
        .mt-2 {
          margin-top: 10px;
        }
        
        .mt-3 {
          margin-top: 15px;
        }
        
        .mt-4 {
          margin-top: 20px;
        }
        
        .ml-1 {
          margin-left: 5px;
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
        
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: #a0aec0;
          font-size: 16px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .password-requirements {
          margin-top: 10px;
          font-size: 12px;
        }
        
        .password-requirements ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
        }
        
        .password-requirements li {
          color: #718096;
          position: relative;
          padding-left: 15px;
        }
        
        .password-requirements li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #cbd5e0;
        }
        
        .password-requirements li.valid {
          color: #38a169;
        }
        
        .password-requirements li.valid:before {
          content: "✓";
          color: #38a169;
        }
        
        .passwords-match {
          margin-top: 5px;
          font-size: 12px;
        }
        
        .passwords-match.valid {
          color: #38a169;
        }
        
        .passwords-match.invalid {
          color: #e53e3e;
        }
        
        .auth-form input[type="password"],
        .auth-form input[type="text"] {
          width: 100%;
          padding: 12px 40px 12px 42px;
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
        
        .large-spinner {
          width: 40px;
          height: 40px;
          border-width: 4px;
          border-top: 4px solid #3498db;
          border-color: rgba(52, 152, 219, 0.3);
          border-top-color: #3498db;
          margin: 0 auto;
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

export default ResetPassword; 
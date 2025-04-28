import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth0 } from '../contexts/Auth0Context';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaPhone, 
  FaBuilding,
  FaUserPlus,
  FaUserShield
} from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: {
      name: '',
      position: '',
    },
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear specific error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    // Phone validation (only if provided)
    if (formData.phone.trim()) {
      // Basic phone validation - can be customized based on requirements
      const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Combined validation function for all form fields
  const validateForm = () => {
    // Always validate step 1 fields
    const step1Valid = validateStep1();
    
    // If we're on step 2, also validate step 2 fields
    if (step === 2) {
      const step2Valid = validateStep2();
      return step1Valid && step2Valid;
    }
    
    return step1Valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ submit: "" });

    // Validate form based on current step
    if (step === 1) {
      if (!validateStep1()) {
        setLoading(false);
        return;
      }
      nextStep();
      setLoading(false);
      return;
    }

    // For step 2, validate both steps before submission
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Use the register method from authAPI instead of using it as a URL
      const data = await authAPI.register(formData);

      // Registration successful
      setSuccessMessage('Registration successful! Please log in.');
      setTimeout(() => {
        navigate('/login', { 
          state: { successMessage: 'Registration successful! Please log in with your credentials.' } 
        });
      }, 2000);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuth0Signup = async () => {
    try {
      await loginWithRedirect({
        screen_hint: 'signup',
        appState: { returnTo: '/profile' }
      });
    } catch (error) {
      setErrors({
        submit: 'Auth0 signup failed. Please try again.'
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-side">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Create Account</h1>
              <p>Join us to explore premium dry fruits, spices, and tea</p>
            </div>
            
            {errors.submit && (
              <div className="error-alert">
                {errors.submit}
              </div>
            )}

            {successMessage && (
              <div className="success-alert">
                {successMessage}
              </div>
            )}
            
            {/* Auth0 Signup Button */}
            <div className="auth0-signup-section">
              <button 
                onClick={handleAuth0Signup}
                className="auth0-btn"
                type="button"
                disabled={loading}
              >
                <FaUserShield /> Sign Up with Auth0
              </button>
              
              <div className="auth-divider">
                <span>or sign up with email</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
              {step === 1 ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <div className="input-group">
                        <div className="input-icon">
                          <FaUser />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                      {errors.firstName && <div className="error-text">{errors.firstName}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <div className="input-group">
                        <div className="input-icon">
                          <FaUser />
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                      {errors.lastName && <div className="error-text">{errors.lastName}</div>}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
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
                      />
                    </div>
                    {errors.email && <div className="error-text">{errors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
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
                      />
                      <button 
                        type="button" 
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && <div className="error-text">{errors.password}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
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
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
                  </div>
                  
                  <button 
                    type="button" 
                    className="auth-btn"
                    onClick={nextStep}
                    disabled={loading}
                  >
                    Next
                  </button>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaPhone />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company.name">Company Name (Optional)</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaBuilding />
                      </div>
                      <input
                        type="text"
                        id="company.name"
                        name="company.name"
                        placeholder="Enter your company name"
                        value={formData.company.name}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company.position">Position (Optional)</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        id="company.position"
                        name="company.position"
                        placeholder="Enter your position"
                        value={formData.company.position}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="form-checkbox">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={agreeTerms}
                      onChange={() => {
                        setAgreeTerms(!agreeTerms);
                        if (errors.terms) {
                          setErrors(prev => ({ ...prev, terms: '' }));
                        }
                      }}
                    />
                    <label htmlFor="agreeTerms">
                      I agree to the <Link to="/terms" target="_blank" className="terms-link">Terms and Conditions</Link> and <Link to="/privacy" target="_blank" className="terms-link">Privacy Policy</Link>
                    </label>
                  </div>
                  {errors.terms && <div className="error-text">{errors.terms}</div>}
                  
                  <div className="form-buttons">
                    <button 
                      type="button" 
                      className="auth-btn-secondary"
                      onClick={prevStep}
                      disabled={loading}
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      className="auth-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        <>
                          <FaUserPlus /> Register
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
            
            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="auth-image-side">
          <div className="auth-overlay">
            <div className="auth-image-content">
              <h2>FIGS Dubai</h2>
              <p>Start your journey with premium products today</p>
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
          min-height: 700px;
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
        
        .auth-form {
          margin-bottom: 30px;
        }
        
        .form-row {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .form-row .form-group {
          flex: 1;
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
        
        .auth-form input[type="email"],
        .auth-form input[type="text"],
        .auth-form input[type="password"],
        .auth-form input[type="tel"] {
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
        
        .error-text {
          color: #e53e3e;
          font-size: 12px;
          margin-top: 5px;
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
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 25px;
        }
        
        .form-checkbox input {
          width: 16px;
          height: 16px;
          accent-color: #3498db;
          margin-top: 3px;
        }
        
        .form-checkbox label {
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
        }
        
        .terms-link {
          color: #3498db;
          text-decoration: none;
        }
        
        .terms-link:hover {
          text-decoration: underline;
        }
        
        .form-buttons {
          display: flex;
          gap: 15px;
        }
        
        .auth-btn, .auth-btn-secondary {
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .auth-btn {
          flex: 2;
          background-color: #3498db;
          color: white;
          border: none;
        }
        
        .auth-btn-secondary {
          flex: 1;
          background-color: #f8f9fa;
          color: #4a5568;
          border: 1px solid #e2e8f0;
        }
        
        .auth-btn:hover {
          background-color: #2980b9;
        }
        
        .auth-btn-secondary:hover {
          background-color: #edf2f7;
        }
        
        .auth-btn:disabled, .auth-btn-secondary:disabled {
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
          
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
        
        /* Auth0 Styles */
        .auth0-signup-section {
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

export default Register; 
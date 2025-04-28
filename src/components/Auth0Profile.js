import React from 'react';
import { useAuth0 } from '../contexts/Auth0Context';
import { FaUser, FaEnvelope, FaUserShield, FaIdCard } from 'react-icons/fa';

const Auth0Profile = () => {
  const { user, isLoading, logout, accessToken } = useAuth0();

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <p>Unable to load profile. Please log in again.</p>
        <button 
          onClick={() => window.location.href = '/auth0-login'}
          className="profile-button"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Extract user data
  const { name, email, picture, sub, email_verified } = user;
  const userId = sub.split('|')[1]; // Get the user ID part after the |

  return (
    <div className="auth0-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={picture} alt={name} />
        </div>
        <h1 className="profile-name">{name}</h1>
        <p className="profile-email">{email}</p>
      </div>
      
      <div className="profile-details">
        <div className="profile-section">
          <h2>User Information</h2>
          
          <div className="profile-info-item">
            <div className="info-icon">
              <FaUser />
            </div>
            <div className="info-content">
              <span className="info-label">Name</span>
              <span className="info-value">{name}</span>
            </div>
          </div>
          
          <div className="profile-info-item">
            <div className="info-icon">
              <FaEnvelope />
            </div>
            <div className="info-content">
              <span className="info-label">Email</span>
              <span className="info-value">{email}</span>
              {email_verified && <span className="verified-badge">Verified</span>}
            </div>
          </div>
          
          <div className="profile-info-item">
            <div className="info-icon">
              <FaIdCard />
            </div>
            <div className="info-content">
              <span className="info-label">User ID</span>
              <span className="info-value">{userId}</span>
            </div>
          </div>
          
          <div className="profile-info-item">
            <div className="info-icon">
              <FaUserShield />
            </div>
            <div className="info-content">
              <span className="info-label">Authentication</span>
              <span className="info-value">Auth0</span>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h2>Account Actions</h2>
          
          <button className="profile-button secondary" onClick={() => logout()}>
            Log Out
          </button>
          
          <button 
            className="profile-button"
            onClick={() => window.open('https://manage.auth0.com/dashboard/profile', '_blank')}
          >
            Manage Auth0 Account
          </button>
        </div>
        
        {/* For debugging or development purposes */}
        {process.env.NODE_ENV === 'development' && (
          <div className="profile-section">
            <h2>Developer Information</h2>
            <div className="token-preview">
              <h3>Access Token Preview</h3>
              <p className="token-text">{accessToken ? `${accessToken.substring(0, 20)}...` : 'No token available'}</p>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .auth0-profile {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .profile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1rem;
          border: 4px solid #fff;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        
        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .profile-name {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0.5rem 0;
        }
        
        .profile-email {
          font-size: 1rem;
          color: #7f8c8d;
        }
        
        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .profile-section {
          margin-bottom: 1.5rem;
        }
        
        .profile-section h2 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f1f5f9;
        }
        
        .profile-info-item {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: #3498db;
          color: white;
          border-radius: 10px;
          margin-right: 1rem;
        }
        
        .info-content {
          flex: 1;
        }
        
        .info-label {
          display: block;
          font-size: 0.9rem;
          color: #7f8c8d;
          margin-bottom: 0.2rem;
        }
        
        .info-value {
          font-size: 1.1rem;
          color: #2c3e50;
          font-weight: 500;
        }
        
        .verified-badge {
          display: inline-block;
          background-color: #2ecc71;
          color: white;
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
          margin-left: 0.5rem;
          font-weight: 600;
        }
        
        .profile-button {
          display: block;
          width: 100%;
          padding: 0.9rem;
          border-radius: 8px;
          background-color: #3498db;
          color: white;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-bottom: 1rem;
        }
        
        .profile-button:hover {
          background-color: #2980b9;
        }
        
        .profile-button.secondary {
          background-color: #e74c3c;
        }
        
        .profile-button.secondary:hover {
          background-color: #c0392b;
        }
        
        .token-preview {
          background-color: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .token-preview h3 {
          font-size: 1rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }
        
        .token-text {
          font-family: monospace;
          font-size: 0.9rem;
          color: #334155;
          background-color: #f1f5f9;
          padding: 0.5rem;
          border-radius: 4px;
          overflow-wrap: break-word;
        }
        
        .profile-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: the 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .profile-error {
          background-color: #fee2e2;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          color: #b91c1c;
        }
        
        @media (max-width: 576px) {
          .auth0-profile {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Auth0Profile; 
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaHome, FaMapMarkerAlt, FaGlobe, FaEdit, FaSave, FaUserCircle } from 'react-icons/fa';
import { authAPI } from '../services/api';

const Profile = ({ user, setUser }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: {
      name: '',
      position: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    website: '',
    bio: ''
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await authAPI.getCurrentUser();
        const userData = response.data.data;
        
        setProfileData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          company: {
            name: userData.company?.name || '',
            position: userData.company?.position || ''
          },
          address: {
            street: userData.address?.street || '',
            city: userData.address?.city || '',
            state: userData.address?.state || '',
            zipCode: userData.address?.zipCode || '',
            country: userData.address?.country || ''
          },
          website: userData.website || '',
          bio: userData.bio || ''
        });
        
        if (setUser) {
          setUser(userData);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Format data for API
      const updateData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone || undefined,
        company: profileData.company.name ? {
          name: profileData.company.name,
          position: profileData.company.position || undefined
        } : undefined,
        address: {
          street: profileData.address.street || undefined,
          city: profileData.address.city || undefined,
          state: profileData.address.state || undefined,
          zipCode: profileData.address.zipCode || undefined,
          country: profileData.address.country || undefined
        },
        website: profileData.website || undefined,
        bio: profileData.bio || undefined
      };

      const response = await authAPI.updateProfile(updateData);
      
      if (setUser) {
        setUser(response.data.data);
      }
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>User Profile</h1>
          <button 
            className={`edit-profile-btn ${isEditing ? 'cancel' : ''}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : <><FaEdit /> Edit Profile</>}
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <FaUserCircle className="avatar-icon" />
            </div>
            <div className="profile-name">
              {profileData.firstName} {profileData.lastName}
            </div>
            <div className="profile-email">{profileData.email}</div>
            {profileData.company.name && (
              <div className="profile-company">
                <FaBuilding className="profile-icon" />
                {profileData.company.name}
                {profileData.company.position && <span> | {profileData.company.position}</span>}
              </div>
            )}
            {profileData.phone && (
              <div className="profile-phone">
                <FaPhone className="profile-icon" />
                {profileData.phone}
              </div>
            )}
            {profileData.website && (
              <div className="profile-website">
                <FaGlobe className="profile-icon" />
                <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                  {profileData.website.replace(/(^\w+:|^)\/\//, '')}
                </a>
              </div>
            )}
          </div>
          
          <div className="profile-details">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <h2>Edit Profile</h2>
                
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
                        value={profileData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
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
                        value={profileData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-row">
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
                        value={profileData.email}
                        disabled
                      />
                    </div>
                    <small className="form-text">Email address cannot be changed</small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaPhone />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <h3>Company Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company.name">Company Name</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaBuilding />
                      </div>
                      <input
                        type="text"
                        id="company.name"
                        name="company.name"
                        value={profileData.company.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company.position">Position</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        id="company.position"
                        name="company.position"
                        value={profileData.company.position}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <h3>Address</h3>
                <div className="form-group">
                  <label htmlFor="address.street">Street Address</label>
                  <div className="input-group">
                    <div className="input-icon">
                      <FaHome />
                    </div>
                    <input
                      type="text"
                      id="address.street"
                      name="address.street"
                      value={profileData.address.street}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address.city">City</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaMapMarkerAlt />
                      </div>
                      <input
                        type="text"
                        id="address.city"
                        name="address.city"
                        value={profileData.address.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address.state">State/Province</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaMapMarkerAlt />
                      </div>
                      <input
                        type="text"
                        id="address.state"
                        name="address.state"
                        value={profileData.address.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address.zipCode">Zip/Postal Code</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaMapMarkerAlt />
                      </div>
                      <input
                        type="text"
                        id="address.zipCode"
                        name="address.zipCode"
                        value={profileData.address.zipCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address.country">Country</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <FaGlobe />
                      </div>
                      <input
                        type="text"
                        id="address.country"
                        name="address.country"
                        value={profileData.address.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <div className="input-group">
                    <div className="input-icon">
                      <FaGlobe />
                    </div>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      placeholder="https://example.com"
                      value={profileData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={profileData.bio}
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself..."
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="save-btn"
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="button-spinner"></span>
                    ) : (
                      <>
                        <FaSave /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <h2>Personal Information</h2>
                
                {profileData.bio && (
                  <div className="profile-bio">
                    <h3>About</h3>
                    <p>{profileData.bio}</p>
                  </div>
                )}
                
                {(profileData.address.street || profileData.address.city || profileData.address.state || 
                 profileData.address.zipCode || profileData.address.country) && (
                  <div className="profile-address">
                    <h3>Address</h3>
                    <address>
                      {profileData.address.street && <div>{profileData.address.street}</div>}
                      {(profileData.address.city || profileData.address.state || profileData.address.zipCode) && (
                        <div>
                          {profileData.address.city}{profileData.address.city && profileData.address.state && ', '}
                          {profileData.address.state} {profileData.address.zipCode}
                        </div>
                      )}
                      {profileData.address.country && <div>{profileData.address.country}</div>}
                    </address>
                  </div>
                )}
                
                <div className="profile-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit /> Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .profile-page {
          padding: 40px 20px;
          background-color: #f8f9fa;
          min-height: calc(100vh - 160px);
        }
        
        .profile-container {
          max-width: 1000px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .profile-header {
          padding: 30px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .profile-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #2c3e50;
          margin: 0;
        }
        
        .edit-profile-btn {
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .edit-profile-btn:hover {
          background-color: #2980b9;
        }
        
        .edit-profile-btn.cancel {
          background-color: #f8f9fa;
          color: #4a5568;
          border: 1px solid #e2e8f0;
        }
        
        .edit-profile-btn.cancel:hover {
          background-color: #edf2f7;
        }
        
        .error-message, .success-message {
          padding: 15px;
          margin: 20px 30px 0;
          border-radius: 8px;
          font-size: 14px;
        }
        
        .error-message {
          background-color: #fee2e2;
          color: #b91c1c;
        }
        
        .success-message {
          background-color: #d1fae5;
          color: #047857;
        }
        
        .profile-content {
          display: flex;
          padding: 30px;
        }
        
        .profile-sidebar {
          flex: 0 0 250px;
          padding-right: 30px;
          border-right: 1px solid #eee;
        }
        
        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e2e8f0;
          margin-bottom: 20px;
          overflow: hidden;
        }
        
        .avatar-icon {
          font-size: 100px;
          color: #a0aec0;
        }
        
        .profile-name {
          font-size: 20px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .profile-email {
          font-size: 14px;
          color: #718096;
          margin-bottom: 20px;
        }
        
        .profile-company, .profile-phone, .profile-website {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #4a5568;
          margin-bottom: 10px;
        }
        
        .profile-icon {
          color: #3498db;
        }
        
        .profile-website a {
          color: #3498db;
          text-decoration: none;
        }
        
        .profile-website a:hover {
          text-decoration: underline;
        }
        
        .profile-details {
          flex: 1;
          padding-left: 30px;
        }
        
        .profile-form h2, .profile-info h2 {
          font-size: 20px;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 20px;
        }
        
        .profile-form h3 {
          font-size: 16px;
          font-weight: 700;
          color: #4a5568;
          margin: 25px 0 15px;
          padding-bottom: 8px;
          border-bottom: 1px solid #eee;
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
        
        .profile-form input, .profile-form select {
          width: 100%;
          padding: 12px 12px 12px 42px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .profile-form input:disabled {
          background-color: #f8f9fa;
          cursor: not-allowed;
        }
        
        .profile-form textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          resize: vertical;
          min-height: 100px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .profile-form input:focus, .profile-form textarea:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        
        .form-text {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          color: #718096;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 30px;
        }
        
        .cancel-btn, .save-btn, .edit-btn {
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .cancel-btn {
          background-color: #f8f9fa;
          color: #4a5568;
          border: 1px solid #e2e8f0;
        }
        
        .save-btn, .edit-btn {
          background-color: #3498db;
          color: white;
          border: none;
        }
        
        .cancel-btn:hover {
          background-color: #edf2f7;
        }
        
        .save-btn:hover, .edit-btn:hover {
          background-color: #2980b9;
        }
        
        .button-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .profile-bio, .profile-address {
          margin-bottom: 30px;
        }
        
        .profile-bio h3, .profile-address h3 {
          font-size: 16px;
          font-weight: 700;
          color: #4a5568;
          margin: 0 0 10px;
        }
        
        .profile-bio p {
          line-height: 1.6;
          color: #4a5568;
        }
        
        .profile-address address {
          font-style: normal;
          line-height: 1.6;
          color: #4a5568;
        }
        
        .profile-actions {
          margin-top: 30px;
        }
        
        .profile-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .profile-content {
            flex-direction: column;
          }
          
          .profile-sidebar {
            flex: 0 0 auto;
            padding-right: 0;
            padding-bottom: 30px;
            margin-bottom: 30px;
            border-right: none;
            border-bottom: 1px solid #eee;
          }
          
          .profile-details {
            padding-left: 0;
          }
          
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile; 
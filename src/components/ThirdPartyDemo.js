import React, { useState, useEffect } from 'react';
import { thirdPartyAPI } from '../services/api';

const ThirdPartyDemo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ query: '' });

  // Initialize the API with your key if needed
  useEffect(() => {
    // Load API key from environment variable or local storage
    const apiKey = process.env.REACT_APP_THIRD_PARTY_API_KEY || localStorage.getItem('thirdPartyApiKey');
    
    if (apiKey) {
      thirdPartyAPI.initialize(apiKey);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the third-party API using our service
      const result = await thirdPartyAPI.getData({ q: formData.query });
      setData(result);
    } catch (err) {
      setError('Failed to fetch data from API. ' + err.message);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePostData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Example of posting data to the API
      const result = await thirdPartyAPI.postData(formData);
      setData(result);
      alert('Data successfully submitted to API!');
    } catch (err) {
      setError('Failed to post data to API. ' + err.message);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="third-party-api-demo">
      <h2>Third-Party API Integration</h2>
      
      {error && (
        <div className="error-alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="api-form">
        <div className="form-group">
          <label htmlFor="query">Search Query</label>
          <input
            type="text"
            id="query"
            name="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Enter search terms..."
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handlePostData}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit Data'}
          </button>
        </div>
      </form>
      
      {data && (
        <div className="api-results">
          <h3>API Response</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      
      <div className="api-info">
        <h3>How It Works</h3>
        <p>This component demonstrates how to:</p>
        <ul>
          <li>Initialize a third-party API with authentication</li>
          <li>Make GET requests with parameters</li>
          <li>Make POST requests with form data</li>
          <li>Handle loading states and errors</li>
          <li>Display API response data</li>
        </ul>
      </div>

      <style jsx>{`
        .third-party-api-demo {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          max-width: 800px;
          margin: 2rem auto;
        }
        
        h2 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }
        
        .error-alert {
          background-color: #fee2e2;
          color: #b91c1c;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
        }
        
        .api-form {
          margin-bottom: the 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #4a5568;
        }
        
        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }
        
        .btn-primary {
          background-color: #3498db;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #2980b9;
        }
        
        .btn-secondary {
          background-color: #f8f9fa;
          color: #4a5568;
          border: 1px solid #e2e8f0;
        }
        
        .btn-secondary:hover {
          background-color: #edf2f7;
        }
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .api-results {
          margin-top: 2rem;
          padding: 1.5rem;
          background-color: #f8fafc;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }
        
        .api-results h3 {
          margin-top: 0;
          color: #4a5568;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        
        pre {
          background-color: #2d3748;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        .api-info {
          margin-top: 2rem;
          padding: 1.5rem;
          background-color: #ebf8ff;
          border-radius: 6px;
          border: 1px solid #bee3f8;
        }
        
        .api-info h3 {
          margin-top: 0;
          color: #2b6cb0;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }
        
        .api-info p {
          margin-top: 0;
          color: #4a5568;
        }
        
        .api-info ul {
          margin-top: 0.5rem;
          padding-left: 1.5rem;
        }
        
        .api-info li {
          margin-bottom: 0.5rem;
          color: #4a5568;
        }
      `}</style>
    </div>
  );
};

export default ThirdPartyDemo; 
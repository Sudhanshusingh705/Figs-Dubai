import React, { createContext, useContext, useEffect, useState } from 'react';
import auth0Service from '../services/auth0Service';

// Create Auth0 context
const Auth0Context = createContext();

// Custom hook to use the Auth0 context
export const useAuth0 = () => useContext(Auth0Context);

// Auth0 Provider component
export const Auth0Provider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  // Initialize Auth0 on component mount
  useEffect(() => {
    const initializeAuth0 = async () => {
      try {
        setIsLoading(true);
        
        // Initialize Auth0 client
        await auth0Service.init();
        
        // Check if user is authenticated
        const authStatus = await auth0Service.isAuthenticated();
        setIsAuthenticated(authStatus);
        
        if (authStatus) {
          // Get user data
          const userData = await auth0Service.getUser();
          setUser(userData);
          
          // Get access token for API calls
          const token = await auth0Service.getAccessToken();
          setAccessToken(token);
        }
      } catch (e) {
        console.error('Auth0 initialization error', e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth0();
  }, []);

  // Login function
  const loginWithRedirect = async (options) => {
    try {
      return await auth0Service.loginWithRedirect(options);
    } catch (e) {
      console.error('Login error', e);
      setError(e);
    }
  };

  // Logout function
  const logout = async (options) => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      setAccessToken(null);
      return await auth0Service.logout(options);
    } catch (e) {
      console.error('Logout error', e);
      setError(e);
    }
  };

  // Refresh token function
  const getAccessToken = async () => {
    try {
      const token = await auth0Service.getAccessToken();
      setAccessToken(token);
      return token;
    } catch (e) {
      console.error('Error getting access token', e);
      setError(e);
    }
  };

  // Context value
  const contextValue = {
    isAuthenticated,
    user,
    isLoading,
    accessToken,
    error,
    loginWithRedirect,
    logout,
    getAccessToken
  };

  return (
    <Auth0Context.Provider value={contextValue}>
      {children}
    </Auth0Context.Provider>
  );
};

export default Auth0Context; 
import { Auth0Client } from '@auth0/auth0-spa-js';

// Create Auth0 client with configuration
let auth0Client = null;

const auth0Service = {
  // Initialize the Auth0 client with your configuration
  init: async () => {
    auth0Client = new Auth0Client({
      domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
      clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
      redirectUri: window.location.origin,
      cacheLocation: 'localstorage',
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'openid profile email'
    });

    // Handle redirect callback if user is returning from Auth0
    try {
      if (window.location.search.includes('code=') && 
          window.location.search.includes('state=')) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      console.error('Error handling Auth0 callback:', error);
    }

    return auth0Client;
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    if (!auth0Client) await auth0Service.init();
    return auth0Client.isAuthenticated();
  },

  // Get the user profile
  getUser: async () => {
    if (!auth0Client) await auth0Service.init();
    return auth0Client.getUser();
  },

  // Log in the user (redirects to Auth0)
  loginWithRedirect: async (options = {}) => {
    if (!auth0Client) await auth0Service.init();
    return auth0Client.loginWithRedirect(options);
  },

  // Log out the user
  logout: async (options = {}) => {
    if (!auth0Client) await auth0Service.init();
    return auth0Client.logout({
      returnTo: window.location.origin,
      ...options
    });
  },

  // Get the access token for API calls
  getAccessToken: async () => {
    if (!auth0Client) await auth0Service.init();
    return auth0Client.getTokenSilently();
  },

  // Get ID token claims
  getIdTokenClaims: async () => {
    if (!auth0Client) await auth0Service.init();
    return auth0Client.getIdTokenClaims();
  }
};

export default auth0Service; 
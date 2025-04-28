import axios from 'axios';

// Create base axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Updated request interceptor to support both Auth0 and regular tokens
api.interceptors.request.use(
  async (config) => {
    // First check for Auth0 token if Auth0 service is available
    try {
      // Try to import Auth0 service dynamically to avoid circular dependencies
      const auth0Service = await import('./auth0Service').then(module => module.default).catch(() => null);
      
      if (auth0Service) {
        const isAuthenticated = await auth0Service.isAuthenticated();
        if (isAuthenticated) {
          const token = await auth0Service.getAccessToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          }
        }
      }
    } catch (error) {
      console.error('Error handling Auth0 token:', error);
    }
    
    // Fall back to localStorage token if no Auth0 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Login user
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  // Register new user
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  // Logout user
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return { success: true };
  },

  // Get current user info
  getCurrentUser: async () => {
    return api.get('/auth/me');
  },

  // Update user profile
  updateProfile: async (userData) => {
    return api.put('/auth/profile', userData);
  },

  // Change password
  changePassword: async (passwordData) => {
    return api.post('/auth/change-password', passwordData);
  },

  // Request password reset
  forgotPassword: async (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  // Verify reset token
  verifyResetToken: async (token) => {
    return api.get(`/auth/reset-password/${token}/verify`);
  },

  // Reset password with token
  resetPassword: async (token, password) => {
    return api.post(`/auth/reset-password/${token}`, { password });
  },
};

// Cart API endpoints
export const cartAPI = {
  // Get cart items
  getCart: async () => {
    return api.get('/cart');
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    return api.post('/cart/items', { productId, quantity });
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    return api.put(`/cart/items/${itemId}`, { quantity });
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    return api.delete(`/cart/items/${itemId}`);
  },

  // Clear cart
  clearCart: async () => {
    return api.delete('/cart');
  },

  // Apply coupon code
  applyCoupon: async (code) => {
    return api.post('/cart/coupon', { code });
  },
  
  // Remove coupon code
  removeCoupon: async () => {
    return api.delete('/cart/coupon');
  },
  
  // Get shipping methods
  getShippingMethods: async () => {
    return api.get('/cart/shipping-methods');
  },
  
  // Set shipping method
  setShippingMethod: async (methodId) => {
    return api.post('/cart/shipping-method', { methodId });
  },
};

// Orders API endpoints
export const ordersAPI = {
  // Get all orders with optional filters
  getOrders: async (filters = {}, page = 1, limit = 10) => {
    return api.get('/orders', { params: { ...filters, page, limit } });
  },

  // Get order by ID
  getOrderById: async (id) => {
    return api.get(`/orders/${id}`);
  },

  // Get order by order number
  getOrderByNumber: async (orderNumber) => {
    return api.get(`/orders/number/${orderNumber}`);
  },

  // Create new order
  createOrder: async (orderData) => {
    return api.post('/orders', orderData);
  },

  // Update existing order
  updateOrder: async (id, orderData) => {
    return api.put(`/orders/${id}`, orderData);
  },

  // Delete order
  deleteOrder: async (id) => {
    return api.delete(`/orders/${id}`);
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    return api.patch(`/orders/${id}/status`, { status });
  },

  // Update payment status
  updatePaymentStatus: async (id, paymentStatus) => {
    return api.patch(`/orders/${id}/payment-status`, { paymentStatus });
  },

  // Update shipping status
  updateShippingStatus: async (id, shippingStatus) => {
    return api.patch(`/orders/${id}/shipping-status`, { shippingStatus });
  },

  // Generate invoice for order
  generateInvoice: async (id) => {
    return api.post(`/orders/${id}/generate-invoice`);
  },

  // Send invoice by email
  sendInvoiceEmail: async (id, emailData) => {
    return api.post(`/orders/${id}/send-invoice`, emailData);
  },

  // Get order statistics
  getOrderStats: async (timeframe = 'month') => {
    return api.get('/orders/stats', { params: { timeframe } });
  },
};

// Products API endpoints
export const productsAPI = {
  // Get all products with optional filters
  getProducts: async (filters = {}, page = 1, limit = 10) => {
    return api.get('/products', { params: { ...filters, page, limit } });
  },

  // Get product by ID
  getProductById: async (id) => {
    return api.get(`/products/${id}`);
  },

  // Create new product
  createProduct: async (productData) => {
    return api.post('/products', productData);
  },

  // Update existing product
  updateProduct: async (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  // Delete product
  deleteProduct: async (id) => {
    return api.delete(`/products/${id}`);
  },

  // Update product stock
  updateStock: async (id, stockData) => {
    return api.patch(`/products/${id}/stock`, stockData);
  },

  // Get product categories
  getCategories: async () => {
    return api.get('/products/categories');
  },
};

// Users API endpoints
export const usersAPI = {
  // Get all users with optional filters
  getUsers: async (filters = {}, page = 1, limit = 10) => {
    return api.get('/users', { params: { ...filters, page, limit } });
  },

  // Get user by ID
  getUserById: async (id) => {
    return api.get(`/users/${id}`);
  },

  // Create new user
  createUser: async (userData) => {
    return api.post('/users', userData);
  },

  // Update existing user
  updateUser: async (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },

  // Delete user
  deleteUser: async (id) => {
    return api.delete(`/users/${id}`);
  },

  // Update user role
  updateUserRole: async (id, roles) => {
    return api.patch(`/users/${id}/roles`, { roles });
  },
};

// Third-party API integration
export const thirdPartyAPI = {
  // Create a separate axios instance for the third-party API
  client: axios.create({
    baseURL: process.env.REACT_APP_THIRD_PARTY_API_URL || 'https://api.example.com',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }),

  // Initialize with API key if required
  initialize: (apiKey) => {
    thirdPartyAPI.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
    // Or for API key in query params or other auth methods:
    // thirdPartyAPI.client.defaults.params = { api_key: apiKey };
  },

  // Sample endpoint method
  getData: async (params = {}) => {
    try {
      const response = await thirdPartyAPI.client.get('/endpoint', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching from third-party API:', error);
      throw error;
    }
  },

  // Sample POST endpoint method
  postData: async (data) => {
    try {
      const response = await thirdPartyAPI.client.post('/endpoint', data);
      return response.data;
    } catch (error) {
      console.error('Error posting to third-party API:', error);
      throw error;
    }
  },
};

export default api; 
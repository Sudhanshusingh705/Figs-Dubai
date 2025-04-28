import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import DryFruitsProducts from './pages/DryFruitsProducts';
import DryFruitDetail from './pages/DryFruitDetail';
import SpicesProducts from './pages/SpicesProducts';
import SpiceDetail from './pages/SpiceDetail';
import TeaProducts from './pages/TeaProducts';
import TeaDetail from './pages/TeaDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import EmailJSInstructions from './components/EmailJSInstructions';
import EmailTemplateExample from './components/EmailTemplateExample';
import EmailJSTest from './pages/EmailJSTest';
import './App.css';
import { authAPI } from './services/api';
import { LanguageProvider } from './context/LanguageContext';
import { initEmailJS } from './utils/emailjs';
import { Auth0Provider } from './contexts/Auth0Context';
import Auth0Login from './pages/Auth0Login';
import ProtectedRoute from './components/ProtectedRoute';
import { HelmetProvider } from 'react-helmet-async';

// Legacy protected route wrapper for existing routes
const LegacyProtectedRoute = ({ element, requiredRole }) => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');
  
  // Check if user is logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has required role (if specified)
  if (requiredRole && userRole !== requiredRole && requiredRole !== 'any') {
    return <Navigate to="/" replace />;
  }
  
  return element;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize EmailJS
    initEmailJS();
    
    // Check if user is logged in on app load
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.data.data);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
        }
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  return (
    <HelmetProvider>
      <Auth0Provider>
        <LanguageProvider>
          <Router>
            <div className="app">
              <Header user={user} />
              <main className="main-content">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/auth0-login" element={<Auth0Login />} />
                  <Route path="/login" element={<Login setUser={setUser} />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/products/dry-fruits" element={<DryFruitsProducts />} />
                  <Route path="/product/dry-fruits/:id" element={<DryFruitDetail />} />
                  <Route path="/products/spices" element={<SpicesProducts />} />
                  <Route path="/product/spices/:id" element={<SpiceDetail />} />
                  <Route path="/products/tea" element={<TeaProducts />} />
                  <Route path="/product/tea/:id" element={<TeaDetail />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  
                  {/* Protected routes - Any authenticated user */}
                  <Route 
                    path="/cart" 
                    element={<LegacyProtectedRoute element={<Cart />} requiredRole="any" />} 
                  />
                  <Route 
                    path="/checkout" 
                    element={<LegacyProtectedRoute element={<Checkout />} requiredRole="any" />} 
                  />
                  <Route 
                    path="/profile" 
                    element={<LegacyProtectedRoute element={<Profile user={user} setUser={setUser} />} requiredRole="any" />} 
                  />
                  
                  {/* Protected routes - Customer */}
                  <Route 
                    path="/dashboard" 
                    element={<LegacyProtectedRoute element={<UserDashboard user={user} />} requiredRole="customer" />} 
                  />
                  <Route 
                    path="/orders" 
                    element={<LegacyProtectedRoute element={<Orders user={user} />} requiredRole="any" />} 
                  />
                  <Route 
                    path="/orders/:id" 
                    element={<LegacyProtectedRoute element={<OrderDetail />} requiredRole="any" />} 
                  />
                  
                  {/* Protected routes - Admin */}
                  <Route 
                    path="/admin/dashboard" 
                    element={<LegacyProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} 
                  />
                  <Route 
                    path="/admin/orders" 
                    element={<LegacyProtectedRoute element={<Orders isAdmin={true} />} requiredRole="admin" />} 
                  />
                  <Route 
                    path="/admin/products" 
                    element={<LegacyProtectedRoute element={<Products isAdmin={true} />} requiredRole="admin" />} 
                  />
                  <Route 
                    path="/admin/users" 
                    element={<LegacyProtectedRoute element={<UserList />} requiredRole="admin" />} 
                  />
                  
                  {/* Other routes */}
                  <Route path="/emailjs-setup" element={<EmailJSInstructions />} />
                  <Route path="/emailjs-template" element={<EmailTemplateExample />} />
                  <Route path="/emailjs-test" element={<EmailJSTest />} />
                  
                  {/* Catch all - 404 page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </LanguageProvider>
      </Auth0Provider>
    </HelmetProvider>
  );
}

// Placeholder component for admin user management
const UserList = () => {
  return <div className="container mt-4"><h1>User Management</h1><p>User management functionality coming soon</p></div>;
};

export default App; 
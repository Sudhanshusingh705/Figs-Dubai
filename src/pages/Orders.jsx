import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Mock API call - in a real app, you would fetch orders from your backend
    const fetchOrders = () => {
      setTimeout(() => {
        // Simulating order data
        const mockOrders = [
          {
            id: 'ORD-12345',
            date: '2023-07-15',
            total: 249.97,
            status: 'delivered',
            items: [
              {
                id: 1,
                name: 'Product 1',
                price: 99.99,
                quantity: 2,
              },
              {
                id: 2,
                name: 'Product 2',
                price: 49.99,
                quantity: 1,
              },
            ],
          },
          {
            id: 'ORD-12346',
            date: '2023-08-20',
            total: 159.98,
            status: 'shipped',
            items: [
              {
                id: 3,
                name: 'Product 3',
                price: 79.99,
                quantity: 2,
              },
            ],
          },
          {
            id: 'ORD-12347',
            date: '2023-09-05',
            total: 99.99,
            status: 'processing',
            items: [
              {
                id: 4,
                name: 'Product 4',
                price: 99.99,
                quantity: 1,
              },
            ],
          },
          {
            id: 'ORD-12348',
            date: '2023-09-10',
            total: 129.99,
            status: 'cancelled',
            items: [
              {
                id: 5,
                name: 'Product 5',
                price: 129.99,
                quantity: 1,
              },
            ],
          },
        ];

        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    };

    fetchOrders();
  }, []);

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
        return 'status-shipped';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      <div className="orders-tabs">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          All Orders
        </button>
        <button
          className={activeTab === 'processing' ? 'active' : ''}
          onClick={() => setActiveTab('processing')}
        >
          Processing
        </button>
        <button
          className={activeTab === 'shipped' ? 'active' : ''}
          onClick={() => setActiveTab('shipped')}
        >
          Shipped
        </button>
        <button
          className={activeTab === 'delivered' ? 'active' : ''}
          onClick={() => setActiveTab('delivered')}
        >
          Delivered
        </button>
        <button
          className={activeTab === 'cancelled' ? 'active' : ''}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
          <Link to="/products" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{formatDate(order.date)}</span>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-name">
                      {item.name} <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-total">
                  <span>Total:</span> ${order.total.toFixed(2)}
                </div>
                <div className="order-actions">
                  <Link to={`/orders/${order.id}`} className="view-details-btn">
                    View Details
                  </Link>
                  {order.status === 'delivered' && (
                    <button className="reorder-btn">Buy Again</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 
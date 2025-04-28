import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    orders: [],
    notifications: []
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setUserData({
        name: 'John Doe',
        orders: [
          { id: 1, product: 'Electronics', status: 'Processing', date: '2023-04-15' },
          { id: 2, product: 'Furniture', status: 'Shipped', date: '2023-04-10' },
          { id: 3, product: 'Textiles', status: 'Delivered', date: '2023-04-01' }
        ],
        notifications: [
          { id: 1, message: 'Your order #2 has been shipped', isRead: false, date: '2023-04-12' },
          { id: 2, message: 'Document approval required for order #1', isRead: true, date: '2023-04-11' }
        ]
      });
    }, 1000);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userData.name}</h1>
      
      <div className="dashboard-overview">
        <div className="dashboard-section">
          <h2>My Orders</h2>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.product}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <Link to={`/orders/${order.id}`} className="view-btn">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/orders" className="see-all-link">See all orders</Link>
        </div>

        <div className="dashboard-section">
          <h2>Notifications</h2>
          <div className="notifications-list">
            {userData.notifications.map(notification => (
              <div key={notification.id} className={`notification-item ${!notification.isRead ? 'unread' : ''}`}>
                <p>{notification.message}</p>
                <span className="notification-date">{notification.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/new-order" className="dashboard-btn">Create New Order</Link>
          <Link to="/documents" className="dashboard-btn">Upload Documents</Link>
          <Link to="/profile" className="dashboard-btn">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 
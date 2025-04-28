import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Mock data - replace with actual API call
  useEffect(() => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      const mockOrders = [
        { 
          id: 1, 
          reference: 'ORD-2023-001', 
          product: 'Electronics Equipment', 
          status: 'Processing', 
          date: '2023-04-15',
          destination: 'Dubai, UAE',
          value: 12500
        },
        { 
          id: 2, 
          reference: 'ORD-2023-002', 
          product: 'Furniture', 
          status: 'Shipped', 
          date: '2023-04-10',
          destination: 'London, UK',
          value: 8750
        },
        { 
          id: 3, 
          reference: 'ORD-2023-003', 
          product: 'Textiles', 
          status: 'Delivered', 
          date: '2023-04-01',
          destination: 'New York, USA',
          value: 5300
        },
        { 
          id: 4, 
          reference: 'ORD-2023-004', 
          product: 'Auto Parts', 
          status: 'Processing', 
          date: '2023-04-18',
          destination: 'Berlin, Germany',
          value: 9200
        },
        { 
          id: 5, 
          reference: 'ORD-2023-005', 
          product: 'Medical Supplies', 
          status: 'Pending', 
          date: '2023-04-20',
          destination: 'Tokyo, Japan',
          value: 15400
        },
        { 
          id: 6, 
          reference: 'ORD-2023-006', 
          product: 'Food Products', 
          status: 'Delivered', 
          date: '2023-03-25',
          destination: 'Sydney, Australia',
          value: 7350
        },
        { 
          id: 7, 
          reference: 'ORD-2023-007', 
          product: 'Cosmetics', 
          status: 'Shipped', 
          date: '2023-04-05',
          destination: 'Paris, France',
          value: 6200
        },
        { 
          id: 8, 
          reference: 'ORD-2023-008', 
          product: 'Machinery', 
          status: 'Processing', 
          date: '2023-04-12',
          destination: 'Moscow, Russia',
          value: 28500
        },
        { 
          id: 9, 
          reference: 'ORD-2023-009', 
          product: 'Sporting Goods', 
          status: 'Pending', 
          date: '2023-04-22',
          destination: 'Toronto, Canada',
          value: 4750
        },
        { 
          id: 10, 
          reference: 'ORD-2023-010', 
          product: 'Toys', 
          status: 'Delivered', 
          date: '2023-03-18',
          destination: 'Mexico City, Mexico',
          value: 3200
        },
        { 
          id: 11, 
          reference: 'ORD-2023-011', 
          product: 'Books', 
          status: 'Shipped', 
          date: '2023-04-08',
          destination: 'Mumbai, India',
          value: 2150
        },
        { 
          id: 12, 
          reference: 'ORD-2023-012', 
          product: 'Jewelry', 
          status: 'Processing', 
          date: '2023-04-16',
          destination: 'Singapore',
          value: 18900
        }
      ];
      
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = order.reference.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Orders</h1>
        <Link to="/new-order" className="new-order-btn">New Order</Link>
      </div>

      <div className="orders-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <label htmlFor="status-filter">Filter by status:</label>
          <select 
            id="status-filter" 
            value={filter}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Product</th>
                  <th>Destination</th>
                  <th>Value</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.reference}</td>
                    <td>{order.product}</td>
                    <td>{order.destination}</td>
                    <td>${order.value.toLocaleString()}</td>
                    <td>{order.date}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/orders/${order.id}`} className="view-btn">View</Link>
                        <button className="edit-btn">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders; 
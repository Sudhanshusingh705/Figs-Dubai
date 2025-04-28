import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import InvoiceManager from '../components/InvoiceManager';
import DeliveryNoteManager from '../components/DeliveryNoteManager';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ordersAPI.getOrderById(id);
        setOrder(response.data.data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Order not found</div>
        <button className="btn btn-primary" onClick={() => navigate('/orders')}>
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Order #{order.orderNumber}</h1>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <h5>Order Details</h5>
          <span className={`badge bg-${getStatusBadge(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Customer:</strong> {order.customer ? order.customer.name : 'N/A'}</p>
              <p><strong>Total Amount:</strong> {formatCurrency(order.pricing.total, order.currency)}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Payment Status:</strong> {order.paymentDetails?.status || 'pending'}</p>
              <p><strong>Shipping Status:</strong> {order.shippingDetails?.status || 'pending'}</p>
              <p><strong>Type:</strong> {order.isExport ? 'Export' : 'Local'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Billing Address</h5>
            </div>
            <div className="card-body">
              <p>{order.billingAddress.name}</p>
              <p>{order.billingAddress.line1}</p>
              {order.billingAddress.line2 && <p>{order.billingAddress.line2}</p>}
              <p>
                {order.billingAddress.city}, {order.billingAddress.state}{' '}
                {order.billingAddress.postalCode}
              </p>
              <p>{order.billingAddress.country}</p>
              <p>Phone: {order.billingAddress.phone}</p>
              <p>Email: {order.billingAddress.email}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Shipping Address</h5>
            </div>
            <div className="card-body">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
              <p>Email: {order.shippingAddress.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5>Items</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{formatCurrency(item.price, order.currency)}</td>
                    <td>{formatCurrency(item.price * item.quantity, order.currency)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-end">
                    <strong>Subtotal:</strong>
                  </td>
                  <td>{formatCurrency(order.pricing.subtotal, order.currency)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="text-end">
                    <strong>Tax:</strong>
                  </td>
                  <td>{formatCurrency(order.pricing.tax, order.currency)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="text-end">
                    <strong>Shipping:</strong>
                  </td>
                  <td>{formatCurrency(order.pricing.shipping, order.currency)}</td>
                </tr>
                {order.pricing.discount > 0 && (
                  <tr>
                    <td colSpan="4" className="text-end">
                      <strong>Discount:</strong>
                    </td>
                    <td>-{formatCurrency(order.pricing.discount, order.currency)}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan="4" className="text-end">
                    <strong>Total:</strong>
                  </td>
                  <td className="fw-bold">
                    {formatCurrency(order.pricing.total, order.currency)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Invoice Manager */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Invoice Management</h5>
        </div>
        <div className="card-body">
          <InvoiceManager orderId={order._id} orderNumber={order.orderNumber} />
        </div>
      </div>

      {/* Delivery Note Manager */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Delivery Note Management</h5>
        </div>
        <div className="card-body">
          <DeliveryNoteManager orderId={order._id} orderNumber={order.orderNumber} />
        </div>
      </div>

      {/* Order History Timeline */}
      {order.orderHistory && order.orderHistory.length > 0 && (
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">Order History</h5>
          </div>
          <div className="card-body">
            <div className="timeline">
              {order.orderHistory.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h5 className="timeline-title">{item.status}</h5>
                    <p className="timeline-description">{item.description}</p>
                    <p className="timeline-date">
                      {new Date(item.timestamp).toLocaleDateString()} {' '}
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .badge {
          font-size: 0.9rem;
          padding: 0.5rem 0.75rem;
        }
        .timeline {
          position: relative;
          padding-left: 30px;
        }
        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 15px;
          width: 2px;
          background-color: #e9ecef;
        }
        .timeline-item {
          position: relative;
          margin-bottom: 20px;
        }
        .timeline-marker {
          position: absolute;
          left: -30px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #0275d8;
          top: 4px;
        }
        .timeline-content {
          padding-bottom: 15px;
        }
        .timeline-title {
          margin-bottom: 5px;
          text-transform: capitalize;
        }
        .timeline-description {
          margin-bottom: 5px;
        }
        .timeline-date {
          font-size: 0.85rem;
          color: #6c757d;
        }
        .card {
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.08);
        }
        .card-header {
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

// Helper function to format currency
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};

// Helper function to get badge color based on status
const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default OrderDetail; 
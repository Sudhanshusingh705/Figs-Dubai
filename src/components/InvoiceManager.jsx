import React, { useState } from 'react';
import { ordersAPI } from '../services/api';

/**
 * Component for viewing, downloading, and sending invoices
 */
const InvoiceManager = ({ orderId, orderNumber }) => {
  const [loading, setLoading] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  /**
   * View invoice in HTML format in a new window
   */
  const handleViewInvoice = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ordersAPI.getInvoice(orderId, 'html');
      
      // Open a new window with the invoice HTML
      const newWindow = window.open('', '_blank');
      newWindow.document.write(response.data);
      newWindow.document.close();
    } catch (err) {
      setError('Failed to load invoice. Please try again.');
      console.error('Error viewing invoice:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Download invoice as PDF
   */
  const handleDownloadInvoice = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ordersAPI.downloadInvoice(orderId);
      
      // Create a download link for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${orderNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to download invoice. Please try again.');
      console.error('Error downloading invoice:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send invoice via email
   */
  const handleSendInvoice = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await ordersAPI.sendInvoice(orderId, emailTo);
      setEmailSent(true);
      setShowEmailForm(false);
      setEmailTo('');
    } catch (err) {
      setError('Failed to send invoice. Please try again.');
      console.error('Error sending invoice:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice-manager">
      <h3>Invoice Options</h3>
      
      <div className="invoice-actions">
        <button 
          className="btn btn-primary" 
          onClick={handleViewInvoice} 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'View Invoice'}
        </button>
        
        <button 
          className="btn btn-success" 
          onClick={handleDownloadInvoice} 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Download PDF'}
        </button>
        
        <button 
          className="btn btn-info" 
          onClick={() => setShowEmailForm(!showEmailForm)} 
          disabled={loading}
        >
          Send Invoice
        </button>
      </div>
      
      {emailSent && (
        <div className="alert alert-success mt-3">
          Invoice sent successfully!
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}
      
      {showEmailForm && (
        <div className="email-form mt-3">
          <form onSubmit={handleSendInvoice}>
            <div className="form-group">
              <label htmlFor="emailTo">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="emailTo"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                required
                placeholder="Enter email address"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary mt-2" 
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary mt-2 ml-2" 
              onClick={() => setShowEmailForm(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      
      <style jsx>{`
        .invoice-manager {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .invoice-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        .btn-primary {
          background-color: #0275d8;
          color: white;
        }
        .btn-success {
          background-color: #5cb85c;
          color: white;
        }
        .btn-info {
          background-color: #5bc0de;
          color: white;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
          margin-left: 8px;
        }
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-control {
          width: 100%;
          padding: 8px;
          border: 1px solid #ced4da;
          border-radius: 4px;
        }
        .mt-2 {
          margin-top: 8px;
        }
        .mt-3 {
          margin-top: 16px;
        }
        .alert {
          padding: 12px;
          border-radius: 4px;
          margin-top: 15px;
        }
        .alert-success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .alert-danger {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
};

export default InvoiceManager; 
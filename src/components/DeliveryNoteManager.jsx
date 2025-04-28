import React, { useState } from 'react';
import { ordersAPI } from '../services/api';

/**
 * Component for generating and sending delivery notes
 */
const DeliveryNoteManager = ({ orderId, orderNumber }) => {
  const [loading, setLoading] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Generate delivery note
   */
  const handleGenerateDeliveryNote = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await ordersAPI.getDeliveryNote(orderId);
      setSuccess(`Delivery note generated successfully. Path: ${response.data.data.pdfPath}`);
      
      // If we have a direct file link, we could open a download
      if (response.data.data.pdfPath) {
        // Create a filename based on the path or use the order number
        const downloadFilename = `DeliveryNote-${orderNumber}.pdf`;
        downloadFile(`/api/files/download?path=${response.data.data.pdfPath}`, downloadFilename);
      }
    } catch (err) {
      setError('Failed to generate delivery note. Please try again.');
      console.error('Error generating delivery note:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send delivery note via email
   */
  const handleSendDeliveryNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await ordersAPI.sendDeliveryNote(orderId, emailTo);
      setEmailSent(true);
      setShowEmailForm(false);
      setEmailTo('');
      setSuccess(`Delivery note sent to ${emailTo} successfully.`);
    } catch (err) {
      setError('Failed to send delivery note. Please try again.');
      console.error('Error sending delivery note:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Helper function to download a file
   */
  const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="delivery-note-manager">
      <h3>Delivery Note Options</h3>
      
      <div className="delivery-note-actions">
        <button 
          className="btn btn-primary" 
          onClick={handleGenerateDeliveryNote} 
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Generate Delivery Note'}
        </button>
        
        <button 
          className="btn btn-info" 
          onClick={() => setShowEmailForm(!showEmailForm)} 
          disabled={loading}
        >
          Send Delivery Note
        </button>
      </div>
      
      {success && (
        <div className="alert alert-success mt-3">
          {success}
        </div>
      )}
      
      {emailSent && (
        <div className="alert alert-success mt-3">
          Delivery note sent successfully!
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}
      
      {showEmailForm && (
        <div className="email-form mt-3">
          <form onSubmit={handleSendDeliveryNote}>
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
        .delivery-note-manager {
          background-color: #f7f9fc;
          padding: 20px;
          border-radius: 5px;
          margin-top: 20px;
          border: 1px solid #e3e8f0;
        }
        .delivery-note-actions {
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

export default DeliveryNoteManager; 
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const EmailJSTest = () => {
  const form = useRef();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    emailjs.sendForm(
      'service_6i5jvav',
      'template_0j9pu3m',
      form.current,
      'IP4LSkuDSMnjPQqhh'
    )
    .then((result) => {
      console.log(result.text);
      setResult(result.text);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setError(error.text || 'An error occurred');
      setLoading(false);
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>EmailJS Test</h1>
      
      <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
          <input 
            type="text" 
            name="user_name" 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            defaultValue="Test User"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
          <input 
            type="email" 
            name="user_email" 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            defaultValue="test@example.com"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
          <input 
            type="text" 
            name="user_phone" 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            defaultValue="+1234567890"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Subject</label>
          <input 
            type="text" 
            name="subject" 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            defaultValue="Test Email"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Product Interest</label>
          <select 
            name="product_interest" 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            defaultValue="dry-fruits"
          >
            <option value="general">General Inquiry</option>
            <option value="dry-fruits">Dry Fruits</option>
            <option value="spices">Spices</option>
            <option value="tea">Tea</option>
            <option value="wholesale">Wholesale</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message</label>
          <textarea 
            name="message" 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
            defaultValue="This is a test message to verify EmailJS is working correctly."
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '12px', 
            background: '#1e3c72', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Sending...' : 'Send Test Email'}
        </button>
      </form>
      
      {result && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#d4edda', color: '#155724', borderRadius: '4px' }}>
          <p>Email sent successfully! Result: {result}</p>
        </div>
      )}
      
      {error && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>
          <p>Error sending email: {error}</p>
        </div>
      )}
      
      <div style={{ marginTop: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Debugging Information</h3>
        <p><strong>Service ID:</strong> service_6i5jvav</p>
        <p><strong>Template ID:</strong> template_0j9pu3m</p>
        <p><strong>Public Key:</strong> IP4LSkuDSMnjPQqhh</p>
      </div>
    </div>
  );
};

export default EmailJSTest; 
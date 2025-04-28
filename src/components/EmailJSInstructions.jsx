import React from 'react';

const EmailJSInstructions = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '40px auto', 
      padding: '30px', 
      background: '#f9f9f9', 
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#1e3c72', marginBottom: '20px' }}>EmailJS Setup Instructions</h2>
      
      <ol style={{ fontSize: '16px', lineHeight: '1.7', color: '#444' }}>
        <li style={{ marginBottom: '15px' }}>
          <strong>Create an EmailJS account:</strong> Go to <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer">EmailJS.com</a> and sign up for a free account.
        </li>
        
        <li style={{ marginBottom: '15px' }}>
          <strong>Create an Email Service:</strong>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li>In your EmailJS dashboard, go to "Email Services" tab</li>
            <li>Click "Add New Service" and choose your email provider (Gmail, Outlook, etc.)</li>
            <li>Follow the instructions to connect your email account</li>
            <li>Note down the "Service ID" that is generated</li>
          </ul>
        </li>
        
        <li style={{ marginBottom: '15px' }}>
          <strong>Create an Email Template:</strong>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li>Go to the "Email Templates" tab</li>
            <li>Click "Create New Template"</li>
            <li>Design your email template</li>
            <li>Use variables like {'{{'} name {'}}' }, {'{{'} email {'}}' }, {'{{'} message {'}}' }, etc. to include form data</li>
            <li>Note down the "Template ID" that is generated</li>
          </ul>
        </li>
        
        <li style={{ marginBottom: '15px' }}>
          <strong>Get your User ID:</strong>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li>Go to your EmailJS dashboard's "Integration" tab</li>
            <li>Find your "User ID" (also called "Public Key")</li>
          </ul>
        </li>
        
        <li style={{ marginBottom: '15px' }}>
          <strong>Update your ContactUs.jsx file:</strong>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li>Replace 'service_id' with your actual Service ID</li>
            <li>Replace 'template_id' with your actual Template ID</li>
            <li>Replace 'user_id' with your actual User ID (Public Key)</li>
          </ul>
        </li>
      </ol>

      <div style={{ 
        padding: '20px', 
        background: '#e9f5ff', 
        borderRadius: '8px', 
        borderLeft: '4px solid #1e3c72',
        marginTop: '30px'
      }}>
        <h3 style={{ color: '#1e3c72', marginBottom: '10px' }}>Example Code</h3>
        <pre style={{ 
          background: '#f1f1f1', 
          padding: '15px', 
          borderRadius: '5px', 
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
{`emailjs.sendForm(
  'YOUR_SERVICE_ID',  // e.g., 'service_abc123'
  'YOUR_TEMPLATE_ID', // e.g., 'template_xyz456'
  form.current,
  'YOUR_USER_ID'      // e.g., 'user987654321'
)`}
        </pre>
      </div>

      <div style={{ 
        padding: '20px', 
        background: '#fff4e5', 
        borderRadius: '8px', 
        borderLeft: '4px solid #ff9800',
        marginTop: '30px'
      }}>
        <h3 style={{ color: '#e65100', marginBottom: '10px' }}>Important Notes</h3>
        <ul style={{ marginLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>The free EmailJS plan allows 200 emails per month</li>
          <li style={{ marginBottom: '10px' }}>Make sure the input names in your form match the variables in your email template</li>
          <li style={{ marginBottom: '10px' }}>For security, consider storing your IDs in environment variables</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailJSInstructions; 
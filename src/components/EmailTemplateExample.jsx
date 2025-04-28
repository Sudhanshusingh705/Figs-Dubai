import React from 'react';

const EmailTemplateExample = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '40px auto', 
      padding: '30px', 
      background: '#f9f9f9', 
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#1e3c72', marginBottom: '20px' }}>EmailJS Template Example</h2>
      
      <div style={{ 
        padding: '20px', 
        background: 'white', 
        borderRadius: '8px', 
        border: '1px solid #ddd',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#1e3c72', marginBottom: '15px' }}>Example Template Code</h3>
        <pre style={{ 
          background: '#f1f1f1', 
          padding: '15px', 
          borderRadius: '5px', 
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
{`<!DOCTYPE html>
<html>
<head>
  <title>Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .header {
      background-color: #1e3c72;
      color: white;
      padding: 15px;
      text-align: center;
      border-radius: 8px 8px 0 0;
      margin: -20px -20px 20px;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 15px;
      text-align: center;
      border-radius: 0 0 8px 8px;
      margin: 20px -20px -20px;
      font-size: 14px;
    }
    .field {
      margin-bottom: 15px;
    }
    .field-name {
      font-weight: bold;
      color: #1e3c72;
    }
    .field-value {
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    
    <div class="field">
      <div class="field-name">Name:</div>
      <div class="field-value">\{{name}}</div>
    </div>
    
    <div class="field">
      <div class="field-name">Email:</div>
      <div class="field-value">\{{email}}</div>
    </div>
    
    <div class="field">
      <div class="field-name">Phone:</div>
      <div class="field-value">\{{phone}}</div>
    </div>
    
    <div class="field">
      <div class="field-name">Subject:</div>
      <div class="field-value">\{{subject}}</div>
    </div>
    
    <div class="field">
      <div class="field-name">Product Interest:</div>
      <div class="field-value">\{{product}}</div>
    </div>
    
    <div class="field">
      <div class="field-name">Message:</div>
      <div class="field-value">\{{message}}</div>
    </div>
    
    <div class="footer">
      <p>This email was sent from the FIGS Dubai contact form.</p>
      <p>© FIGS Dubai - All rights reserved</p>
    </div>
  </div>
</body>
</html>`}
        </pre>
      </div>
      
      <div style={{ 
        padding: '20px', 
        background: '#e9f5ff', 
        borderRadius: '8px', 
        borderLeft: '4px solid #1e3c72',
        marginTop: '30px'
      }}>
        <h3 style={{ color: '#1e3c72', marginBottom: '10px' }}>How to Use This Template</h3>
        <ol style={{ marginLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Log in to your EmailJS account</li>
          <li style={{ marginBottom: '10px' }}>Go to "Email Templates"</li>
          <li style={{ marginBottom: '10px' }}>Click "Create New Template"</li>
          <li style={{ marginBottom: '10px' }}>Copy and paste the HTML code above into the HTML editor</li>
          <li style={{ marginBottom: '10px' }}>Set a subject line for your emails (e.g., "New Contact Form Submission from {'{{'} name {'}}' }")</li>
          <li style={{ marginBottom: '10px' }}>Save the template and note down the Template ID</li>
        </ol>
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
          <li style={{ marginBottom: '10px' }}>The variables like {'{{'} name {'}}' }, {'{{'} email {'}}' }, etc. must match the name attributes in your form inputs</li>
          <li style={{ marginBottom: '10px' }}>You can customize this template with your brand colors and logos</li>
          <li style={{ marginBottom: '10px' }}>Test the form before going live to ensure emails are being sent correctly</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailTemplateExample; 
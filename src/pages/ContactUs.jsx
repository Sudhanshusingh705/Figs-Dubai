import React, { useState, useRef, useEffect } from 'react';
import '../styles/ContactUs.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    subject: '',
    message: '',
    product_interest: 'general'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verify EmailJS is loaded properly
    if (emailjs) {
      console.log("EmailJS loaded successfully");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    console.log("Form data being sent:", formData);
    console.log("Form ref content:", form.current);
    
    // Replace these with your actual EmailJS service, template, and user IDs
    emailjs.sendForm(
      'service_6i5jvav', // Your EmailJS service ID
      'template_0j9pu3m', // Your EmailJS template ID
      form.current,
      'IP4LSkuDSMnjPQqhh' // Your EmailJS public key
    )
    .then((result) => {
      console.log('Email successfully sent!', result.text);
      setLoading(false);
      setFormSubmitted(true);
      setFormData({
        user_name: '',
        user_email: '',
        user_phone: '',
        subject: '',
        message: '',
        product_interest: 'general'
      });
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      console.error('Error details:', error.text || 'No error details available');
      setLoading(false);
      setError(`Failed to send your message: ${error.text || 'Unknown error. Please try again later.'}`);
    });
  };

  return (
    <div className="contact-page">
      {/* Hero Banner */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>We're here to answer any questions you may have about our products and services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-main">
        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info-card">
            <div className="contact-info-header">
              <h2>Contact Information</h2>
              <p>Connect with us through any of these channels</p>
            </div>
            
            <div className="contact-info-body">
              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <h3>Our Location</h3>
                  <p>FIGS Dubai Headquarters</p>
                  <p>Business Bay, Dubai, UAE</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaPhoneAlt />
                </div>
                <div className="info-content">
                  <h3>Phone</h3>
                  <p>+91 8882855844 (Main)</p>
                  <p>+971 50 987 6543 (Sales)</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <p>info@futureindoglobalservices.ae</p>
                  <p>sales@futureindoglobalservices.ae</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaClock />
                </div>
                <div className="info-content">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 10:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="social-media">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon"><FaWhatsapp /></a>
                <a href="#" className="social-icon"><FaLinkedin /></a>
                <a href="#" className="social-icon"><FaTwitter /></a>
                <a href="#" className="social-icon"><FaInstagram /></a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            {formSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. Our team will get back to you within 24 hours.</p>
                <button 
                  className="new-message-btn"
                  onClick={() => setFormSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={form} className="contact-form" onSubmit={handleSubmit}>
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll respond as soon as possible</p>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="user_name">Full Name</label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      placeholder="John Doe"
                      value={formData.user_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="user_email">Email Address</label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      placeholder="john@example.com"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="user_phone">Phone Number</label>
                    <input
                      type="tel"
                      id="user_phone"
                      name="user_phone"
                      placeholder="+971 50 123 4567"
                      value={formData.user_phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="product_interest">Product Interest</label>
                  <select
                    id="product_interest"
                    name="product_interest"
                    value={formData.product_interest}
                    onChange={handleChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="dry-fruits">Dry Fruits</option>
                    <option value="spices">Spices</option>
                    <option value="tea">Tea</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Please provide details about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading-spinner">
                      <span className="spinner"></span>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <div className="map-container">
          <h2>Visit Our Office</h2>
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785100219353!2d55.27058411501101!3d25.188589983895277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d18fffffff%3A0xb4207736daec4189!2sBusiness%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s" 
              width="100%" 
              height="450" 
              frameBorder="0" 
              allowFullScreen="" 
              aria-hidden="false" 
              tabIndex="0">
            </iframe>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How can I place a bulk order?</h3>
              <p>For bulk orders, please contact our sales team directly at sales@futureindoglobalservices.ae or call +971 50 987 6543. We offer special pricing for wholesale customers.</p>
            </div>
            <div className="faq-item">
              <h3>Do you ship internationally?</h3>
              <p>Yes, we ship to over 30 countries worldwide. Shipping rates and delivery times vary by location. Please contact us for specific shipping information to your country.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, bank transfers, and PayPal. For wholesale orders, we also offer terms for qualified businesses.</p>
            </div>
            <div className="faq-item">
              <h3>Can I request product samples?</h3>
              <p>Yes, we offer sample kits for serious business inquiries. Please contact our sales team to arrange a sample shipment of our products.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    // Mock API call - in a real app, you would fetch cart from context or API
    const fetchCart = () => {
      setTimeout(() => {
        // Simulating cart data
        const mockCartItems = [
          {
            id: 1,
            name: 'Product 1',
            price: 99.99,
            image: '/images/product1.jpg',
            quantity: 2,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 149.99,
            image: '/images/product2.jpg',
            quantity: 1,
          },
        ];

        setCartItems(mockCartItems);
        setLoading(false);
      }, 800);
    };

    fetchCart();
  }, []);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    // Proceed to payment step
    setStep(2);
  };

  const handlePaymentSubmit = (paymentData) => {
    // In a real app, would process payment and create order
    setStep(3);
  };

  const placeOrder = () => {
    // In a real app, would call API to finalize order
    setTimeout(() => {
      // Redirect to confirmation page or orders page
      navigate('/orders');
    }, 1000);
  };

  // Calculate order summary
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = (subtotal) => {
    return subtotal > 100 ? 0 : 10;
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.05; // 5% tax
  };

  const calculateTotal = (subtotal, shipping, tax) => {
    return subtotal + shipping + tax;
  };

  if (loading) {
    return <div className="loading">Loading checkout information...</div>;
  }

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, shipping, tax);

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-title">Shipping</div>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-title">Payment</div>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-title">Review</div>
          </div>
        </div>

        <div className="checkout-main">
          {step === 1 && (
            <div className="shipping-section">
              <h2>Shipping Information</h2>
              <form onSubmit={handleShippingSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip/Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <Link to="/cart" className="back-btn">
                    Back to Cart
                  </Link>
                  <button type="submit" className="next-btn">
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="payment-section">
              <h2>Payment Method</h2>
              <PaymentForm handleSubmit={handlePaymentSubmit} />
              <div className="form-actions">
                <button className="back-btn" onClick={() => setStep(1)}>
                  Back to Shipping
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="review-section">
              <h2>Review Your Order</h2>
              <div className="review-info">
                <div className="review-block">
                  <h3>Shipping Information</h3>
                  <p>
                    {shippingInfo.firstName} {shippingInfo.lastName}
                    <br />
                    {shippingInfo.address}
                    <br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    <br />
                    {shippingInfo.country}
                    <br />
                    {shippingInfo.phone}
                  </p>
                </div>
                <div className="review-block">
                  <h3>Payment Method</h3>
                  <p>Credit Card (ending in **** 1234)</p>
                </div>
              </div>
              <div className="order-items">
                <h3>Order Items</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="form-actions">
                <button className="back-btn" onClick={() => setStep(2)}>
                  Back to Payment
                </button>
                <button className="place-order-btn" onClick={placeOrder}>
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-name">
                  {item.name} <span className="item-quantity">x{item.quantity}</span>
                </div>
                <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-line">
              <span>Tax (5%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 
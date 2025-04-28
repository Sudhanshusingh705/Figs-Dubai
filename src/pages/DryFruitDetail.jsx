import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/ProductDetail.css';

const DryFruitDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Dry Fruits data - using the same data as in Products.jsx and DryFruitsProducts.jsx
  const dryFruitsRaw = [
    {
      id: 'df1',
      name: 'Almonds',
      price: 45.99,
      image: '/assets/Dry Fruits/Almonds.png',
      description: 'Sourced from the finest orchards, our almonds are known for their exceptional taste and quality.',
      category: 'dry-fruits',
      origin: "California, USA",
      packageSizes: ["250g", "500g", "1kg", "5kg"],
      benefits: "Almonds are rich in healthy fats, fiber, protein, magnesium and vitamin E. They can help lower blood sugar levels, reduce blood pressure and lower cholesterol levels."
    },
    {
      id: 'df2',
      name: 'Walnuts Akhrot',
      price: 52.99,
      image: '/assets/Dry Fruits/Walnuts Akhrot.png',
      description: 'Directly imported from the valleys of Kashmir, these walnuts are packed with nutrients and flavor.',
      category: 'dry-fruits',
      origin: "Kashmir, India",
      packageSizes: ["250g", "500g", "1kg", "5kg"],
      benefits: "Walnuts are significantly higher in omega-3 fat than any other nut, which is good for heart health. They also contain biotin, manganese, and copper."
    },
    {
      id: 'df3',
      name: 'Dates Khajoor',
      price: 38.50,
      image: '/assets/Dry Fruits/Dates Khajoor.png',
      description: 'Known as the king of dates, our Medjool dates are naturally sweet and incredibly nutritious.',
      category: 'dry-fruits',
      origin: "Saudi Arabia",
      packageSizes: ["250g", "500g", "1kg", "5kg"],
      benefits: "Dates are high in natural sugar, making them a perfect energy booster. They contain fiber, potassium, magnesium, vitamin B6, and several other nutrients and antioxidants."
    },
    {
      id: 'df4',
      name: 'Pistachios Pista',
      price: 65.99,
      image: '/assets/Dry Fruits/Pistachios Pista.png',
      description: 'Premium pistachios from Iran, renowned for their distinctive flavor and beautiful green color.',
      category: 'dry-fruits',
      origin: "Iran",
      packageSizes: ["250g", "500g", "1kg", "5kg"],
      benefits: "Pistachios are high in protein, fiber, and antioxidants. They're one of the most vitamin B6-rich foods, which is important for blood sugar and the formation of hemoglobin."
    },
    {
      id: 'df5',
      name: 'Apricots Khubani',
      price: 35.75,
      image: '/assets/Dry Fruits/Apricots Khubani.png',
      description: 'Soft and tangy dried apricots, perfect for snacking or adding to desserts and salads.',
      category: 'dry-fruits',
      origin: "Turkey",
      packageSizes: ["250g", "500g", "1kg", "5kg"],
      benefits: "Dried apricots are an excellent source of vitamin A (in the form of beta-carotene), vitamin E, potassium and copper. They're also a good source of fiber, which is important for digestive health."
    }
  ];

  // Create proper absolute path for images
  const getImagePath = (relativePath) => {
    if (!relativePath) return '';
    
    // If the path already starts with http or https, return it as is
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    try {
      // Remove leading slash if present to prevent double slashes
      const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
      
      // Properly encode the path segments but keep the slashes intact
      const encodedPath = cleanPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
      
      // Handle different environments
      if (process.env.NODE_ENV === 'production') {
        // Use PUBLIC_URL in production if available
        return `${process.env.PUBLIC_URL || ''}/${encodedPath}`;
      } else {
        // In development, we're using localhost:3000
        return `/${encodedPath}`;
      }
    } catch (error) {
      console.error('Error processing image path:', error);
      return relativePath; // Return original path if there's an error
    }
  };

  // Related products (3 random products from the same category)
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    console.log("DryFruitDetail: Loading product with id", id);
    
    // Find the product by ID
    const foundProduct = dryFruitsRaw.find(p => p.id === id);
    console.log("Found product:", foundProduct ? foundProduct.name : "Not found");
    
    if (foundProduct) {
      // Add packageSizes and origin if they don't exist
      if (!foundProduct.packageSizes) {
        foundProduct.packageSizes = ["250g", "500g", "1kg", "5kg"];
      }
      
      if (!foundProduct.origin) {
        foundProduct.origin = "Various regions";
      }
      
      if (!foundProduct.benefits) {
        foundProduct.benefits = `${foundProduct.name} are nutritious and delicious dry fruits that provide various health benefits.`;
      }
    }
    
    // Get related products (exclude current product)
    const otherProducts = dryFruitsRaw.filter(p => p.id !== id);
    // Get 3 random products
    const randomProducts = [...otherProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(3, otherProducts.length));
    
    setRelatedProducts(randomProducts);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>The dry fruit you're looking for doesn't exist.</p>
        <Link to="/products/dry-fruits" className="back-btn">Back to Dry Fruits</Link>
      </div>
    );
  }

  // Format WhatsApp message with product details and quantity
  const whatsappMsg = `Hello, I'm interested in ordering ${quantity}kg of ${product.name}. Could you please provide more information about pricing and availability?`;
  // Use the direct WhatsApp link provided
  const whatsappLink = "https://wa.link/en2ho3";

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / 
        <Link to="/products/dry-fruits">Dry Fruits</Link> / 
        <span>{product.name}</span>
      </div>
      
      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={getImagePath(product.image)} alt={product.name} className="product-main-image" />
        </div>
        
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price} <span className="price-unit">/ kg</span></p>
          
          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Origin:</span>
              <span className="meta-value">{product.origin}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Available Sizes:</span>
              <div className="package-sizes">
                {product.packageSizes.map((size, index) => (
                  <span key={index} className="size-option">{size}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="product-short-description">
            <p>{product.description}</p>
          </div>
          
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity (kg):</label>
            <div className="quantity-input-group">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="quantity-btn"
              >-</button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >+</button>
            </div>
          </div>
          
          <div className="product-actions">
            <a 
              href={whatsappLink}
              className="enquiry-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i> Enquire via WhatsApp
            </a>
            
            <a 
              href={`mailto:info@figsdubai.com?subject=Enquiry about ${product.name}&body=${whatsappMsg}`}
              className="email-btn"
            >
              <i className="far fa-envelope"></i> Email Enquiry
            </a>
          </div>
        </div>
      </div>
      
      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
            onClick={() => setActiveTab('benefits')}
          >
            Health Benefits
          </button>
          <button 
            className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping & Storage
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-tab">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              <p>Our {product.name.toLowerCase()} are sourced from {product.origin}, known for producing the highest quality dry fruits. Each batch is carefully selected to ensure premium quality, taste, and nutritional value.</p>
              
              <h4>Available Packaging Options</h4>
              <ul className="packaging-options">
                {product.packageSizes.map((size, index) => (
                  <li key={index}>{size} package - Perfect for {size === '250g' ? 'sampling' : size === '500g' ? 'small households' : size === '1kg' ? 'regular use' : 'bulk buyers and businesses'}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'benefits' && (
            <div className="benefits-tab">
              <h3>Health Benefits</h3>
              <p>{product.benefits}</p>
              
              <div className="nutritional-info">
                <h4>Nutritional Value</h4>
                <p>Dry fruits are packed with essential nutrients, vitamins, and minerals. They're a great source of energy and can be included in your daily diet for improved health and well-being.</p>
              </div>
              
              <div className="usage-tips">
                <h4>How to Use</h4>
                <ul>
                  <li>Enjoy as a healthy snack on its own</li>
                  <li>Add to breakfast cereals, oatmeal, or yogurt</li>
                  <li>Include in baking recipes for natural sweetness</li>
                  <li>Mix with nuts for a nutritious trail mix</li>
                  <li>Use in savory dishes for added flavor and texture</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div className="shipping-tab">
              <h3>Shipping Information</h3>
              <p>We ship our premium dry fruits worldwide, ensuring they reach you in perfect condition. All products are carefully packaged to maintain freshness during transit.</p>
              
              <h4>Shipping Options</h4>
              <ul>
                <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                <li><strong>Express Shipping:</strong> 2-3 business days</li>
                <li><strong>International Shipping:</strong> 7-14 business days</li>
              </ul>
              
              <h4>Storage Guidelines</h4>
              <p>To maintain the quality and extend the shelf life of your dry fruits:</p>
              <ul>
                <li>Store in an airtight container in a cool, dry place</li>
                <li>Keep away from direct sunlight</li>
                <li>Refrigerate for longer shelf life</li>
                <li>For bulk purchases, consider freezing a portion</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="related-products">
        <h2>You Might Also Like</h2>
        <div className="related-products-grid">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="related-product">
              <Link to={`/product/dry-fruits/${relatedProduct.id}`}>
                <div className="related-product-image">
                  <img src={getImagePath(relatedProduct.image)} alt={relatedProduct.name} />
                </div>
                <h3>{relatedProduct.name}</h3>
                <p className="related-product-price">${typeof relatedProduct.price === 'number' ? relatedProduct.price.toFixed(2) : relatedProduct.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DryFruitDetail; 
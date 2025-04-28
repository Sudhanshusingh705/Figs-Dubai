import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaWhatsapp, FaHeart, FaStar, FaShare, FaCheckCircle, FaLeaf, FaSeedling, FaMugHot, FaHome, FaChevronRight, FaEnvelope, FaClock, FaShippingFast, FaBox, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { IoMdArrowForward } from 'react-icons/io';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const imageRef = useRef(null);
  const shareRef = useRef(null);
  const navigate = useNavigate();

  // Get category icon
  const getCategoryIcon = () => {
    switch(category) {
      case 'dry-fruits':
        return <FaSeedling className="category-icon" />;
      case 'spices':
        return <FaLeaf className="category-icon" />;
      case 'tea':
        return <FaMugHot className="category-icon" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Reset image state when component remounts
    setImageLoaded(false);
    setSelectedImage(0);
    
    // Mock API call to fetch product data
    const fetchProductDetail = () => {
      setLoading(true);
      setTimeout(() => {
        // Simulating product data based on category and ID
        const mockProduct = {
          id: id,
          category: category,
          name: generateProductName(),
          price: generatePrice(),
          images: [
            `https://source.unsplash.com/random/800x800/?${category},${Math.random()}`,
            `https://source.unsplash.com/random/800x800/?${category},product,${Math.random()}`,
            `https://source.unsplash.com/random/800x800/?${category},food,${Math.random()}`,
            `https://source.unsplash.com/random/800x800/?${category},closeup,${Math.random()}`
          ],
          description: generateDescription(),
          specifications: [
            { title: 'Origin', value: generateOrigin() },
            { title: 'Weight', value: `${(Math.random() * 500 + 100).toFixed(0)}g` },
            { title: 'Quality', value: 'Premium Grade' },
            { title: 'Packaging', value: 'Vacuum Sealed' },
          ],
          benefits: [
            'Rich in essential nutrients',
            'Harvested at peak freshness',
            'No artificial additives',
            'Premium quality guaranteed',
            'Ethically sourced'
          ],
          rating: (Math.random() * 2 + 3).toFixed(1),
          reviews: Math.floor(Math.random() * 200 + 10),
          inStock: Math.random() > 0.2,
          isPremium: Math.random() > 0.5,
          nutritionalInfo: {
            calories: `${Math.floor(Math.random() * 200 + 100)} kcal`,
            fat: `${(Math.random() * 20 + 5).toFixed(1)}g`,
            protein: `${(Math.random() * 10 + 5).toFixed(1)}g`,
            carbs: `${(Math.random() * 15 + 5).toFixed(1)}g`,
            fiber: `${(Math.random() * 5 + 1).toFixed(1)}g`
          },
          packagingOptions: [
            { size: '250g', price: generatePrice() * 0.5 },
            { size: '500g', price: generatePrice() },
            { size: '1kg', price: generatePrice() * 1.8 }
          ],
          estimatedDelivery: Math.floor(Math.random() * 2) + 1,
          stockStatus: Math.random() > 0.2 ? 'In Stock' : 'Limited Stock'
        };

        setProduct(mockProduct);
        fetchRelatedProducts();
        setLoading(false);
      }, 800);
    };

    // Generate mock related products
    const fetchRelatedProducts = () => {
      const mockRelated = Array(4).fill().map((_, index) => ({
        id: `rel-${index}`,
        name: generateProductName(),
        price: generatePrice(),
        image: `https://source.unsplash.com/random/400x400/?${category},${index},${Math.random()}`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        category: category,
        isPremium: Math.random() > 0.5
      }));
      
      setRelatedProducts(mockRelated);
    };

    // Helper functions to generate mock data
    function generateProductName() {
      const names = {
        'dry-fruits': ['Premium Almonds', 'Cashews', 'Pistachios', 'Dried Apricots', 'Walnuts', 'Dates', 'Raisins'],
        'spices': ['Cardamom', 'Cinnamon', 'Turmeric', 'Black Pepper', 'Saffron', 'Cumin', 'Cloves'],
        'tea': ['Darjeeling Tea', 'Green Tea', 'Assam Gold', 'Oolong Tea', 'White Tea', 'Chai Masala', 'Herbal Tea']
      };
      
      const categoryNames = names[category] || ['Premium Product'];
      const randomIndex = Math.floor(Math.random() * categoryNames.length);
      return categoryNames[randomIndex];
    }

    function generatePrice() {
      const prices = {
        'dry-fruits': Math.random() * 40 + 20,
        'spices': Math.random() * 15 + 10,
        'tea': Math.random() * 25 + 15
      };
      
      return prices[category] || 49.99;
    }

    function generateOrigin() {
      const origins = {
        'dry-fruits': ['California, USA', 'Iran', 'Turkey', 'Afghanistan', 'Australia'],
        'spices': ['Kerala, India', 'Sri Lanka', 'Madagascar', 'Tanzania', 'Vietnam'],
        'tea': ['Darjeeling, India', 'Assam, India', 'China', 'Japan', 'Sri Lanka']
      };
      
      const categoryOrigins = origins[category] || ['Imported'];
      const randomIndex = Math.floor(Math.random() * categoryOrigins.length);
      return categoryOrigins[randomIndex];
    }

    function generateDescription() {
      const descriptions = {
        'dry-fruits': 'Our premium dry fruits are carefully selected from the finest orchards around the world. They are processed using state-of-the-art technology to preserve their natural flavors, nutrients, and freshness. Perfect for healthy snacking, cooking, or as a gourmet gift.',
        'spices': 'These exotic spices are harvested at their peak maturity and processed with care to maintain their essential oils and aromatic compounds. Our spices are known for their intense flavor, vibrant color, and exceptional quality that can transform any dish into a culinary masterpiece.',
        'tea': 'Experience the perfect cup of tea with our premium tea leaves. Handpicked from the highest quality tea gardens, our teas offer a rich, aromatic experience. Each variety is carefully processed to bring out its unique character and flavor profile.'
      };
      
      return descriptions[category] || 'Premium quality product from FIGS Dubai, known for exceptional taste and quality. Our products are sourced directly from regions of origin, ensuring authenticity and freshness.';
    }

    fetchProductDetail();
  }, [category, id]);

  // Close share panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowSharePanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addToCart = () => {
    if (!product) return;
    
    // Add to cart logic would go here
    console.log(`Added ${quantity} of ${product.name} to cart`);
    
    // Show notification
    setShowCartNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleWishlist = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleSharePanel = () => {
    setShowSharePanel(!showSharePanel);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    let shareUrl;
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out ${product?.name} from Figs Dubai!`)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${product?.name} from Figs Dubai! ${url}`)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowSharePanel(false);
  };

  const createWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in purchasing "${product.name}" priced at AED ${product.price.toFixed(2)}. Could you provide more information?`
    );
    return `https://wa.me/+971123456789?text=${message}`;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < Math.floor(rating) ? 'filled' : ''} />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Loading product details...</h2>
        <p>Please wait while we prepare your premium selection</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>We couldn't find the product you're looking for.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {showCartNotification && (
        <div className="cart-notification">
          <FaCheckCircle /> Added {quantity} {quantity > 1 ? 'items' : 'item'} to your cart
        </div>
      )}
      
      <div className="breadcrumb">
        <Link to="/"><FaHome /> Home</Link>
        <span><FaChevronRight /></span>
        <Link to="/products">Products</Link>
        <span><FaChevronRight /></span>
        <Link to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>{category === 'dry-fruits' ? 'Dry Fruits' : 
         category === 'spices' ? 'Spices' : 'Tea'}</Link>
        <span><FaChevronRight /></span>
        <span className="current">{product.name}</span>
      </div>

      <div className="product-detail-container">
        <div className="product-media">
          <div className="product-showcase">
            <div className="product-main-image">
              {!imageLoaded && <div className="image-placeholder"></div>}
              <img 
                ref={imageRef}
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="main-image"
                onLoad={handleImageLoad}
                style={{ opacity: imageLoaded ? 1 : 0 }}
              />
              {product.isPremium && (
                <div className="premium-badge">
                  <FaStar /> Premium Quality
                </div>
              )}
              <button
                className="wishlist-button"
                onClick={toggleWishlist}
                aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
              <button
                className="share-button"
                onClick={toggleSharePanel}
                aria-label="Share this product"
              >
                <FaShareAlt />
              </button>
              
              {showSharePanel && (
                <div className="share-panel" ref={shareRef}>
                  <h4>Share this product</h4>
                  <div className="share-options">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="facebook-icon"
                      aria-label="Facebook"
                    >
                      <FaFacebook />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="twitter-icon"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="whatsapp-icon"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="product-thumbnails">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => {
                    setImageLoaded(false);
                    setSelectedImage(index);
                  }}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-category-label">
            {getCategoryIcon()}
            {category === 'dry-fruits' ? 'Premium Dry Fruit' : 
             category === 'spices' ? 'Gourmet Spice' : 'Specialty Tea'}
          </div>
        </div>
        
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-rating-display">
            {renderStars(product.rating)}
            <span>{product.rating}</span>
            <div className="review-count">({product.reviews} reviews)</div>
          </div>
          
          <div className="product-price">
            <span className="price-amount">AED {product.price.toFixed(2)}</span>
            <span className="price-unit">/ kg</span>
          </div>
          
          <div className="product-description-short">
            <p>{product.description.substring(0, 150)}...</p>
          </div>
          
          <div className="product-detail-specs">
            <div className="spec-group">
              <h4>Origin:</h4>
              <p>{product.specifications[0].value}</p>
            </div>
            
            <div className="spec-group">
              <h4>Quality:</h4>
              <p>{product.isPremium ? 'Premium Grade' : 'Superior Grade'}</p>
            </div>
            
            <div className="spec-group">
              <h4>Stock Status:</h4>
              <p style={{ color: product.stockStatus === 'In Stock' ? 'var(--success-color)' : 'var(--warning-color)' }}>
                {product.stockStatus}
              </p>
            </div>
            
            <div className="spec-group">
              <h4>Delivery:</h4>
              <p><FaClock style={{ marginRight: '5px', fontSize: '14px' }} /> {product.estimatedDelivery} business day{product.estimatedDelivery > 1 ? 's' : ''}</p>
            </div>
          </div>
          
          <div className="quantity-section">
            <span className="quantity-label">Quantity:</span>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={decrementQuantity} aria-label="Decrease quantity">-</button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                aria-label="Product quantity"
                className="quantity-input"
              />
              <button className="quantity-btn" onClick={incrementQuantity} aria-label="Increase quantity">+</button>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              className="add-to-cart-btn"
              onClick={addToCart}
              disabled={!product.inStock}
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <a 
              href={createWhatsAppLink()}
              className="inquiry-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Inquire on WhatsApp"
            >
              <FaWhatsapp /> Inquire
            </a>
          </div>
          
          <div className="email-inquiry">
            <a href="mailto:info@figsdubai.com" className="email-link">
              <FaEnvelope /> Email Inquiry
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
            className={`tab-btn ${activeTab === 'health-benefits' ? 'active' : ''}`}
            onClick={() => setActiveTab('health-benefits')}
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
              <p>At FIGS Dubai, we take pride in offering only the highest quality products to our customers. Our rigorous quality control ensures that every item meets our exceptional standards before reaching your hands.</p>
              <p>The {product.name} is sourced directly from {product.specifications[0].value}, ensuring authenticity and maximum freshness. It is carefully processed and packaged to preserve its natural qualities and nutritional benefits.</p>
              
              <h3>Available Packaging Options</h3>
              <div className="packaging-options">
                {product.packagingOptions.map((option, index) => (
                  <div key={index} className="packaging-option">
                    <span className="option-size">{option.size} package</span>
                    <span className="option-price">AED {option.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <h3>Nutritional Information</h3>
              <div className="nutritional-info">
                <div className="nutrient">
                  <span className="nutrient-name">Calories:</span>
                  <span className="nutrient-value">{product.nutritionalInfo.calories}</span>
                </div>
                <div className="nutrient">
                  <span className="nutrient-name">Fat:</span>
                  <span className="nutrient-value">{product.nutritionalInfo.fat}</span>
                </div>
                <div className="nutrient">
                  <span className="nutrient-name">Protein:</span>
                  <span className="nutrient-value">{product.nutritionalInfo.protein}</span>
                </div>
                <div className="nutrient">
                  <span className="nutrient-name">Carbohydrates:</span>
                  <span className="nutrient-value">{product.nutritionalInfo.carbs}</span>
                </div>
                <div className="nutrient">
                  <span className="nutrient-name">Fiber:</span>
                  <span className="nutrient-value">{product.nutritionalInfo.fiber}</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'health-benefits' && (
            <div className="benefits-tab">
              <h3>Health Benefits</h3>
              <ul className="benefits-list">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="benefit-item">
                    <FaCheckCircle className="benefit-icon" />
                    <span className="benefit-text">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="benefits-note">
                <p>Our products are carefully selected to provide maximum nutritional value while maintaining exceptional taste and quality.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div className="shipping-tab">
              <h3>Shipping Information</h3>
              <p>We offer fast and reliable shipping across Dubai and the UAE.</p>
              
              <h4>Delivery Times:</h4>
              <ul>
                <li><FaShippingFast style={{ marginRight: '8px', color: 'var(--primary-color)' }} /> Dubai: 1-2 business days</li>
                <li><FaShippingFast style={{ marginRight: '8px', color: 'var(--primary-color)' }} /> Other Emirates: 2-3 business days</li>
              </ul>
              
              <h4>Storage Instructions:</h4>
              <p><FaBox style={{ marginRight: '8px', color: 'var(--primary-color)' }} /> Store in a cool, dry place away from direct sunlight. Once opened, keep in an airtight container to maintain freshness.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="related-products">
        <h2>You Might Also Like</h2>
        <div className="related-products-grid">
          {relatedProducts.map(product => (
            <div key={product.id} className="related-product-card">
              <Link to={`/product/${category}/${product.id}`}>
                <div className="related-product-image">
                  <img src={product.image} alt={product.name} />
                  {product.isPremium && (
                    <div className="premium-badge" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                      <FaStar /> Premium
                    </div>
                  )}
                </div>
                <div className="related-product-info">
                  <h3>{product.name}</h3>
                  <div className="related-product-rating">
                    {renderStars(product.rating)}
                    <span>{product.rating}</span>
                  </div>
                  <div className="related-product-price">
                    AED {product.price.toFixed(2)}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to={`/products/${category}`} className="view-all-link">
            View All {category === 'dry-fruits' ? 'Dry Fruits' : 
                     category === 'spices' ? 'Spices' : 'Tea'} 
            <IoMdArrowForward />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 
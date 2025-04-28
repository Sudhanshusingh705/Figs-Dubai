import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaWhatsapp, FaLeaf, FaMugHot, FaShoppingCart } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import Spinner from '../components/Spinner';
import '../styles/Products.css';
import '../styles/CategoryProducts.css';
import { Helmet } from 'react-helmet-async';

// Error boundary component to catch rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Product card error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="product-error-fallback">
          <p>Could not display this product</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const TeaProducts = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const { t } = useLanguage();

  // Define WhatsApp link
  const whatsappLink = "https://wa.link/en2ho3";

  // Tea products data based on actual images in the assets/Tea folder with Dubai prices in AED
  const teaProducts = [
    {
      id: 1,
      name: 'Black Tea',
      image: '/assets/Tea/Black Tea.jpg',
      description: 'Rich and robust black tea with a full-bodied flavor. Perfect for starting your day.',
      price: 39.95,
      pricePerKg: '79.90 AED/kg',
      category: 'tea',
      origin: 'India',
      benefits: 'Rich in antioxidants, promotes heart health'
    },
    {
      id: 2,
      name: 'Chai Tea',
      image: '/assets/Tea/Chai Tea.jpg',
      description: 'Aromatic blend of black tea with spices like cardamom, cinnamon, and ginger.',
      price: 42.50,
      pricePerKg: '85.00 AED/kg',
      category: 'tea',
      origin: 'India',
      benefits: 'Aids digestion, boosts energy'
    },
    {
      id: 3,
      name: 'Chamomile Tea',
      image: '/assets/Tea/Chamomile Tea.webp',
      description: 'Soothing herbal tea with delicate floral notes, perfect for relaxation.',
      price: 37.95,
      pricePerKg: '75.90 AED/kg',
      category: 'tea',
      origin: 'Egypt',
      benefits: 'Promotes sleep, reduces stress'
    },
    {
      id: 4,
      name: 'Darjeeling Tea',
      image: '/assets/Tea/Darjeeling Tea.webp',
      description: 'The "champagne of teas" with a distinctive muscatel flavor and floral aroma.',
      price: 57.50,
      pricePerKg: '115.00 AED/kg',
      category: 'tea',
      origin: 'Darjeeling, India',
      benefits: 'Boosts immunity, aids digestion'
    },
    {
      id: 5,
      name: 'Dark Tea',
      image: '/assets/Tea/Dark Tea.webp',
      description: 'Post-fermented tea with a smooth, earthy flavor that improves with age.',
      price: 54.75,
      pricePerKg: '109.50 AED/kg',
      category: 'tea',
      origin: 'China',
      benefits: 'Aids metabolism, supports gut health'
    },
    {
      id: 6,
      name: 'Green Tea',
      image: '/assets/Tea/Green Tea.webp',
      description: 'Fresh and earthy green tea packed with antioxidants and light caffeine.',
      price: 45.95,
      pricePerKg: '91.90 AED/kg',
      category: 'tea',
      origin: 'Japan',
      benefits: 'Enhances brain function, promotes fat loss'
    },
    {
      id: 7,
      name: 'Herbal Tea',
      image: '/assets/Tea/Herbal Tea.webp',
      description: 'Caffeine-free blend of herbs and botanicals with a mild and pleasant taste.',
      price: 36.95,
      pricePerKg: '73.90 AED/kg',
      category: 'tea',
      origin: 'Various',
      benefits: 'Caffeine-free, calming properties'
    },
    {
      id: 8,
      name: 'Irani Chai',
      image: '/assets/Tea/Irani Chai.jpg',
      description: 'Creamy Persian-style tea with a unique preparation method and rich flavor.',
      price: 44.75,
      pricePerKg: '89.50 AED/kg',
      category: 'tea',
      origin: 'Iran',
      benefits: 'Energizing, digestive aid'
    },
    {
      id: 9,
      name: 'Lemongrass Tea',
      image: '/assets/Tea/Lemongrass Tea.webp',
      description: 'Citrusy and refreshing herbal tea with a subtle sweetness.',
      price: 34.95,
      pricePerKg: '69.90 AED/kg',
      category: 'tea',
      origin: 'Southeast Asia',
      benefits: 'Detoxifying, relieves anxiety'
    },
    {
      id: 10,
      name: 'Masala Chai',
      image: '/assets/Tea/Masala Chai.jpg',
      description: 'Traditional Indian spiced tea with warming spices and bold flavor.',
      price: 41.95,
      pricePerKg: '83.90 AED/kg',
      category: 'tea',
      origin: 'India',
      benefits: 'Improves circulation, supports immunity'
    },
    {
      id: 11,
      name: 'Matcha Tea',
      image: '/assets/Tea/Matcha Tea.jpg',
      description: 'Stone-ground Japanese green tea powder with a vibrant color and rich umami flavor.',
      price: 64.95,
      pricePerKg: '129.90 AED/kg',
      category: 'tea',
      origin: 'Japan',
      benefits: 'Increases energy, improves focus'
    },
    {
      id: 12,
      name: 'Mate Tea',
      image: '/assets/Tea/Mate Tea.png',
      description: 'South American caffeinated beverage with a grassy, slightly bitter flavor.',
      price: 47.95,
      pricePerKg: '95.90 AED/kg',
      category: 'tea',
      origin: 'South America',
      benefits: 'Natural stimulant, boosts metabolism'
    }
  ];
  
  useEffect(() => {
    // Simulate loading products
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add custom styles to the component
  useEffect(() => {
    // Inject custom styles for this page
    const style = document.createElement('style');
    style.textContent = `
      .tea-products-page {
        background-color: #f8fcff;
        color: #333;
      }
      
      .tea-hero {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                          url('/assets/tea-background.jpg');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        position: relative;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
        margin-bottom: 2rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
      
      .tea-hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(14, 65, 108, 0.8) 0%, rgba(72, 128, 189, 0.7) 100%);
      }
      
      .tea-hero-content {
        position: relative;
        z-index: 2;
        max-width: 800px;
        padding: 2rem;
      }
      
      .tea-hero h1 {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        letter-spacing: 1px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        font-weight: 800;
      }
      
      .tea-hero p {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        font-weight: 400;
      }
      
      .tea-badge {
        position: absolute;
        right: 15px;
        top: 15px;
        background: linear-gradient(135deg, #1a6eb1 0%, #3498db 100%);
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        z-index: 2;
        transition: all 0.3s ease;
      }
      
      .tea-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(0, 0, 0, 0.05);
      }
      
      .tea-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
        border-color: rgba(52, 152, 219, 0.2);
      }
      
      .tea-card-image {
        height: 200px;
        overflow: hidden;
        position: relative;
      }
      
      .tea-card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .tea-card:hover .tea-card-image img {
        transform: scale(1.05);
      }
      
      .tea-card-details {
        padding: 1.5rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      
      .tea-card h3 {
        font-size: 1.4rem;
        color: #2c3e50;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }
      
      .tea-card .tea-description {
        color: #555;
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        flex-grow: 1;
      }
      
      .tea-card .tea-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        color: #7f8c8d;
        margin-bottom: 0.8rem;
      }
      
      .tea-card .tea-origin, .tea-card .tea-benefits {
        display: flex;
        align-items: center;
      }
      
      .tea-card .tea-origin svg, .tea-card .tea-benefits svg {
        margin-right: 5px;
        color: #3498db;
      }
      
      .tea-card .tea-price {
        font-size: 1.5rem;
        color: #1a6eb1;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      
      .tea-card .tea-price-per-kg {
        font-size: 0.9rem;
        color: #7f8c8d;
        margin-bottom: 1rem;
      }
      
      .tea-search {
        background: white;
        border-radius: 30px;
        padding: 0.8rem 1.5rem;
        display: flex;
        align-items: center;
        max-width: 500px;
        margin: 0 auto 2rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(52, 152, 219, 0.2);
      }
      
      .tea-search input {
        border: none;
        background: transparent;
        flex-grow: 1;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
        color: #2c3e50;
      }
      
      .tea-search .search-icon {
        color: #3498db;
        font-size: 1.2rem;
      }
      
      .tea-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
        padding: 1rem;
      }
      
      .tea-section {
        padding: 2rem 0;
      }
      
      .tea-section-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .tea-section-header h2 {
        font-size: 2.2rem;
        color: #2c3e50;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }
      
      .tea-underline {
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, #1a6eb1, #3498db);
        margin: 0.8rem auto 1.5rem;
        border-radius: 2px;
      }
      
      .tea-section-header p {
        color: #7f8c8d;
        font-size: 1.1rem;
      }
      
      .tea-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }
      
      .tea-whatsapp-btn {
        background: linear-gradient(135deg, #25d366 0%, #128C7E 100%);
        color: white;
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s ease;
        flex-grow: 1;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border: none;
      }
      
      .tea-whatsapp-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
      }
      
      .tea-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 0;
      }
      
      .tea-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(52, 152, 219, 0.2);
        border-radius: 50%;
        border-top-color: #3498db;
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 1rem;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .tea-no-products {
        background: white;
        border-radius: 12px;
        padding: 3rem 2rem;
        text-align: center;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 3rem auto;
      }
      
      .tea-no-products h3 {
        font-size: 1.8rem;
        color: #2c3e50;
        margin-bottom: 1rem;
      }
      
      .tea-no-products p {
        color: #7f8c8d;
        margin-bottom: 1.5rem;
      }
      
      .tea-reset-btn {
        background: #3498db;
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .tea-reset-btn:hover {
        background: #1a6eb1;
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .tea-hero {
          height: 400px;
        }
        
        .tea-hero h1 {
          font-size: 2.5rem;
        }
        
        .tea-hero p {
          font-size: 1.2rem;
        }
        
        .tea-grid {
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
          padding: 0.5rem;
        }
      }
      
      @media (max-width: 480px) {
        .tea-hero {
          height: 350px;
        }
        
        .tea-hero h1 {
          font-size: 2rem;
        }
        
        .tea-hero p {
          font-size: 1rem;
        }
        
        .tea-grid {
          grid-template-columns: 1fr;
          gap: 1.2rem;
        }
        
        .tea-card-image {
          height: 180px;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const filteredProducts = teaProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
  
  // Product card component
  const ProductCard = ({ product, index }) => {
    const [imageError, setImageError] = useState(false);
    const isHovered = hoveredCard === index;

    const handleImageError = () => {
      console.error(`Image error for product: ${product.name}, path: ${product.image}`);
      setImageError(true);
    };

    // Handle WhatsApp enquiry
    const handleWhatsAppClick = () => {
      // You can add analytics tracking here if needed
      window.open(whatsappLink, '_blank');
    };

    return (
      <div 
        className="tea-card"
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="tea-card-image">
          {!imageError ? (
            <img 
              src={getImagePath(product.image)} 
              alt={product.name} 
              onError={handleImageError}
            />
          ) : (
            <div className="fallback-image">
              <span>{product.name[0]}</span>
            </div>
          )}
          <div className="tea-badge">
            Premium Tea
          </div>
        </div>
        <div className="tea-card-details">
          <h3>{product.name}</h3>
          <p className="tea-description">{product.description}</p>
          
          <div className="tea-meta">
            <div className="tea-origin">
              <FaLeaf /> {product.origin}
            </div>
            <div className="tea-benefits">
              <FaMugHot /> Health Benefits
            </div>
          </div>
          
          <div className="tea-price">{product.price.toFixed(2)} AED</div>
          <div className="tea-price-per-kg">{product.pricePerKg}</div>
          
          <div className="tea-actions">
            <a 
              href={whatsappLink}
              className="tea-whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              <FaWhatsapp className="whatsapp-icon" /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Wrap each product card in an error boundary
  const SafeProductCard = (props) => {
    return (
      <ErrorBoundary>
        <ProductCard {...props} />
      </ErrorBoundary>
    );
  };
  
  return (
    <>
      <Helmet>
        <title>Figs Dubai | Tea</title>
        <meta name="description" content="Shop premium tea at FIGS Dubai (Future Indo Global Services Dubai). Luxury blends, green tea, black tea, and more delivered worldwide." />
        <meta name="keywords" content="FIGSDUBAI, figsdubai, figs dubai, Future indo global services dubai, tea, green tea, black tea, luxury tea" />
        <meta property="og:title" content="Figs Dubai | Tea" />
        <meta property="og:description" content="Shop premium tea at FIGS Dubai. Luxury blends, green tea, black tea, and more delivered worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://figsdubai.com/products/tea" />
        <meta property="og:image" content="/images/hero-bg.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Figs Dubai | Tea" />
        <meta name="twitter:description" content="Shop premium tea at FIGS Dubai. Luxury blends, green tea, black tea, and more delivered worldwide." />
        <meta name="twitter:image" content="/images/hero-bg.jpg" />
      </Helmet>
      <div className="tea-products-page">
        <div className="tea-hero">
          <div className="tea-hero-content">
            <h1>Premium Tea Collection</h1>
            <p>Exceptional teas sourced from the world's finest gardens for perfect brewing</p>
          </div>
        </div>
        
        <div className="tea-search">
          <input
            type="text"
            placeholder="Search our premium tea collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
        
        {loading ? (
          <div className="tea-loading">
            <div className="tea-spinner"></div>
            <p>Brewing the perfect selection of teas for you...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="tea-section">
            <div className="tea-section-header">
              <h2>Luxury Tea Selection</h2>
              <div className="tea-underline"></div>
              <p>Handcrafted teas for the perfect brew, sourced from the world's finest tea gardens</p>
            </div>
            
            <div className="tea-grid">
              {filteredProducts.map((product, index) => (
                <SafeProductCard key={`tea-${product.id}`} product={product} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="tea-no-products">
            <h3>No teas found</h3>
            <p>We couldn't find any teas matching your criteria.</p>
            {searchTerm && (
              <p>Your search for "<strong>{searchTerm}</strong>" returned no results.</p>
            )}
            <button 
              className="tea-reset-btn" 
              onClick={() => setSearchTerm('')}
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TeaProducts; 
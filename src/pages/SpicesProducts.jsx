import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaWhatsapp, FaLeaf, FaPepperHot, FaRegStar, FaStar, FaInfoCircle, FaStore } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import Spinner from '../components/Spinner';
import '../styles/Products.css';
import '../styles/CategoryProducts.css';  // Add CategoryProducts.css for additional styling
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

const SpicesProducts = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const { t } = useLanguage();

  // Define WhatsApp link
  const whatsappLink = "https://wa.link/en2ho3";

  // Spice products data based on actual images in the assets/Spices folder
  // Prices updated to reflect current Dubai market rates in AED
  const spiceProducts = [
    {
      id: 1,
      name: 'Anise',
      image: '/assets/Spices/Anise.webp',
      description: 'Aromatic spice with a licorice-like flavor, popular in both sweet and savory dishes across many cuisines.',
      price: 25.50,
      pricePerKg: '51.00 AED/kg',
      category: 'spices',
      origin: 'Syria',
      benefits: 'Aids digestion, treats respiratory issues'
    },
    {
      id: 2,
      name: 'Asafoetida',
      image: '/assets/Spices/Asafoetida.webp',
      description: 'Pungent spice used in small amounts to add a savory, umami flavor to dishes, especially in Indian cuisine.',
      price: 31.75,
      pricePerKg: '63.50 AED/kg',
      category: 'spices',
      origin: 'Afghanistan',
      benefits: 'Improves digestion, reduces bloating'
    },
    {
      id: 3,
      name: 'Basil',
      image: '/assets/Spices/Basil.jpg',
      description: 'Aromatic herb with a sweet, slightly peppery flavor, essential in Mediterranean and many Asian cuisines.',
      price: 18.75,
      pricePerKg: '37.50 AED/kg',
      category: 'spices',
      origin: 'Mediterranean',
      benefits: 'Anti-inflammatory, rich in antioxidants'
    },
    {
      id: 4,
      name: 'Bay Leaf',
      image: '/assets/Spices/Bay leaf.jpg',
      description: 'Aromatic leaf used to flavor soups, stews, and braises, removed before serving.',
      price: 15.00,
      pricePerKg: '30.00 AED/kg',
      category: 'spices',
      origin: 'Mediterranean',
      benefits: 'Aids digestion, rich in vitamins A and C'
    },
    {
      id: 5,
      name: 'Black Cardamom',
      image: '/assets/Spices/Black cardamom.webp',
      description: 'Smoky, robust spice used in savory dishes and garam masala blends in Indian cuisine.',
      price: 45.95,
      pricePerKg: '91.90 AED/kg',
      category: 'spices',
      origin: 'India',
      benefits: 'Improves digestion, antibacterial properties'
    },
    {
      id: 6,
      name: 'Black Cumin',
      image: '/assets/Spices/Black cumin.webp',
      description: 'Earthy, slightly bitter spice used in Middle Eastern, Indian, and North African cuisines.',
      price: 24.15,
      pricePerKg: '48.30 AED/kg',
      category: 'spices',
      origin: 'Middle East',
      benefits: 'Immune booster, rich in antioxidants'
    },
    {
      id: 7,
      name: 'Black Pepper',
      image: '/assets/Spices/Black pepper.webp',
      description: 'The world\'s most traded spice, adding heat and depth to countless dishes across global cuisines.',
      price: 22.50,
      pricePerKg: '45.00 AED/kg',
      category: 'spices',
      origin: 'Vietnam',
      benefits: 'Improves digestion, rich in antioxidants'
    },
    {
      id: 8,
      name: 'Caraway',
      image: '/assets/Spices/Caraway.webp',
      description: 'Aromatic seeds with a distinctive earthy anise-like flavor, popular in European cuisines.',
      price: 16.85,
      pricePerKg: '33.70 AED/kg',
      category: 'spices',
      origin: 'Europe',
      benefits: 'Aids digestion, soothes stomach issues'
    },
    {
      id: 9,
      name: 'Cardamom',
      image: '/assets/Spices/Cardamom.webp',
      description: 'Intensely aromatic spice with a complex sweet-spicy flavor, used in both sweet and savory dishes.',
      price: 37.50,
      pricePerKg: '75.00 AED/kg',
      category: 'spices',
      origin: 'India',
      benefits: 'Aids digestion, freshens breath'
    },
    {
      id: 10,
      name: 'Carom Seeds',
      image: '/assets/Spices/Carom seeds.webp',
      description: 'Pungent, aromatic seeds with thyme-like flavor, used in Indian breads and savory dishes.',
      price: 20.75,
      pricePerKg: '41.50 AED/kg',
      category: 'spices',
      origin: 'India',
      benefits: 'Improves digestion, relieves gas'
    },
    {
      id: 11,
      name: 'Coriander',
      image: '/assets/Spices/Coriander.jpg',
      description: 'Fresh herb with bright, citrusy flavor, used as garnish and ingredient in many world cuisines.',
      price: 14.95,
      pricePerKg: '29.90 AED/kg',
      category: 'spices',
      origin: 'Mediterranean',
      benefits: 'Rich in antioxidants, aids digestion'
    },
    {
      id: 12,
      name: 'Coriander Seed',
      image: '/assets/Spices/Coriander seed.webp',
      description: 'Warm, citrusy spice used whole or ground in countless dishes across global cuisines.',
      price: 16.25,
      pricePerKg: '32.50 AED/kg',
      category: 'spices',
      origin: 'Morocco',
      benefits: 'Lowers cholesterol, rich in antioxidants'
    },
    {
      id: 13,
      name: 'Cumin',
      image: '/assets/Spices/Cumin.jpg',
      description: 'Earthy, warming spice essential in Middle Eastern, Indian, Mexican, and many other cuisines.',
      price: 21.25,
      pricePerKg: '42.50 AED/kg',
      category: 'spices',
      origin: 'Syria',
      benefits: 'Improves digestion, rich in iron'
    },
    {
      id: 14,
      name: 'Curry Leaves',
      image: '/assets/Spices/Curry leaves.jpg',
      description: 'Aromatic leaves with a unique citrus-like flavor, essential in South Indian cuisine.',
      price: 18.50,
      pricePerKg: '37.00 AED/kg',
      category: 'spices',
      origin: 'India',
      benefits: 'Lowers cholesterol, improves digestion'
    },
    {
      id: 15,
      name: 'Fennel',
      image: '/assets/Spices/Fennel.webp',
      description: 'Sweet, anise-flavored seeds used in both sweet and savory dishes across many cuisines.',
      price: 19.95,
      pricePerKg: '39.90 AED/kg',
      category: 'spices',
      origin: 'Mediterranean',
      benefits: 'Freshens breath, aids digestion'
    },
    {
      id: 16,
      name: 'Fenugreek',
      image: '/assets/Spices/Fenugreek.jpg',
      description: 'Bitter, maple-like flavor that\'s essential in Indian and Middle Eastern cuisines.',
      price: 16.85,
      pricePerKg: '33.70 AED/kg',
      category: 'spices',
      origin: 'India',
      benefits: 'Lowers blood sugar, boosts milk production'
    },
    {
      id: 17,
      name: 'Garam Masala',
      image: '/assets/Spices/Garam Masala.webp',
      description: 'Warming spice blend featuring cardamom, cinnamon, cloves, and other spices, essential in Indian cuisine.',
      price: 29.95,
      pricePerKg: '59.90 AED/kg',
      category: 'spices',
      origin: 'India',
      benefits: 'Aids digestion, improves metabolism'
    },
    {
      id: 18,
      name: 'Ginger',
      image: '/assets/Spices/Ginger.jpg',
      description: 'Pungent, spicy root used fresh or dried in cuisines worldwide, especially Asian and Caribbean dishes.',
      price: 18.75,
      pricePerKg: '37.50 AED/kg',
      category: 'spices',
      origin: 'Asia',
      benefits: 'Anti-inflammatory, boosts immunity'
    },
    {
      id: 19,
      name: 'Nutmeg',
      image: '/assets/Spices/Nutmeg.webp',
      description: 'Warm, aromatic spice used in sweet dishes, baked goods, and savory foods like potato dishes.',
      price: 33.85,
      pricePerKg: '67.70 AED/kg',
      category: 'spices',
      origin: 'Indonesia',
      benefits: 'Improves sleep, aids digestion'
    },
    {
      id: 20,
      name: 'Red Chili Powder',
      image: '/assets/Spices/Red chili powder (lal mirch).webp',
      description: 'Vibrant, hot spice made from ground dried chili peppers, essential in many world cuisines.',
      price: 20.75,
      pricePerKg: '41.50 AED/kg',
      category: 'spices',
      origin: 'Mexico',
      benefits: 'Boosts metabolism, pain reliever'
    },
    {
      id: 21,
      name: 'Tej Patta',
      image: '/assets/Spices/Tej patta.jpg',
      description: 'Indian bay leaf with a more complex cinnamon-like flavor, used in many North Indian dishes.',
      price: 16.25,
      pricePerKg: '32.50 AED/kg',
      category: 'spices',
      origin: 'India',
      benefits: 'Improves digestion, reduces inflammation'
    },
    {
      id: 22,
      name: 'Turmeric',
      image: '/assets/Spices/Turmeric.webp',
      description: 'Brilliant yellow spice with earthy flavor, used for color and health benefits in many cuisines.',
      price: 24.50,
      pricePerKg: '49.00 AED/kg',
      category: 'spices',
      origin: 'India',
      benefits: 'Anti-inflammatory, antioxidant powerhouse'
    }
  ];
  
  useEffect(() => {
    // Simulate loading products
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add custom styles for blue and white theme
  useEffect(() => {
    // Inject custom styles for this page
    const style = document.createElement('style');
    style.textContent = `
      .spices-page {
        background-color: #f8fcff;
        color: #333;
      }
      
      .spices-hero {
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                          url('/assets/spices-background.jpg');
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
      
      .spices-hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(14, 65, 108, 0.8) 0%, rgba(72, 128, 189, 0.7) 100%);
      }
      
      .spices-hero-content {
        position: relative;
        z-index: 2;
        max-width: 800px;
        padding: 2rem;
      }
      
      .spices-hero h1 {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        letter-spacing: 1px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        font-weight: 800;
      }
      
      .spices-hero p {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        font-weight: 400;
      }
      
      .spices-badge {
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
      
      .spice-card {
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
      
      .spice-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
        border-color: rgba(52, 152, 219, 0.2);
      }
      
      .spice-card-image {
        height: 200px;
        overflow: hidden;
        position: relative;
      }
      
      .spice-card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .spice-card:hover .spice-card-image img {
        transform: scale(1.05);
      }
      
      .spice-card-details {
        padding: 1.5rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      
      .spice-card h3 {
        font-size: 1.4rem;
        color: #2c3e50;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }
      
      .spice-card .spice-description {
        color: #555;
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        flex-grow: 1;
      }
      
      .spice-card .spice-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        color: #7f8c8d;
        margin-bottom: 0.8rem;
      }
      
      .spice-card .spice-origin, .spice-card .spice-benefits {
        display: flex;
        align-items: center;
      }
      
      .spice-card .spice-origin svg, .spice-card .spice-benefits svg {
        margin-right: 5px;
        color: #3498db;
      }
      
      .spice-card .spice-price {
        font-size: 1.5rem;
        color: #1a6eb1;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      
      .spice-card .spice-price-per-kg {
        font-size: 0.9rem;
        color: #7f8c8d;
        margin-bottom: 1rem;
      }
      
      .spices-search {
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
      
      .spices-search input {
        border: none;
        background: transparent;
        flex-grow: 1;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
        color: #2c3e50;
      }
      
      .spices-search .search-icon {
        color: #3498db;
        font-size: 1.2rem;
      }
      
      .spices-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
        padding: 1rem;
      }
      
      .spices-section {
        padding: 2rem 0;
      }
      
      .spices-section-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .spices-section-header h2 {
        font-size: 2.2rem;
        color: #2c3e50;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }
      
      .spices-underline {
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, #1a6eb1, #3498db);
        margin: 0.8rem auto 1.5rem;
        border-radius: 2px;
      }
      
      .spices-section-header p {
        color: #7f8c8d;
        font-size: 1.1rem;
      }
      
      .spices-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }
      
      .spices-whatsapp-btn {
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
      
      .spices-whatsapp-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
      }
      
      .spices-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 0;
      }
      
      .spices-spinner {
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
      
      .spices-no-products {
        background: white;
        border-radius: 12px;
        padding: 3rem 2rem;
        text-align: center;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 3rem auto;
      }
      
      .spices-no-products h3 {
        font-size: 1.8rem;
        color: #2c3e50;
        margin-bottom: 1rem;
      }
      
      .spices-no-products p {
        color: #7f8c8d;
        margin-bottom: 1.5rem;
      }
      
      .spices-reset-btn {
        background: #3498db;
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .spices-reset-btn:hover {
        background: #1a6eb1;
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .spices-hero {
          height: 400px;
        }
        
        .spices-hero h1 {
          font-size: 2.5rem;
        }
        
        .spices-hero p {
          font-size: 1.2rem;
        }
        
        .spices-grid {
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
          padding: 0.5rem;
        }
      }
      
      @media (max-width: 480px) {
        .spices-hero {
          height: 350px;
        }
        
        .spices-hero h1 {
          font-size: 2rem;
        }
        
        .spices-hero p {
          font-size: 1rem;
        }
        
        .spices-grid {
          grid-template-columns: 1fr;
          gap: 1.2rem;
        }
        
        .spice-card-image {
          height: 180px;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const filteredProducts = spiceProducts.filter(product =>
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
        className="spice-card"
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="spice-card-image">
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
          <div className="spices-badge">
            Premium Spice
          </div>
        </div>
        <div className="spice-card-details">
          <h3>{product.name}</h3>
          <p className="spice-description">{product.description}</p>
          
          <div className="spice-meta">
            <div className="spice-origin">
              <FaStore /> {product.origin}
            </div>
            <div className="spice-benefits">
              <FaLeaf /> Health Benefits
            </div>
          </div>
          
          <div className="spice-price">{product.price.toFixed(2)} AED</div>
          <div className="spice-price-per-kg">{product.pricePerKg}</div>
          
          <div className="spices-actions">
            <a 
              href={whatsappLink}
              className="spices-whatsapp-btn"
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
        <title>Figs Dubai | Spices</title>
        <meta name="description" content="Shop premium spices at FIGS Dubai (Future Indo Global Services Dubai). Authentic cardamom, saffron, cinnamon, and more delivered worldwide." />
        <meta name="keywords" content="FIGSDUBAI, figsdubai, figs dubai, Future indo global services dubai, spices, cardamom, saffron, cinnamon" />
        <meta property="og:title" content="Figs Dubai | Spices" />
        <meta property="og:description" content="Shop premium spices at FIGS Dubai. Authentic cardamom, saffron, cinnamon, and more delivered worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://figsdubai.com/products/spices" />
        <meta property="og:image" content="/images/hero-bg.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Figs Dubai | Spices" />
        <meta name="twitter:description" content="Shop premium spices at FIGS Dubai. Authentic cardamom, saffron, cinnamon, and more delivered worldwide." />
        <meta name="twitter:image" content="/images/hero-bg.jpg" />
      </Helmet>
      <div className="spices-page">
        <div className="spices-hero">
          <div className="spices-hero-content">
            <h1>Premium Spices Collection</h1>
            <p>Exceptional spices sourced from around the world to enhance your culinary creations</p>
          </div>
        </div>
        
        <div className="spices-search">
          <input
            type="text"
            placeholder="Search our premium spice collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
        
        {loading ? (
          <div className="spices-loading">
            <div className="spices-spinner"></div>
            <p>Preparing our finest spices selection for you...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="spices-section">
            <div className="spices-section-header">
              <h2>Luxury Spice Selection</h2>
              <div className="spices-underline"></div>
              <p>Handpicked premium spices from the world's finest growing regions</p>
            </div>
            
            <div className="spices-grid">
              {filteredProducts.map((product, index) => (
                <SafeProductCard key={`spice-${product.id}`} product={product} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="spices-no-products">
            <h3>No spices found</h3>
            <p>We couldn't find any spices matching your search criteria.</p>
            {searchTerm && (
              <p>Your search for "<strong>{searchTerm}</strong>" returned no results.</p>
            )}
            <button 
              className="spices-reset-btn" 
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

export default SpicesProducts; 
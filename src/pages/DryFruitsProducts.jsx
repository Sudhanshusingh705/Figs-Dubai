import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaWhatsapp, FaLeaf, FaSeedling, FaStar, FaRegStar, FaInfoCircle, FaStore, FaMapMarkerAlt } from 'react-icons/fa';
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

// Function to ensure all products have valid data
// Add default values for any missing fields
const ensureValidProducts = (products) => {
  return products.map(product => {
    // Create a new object with default values for all required fields
    return {
      id: product.id || Math.random().toString(36).substr(2, 9),
      name: product.name || 'Unnamed Product',
      // Provide default image path if missing
      image: product.image || '/assets/placeholder.jpg',
      // Default description if missing
      description: product.description || 'No description available',
      // Default price if missing or invalid
      price: (product.price && !isNaN(parseFloat(product.price))) 
        ? parseFloat(product.price) 
        : 0.00,
      // Default category if missing
      category: product.category || 'dry-fruits',
      // Preserve any other fields that might exist
      ...product
    };
  });
};

const DryFruitsProducts = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const { t } = useLanguage();

  // Define WhatsApp link
  const whatsappLink = "https://wa.link/en2ho3";

  // Sample dry fruits data
  const dryFruitsRaw = [
    {
      id: 'df1',
      name: 'Almonds',
      price: 45.99,
      image: '/assets/Dry Fruits/Almonds.png',
      description: 'Sourced from the finest orchards, our almonds are known for their exceptional taste and quality.',
      category: 'dry-fruits',
      origin: 'California, USA',
      benefits: 'Rich in vitamin E, protein and healthy fats',
      rating: 5
    },
    {
      id: 'df2',
      name: 'Walnuts Akhrot',
      price: 52.99,
      image: '/assets/Dry Fruits/Walnuts Akhrot.png',
      description: 'Directly imported from the valleys of Kashmir, these walnuts are packed with nutrients and flavor.',
      category: 'dry-fruits',
      origin: 'Kashmir, India',
      benefits: 'Contains omega-3 fatty acids and antioxidants',
      rating: 5
    },
    {
      id: 'df3',
      name: 'Dates Khajoor',
      price: 38.50,
      image: '/assets/Dry Fruits/Dates Khajoor.png',
      description: 'Known as the king of dates, our Medjool dates are naturally sweet and incredibly nutritious.',
      category: 'dry-fruits',
      origin: 'Middle East',
      benefits: 'Rich in potassium, fiber and natural energy',
      rating: 4
    },
    {
      id: 'df4',
      name: 'Pistachios Pista',
      price: 65.99,
      image: '/assets/Dry Fruits/Pistachios Pista.png',
      description: 'Premium pistachios from Iran, renowned for their distinctive flavor and beautiful green color.',
      category: 'dry-fruits',
      origin: 'Iran',
      benefits: 'High in antioxidants and heart-healthy fats',
      rating: 5
    },
    {
      id: 'df5',
      name: 'Apricots Khubani',
      price: 35.75,
      image: '/assets/Dry Fruits/Apricots Khubani.png',
      description: 'Soft and tangy dried apricots, perfect for snacking or adding to desserts and salads.',
      category: 'dry-fruits',
      origin: 'Turkey',
      benefits: 'High in vitamin A, iron and antioxidants',
      rating: 4
    },
    {
      id: 'df6',
      name: 'Betel Nut',
      price: 28.99,
      image: '/assets/Dry Fruits/Betel Nut.png',
      description: 'Chewy and mildly sweet betel nuts, often used in traditional practices and cultural ceremonies.',
      category: 'dry-fruits',
      origin: 'Southeast Asia',
      benefits: 'Used in traditional practices',
      rating: 3
    },
    {
      id: 'df7',
      name: 'Brazil Nuts',
      price: 48.50,
      image: '/assets/Dry Fruits/Brazil Nuts.png',
      description: 'Rich and creamy Brazil nuts, packed with selenium and essential nutrients for a healthy diet.',
      category: 'dry-fruits',
      origin: 'Brazil',
      benefits: 'High in selenium and healthy fats',
      rating: 4
    },
    {
      id: 'df8',
      name: 'Cashews Kaju',
      price: 58.99,
      image: '/assets/Dry Fruits/Cashews Kaju.png',
      description: 'Buttery and crunchy cashews, ideal for snacking or enhancing both savory and sweet dishes.',
      category: 'dry-fruits',
      origin: 'India',
      benefits: 'Rich in minerals and heart-healthy monounsaturated fats',
      rating: 5
    },
    {
      id: 'df9',
      name: 'Chestnut',
      price: 42.00,
      image: '/assets/Dry Fruits/Chestnut.png',
      description: 'Sweet and nutty chestnuts, perfect for roasting or incorporating into holiday recipes.',
      category: 'dry-fruits',
      origin: 'Europe',
      benefits: 'Low in fat and high in complex carbohydrates',
      rating: 4
    },
    {
      id: 'df10',
      name: 'Chia Seeds',
      price: 32.99,
      image: '/assets/Dry Fruits/Chia Seeds.png',
      description: 'Tiny but mighty chia seeds, loaded with omega-3s and fiber for a nutritious boost.',
      category: 'dry-fruits',
      origin: 'Mexico',
      benefits: 'Rich in omega-3 fatty acids and fiber',
      rating: 5
    },
    {
      id: 'df11',
      name: 'Cinnamnon',
      price: 25.50,
      image: '/assets/Dry Fruits/Cinnamon.jpg',
      description: 'Warm and sweet cinnamon, a versatile spice for baking, beverages, and savory dishes.',
      category: 'dry-fruits',
      origin: 'Sri Lanka',
      benefits: 'Has anti-inflammatory properties',
      rating: 4
    },
    {
      id: 'df12',
      name: 'Clove',
      price: 30.00,
      image: '/assets/Dry Fruits/Cloves.jpg',
      description: 'Aromatic and pungent cloves, used sparingly to add depth to curries, stews, and baked goods.',
      category: 'dry-fruits',
      origin: 'Indonesia',
      benefits: 'Contains antibacterial properties',
      rating: 4
    },
    {
      id: 'df13',
      name: 'Corn Nuts',
      price: 22.99,
      image: '/assets/Dry Fruits/Corn Nuts.png',
      description: 'Crunchy and salty corn nuts, a popular snack with bold flavors and a satisfying texture.',
      category: 'dry-fruits',
      origin: 'South America',
      benefits: 'Good source of fiber and protein',
      rating: 3
    },
    {
      id: 'df14',
      name: 'Cudpahnut',
      price: 60.99,
      image: '/assets/Dry Fruits/Cudpahnut.png',
      description: 'Rare and flavorful Cudpah nuts, prized for their unique taste and health benefits.',
      category: 'dry-fruits',
      origin: 'South Asia',
      benefits: 'Contains essential oils and nutrients',
      rating: 4
    },
    {
      id: 'df15',
      name: 'Dried Coconut',
      price: 34.99,
      image: '/assets/Dry Fruits/Dried Coconut.png',
      description: 'Shredded dried coconut with a tropical flavor, great for desserts, smoothies, and granola.',
      category: 'dry-fruits',
      origin: 'Southeast Asia',
      benefits: 'High in healthy medium-chain fatty acids',
      rating: 4
    },
    {
      id: 'df16',
      name: 'Dried Kiwi',
      price: 40.50,
      image: '/assets/Dry Fruits/Dried Kiwi.png',
      description: 'Tangy and chewy dried kiwi slices, bursting with vitamin C and a zesty flavor.',
      category: 'dry-fruits',
      origin: 'New Zealand',
      benefits: 'Rich in vitamin C and fiber',
      rating: 4
    },
    {
      id: 'df17',
      name: 'Dried Mango',
      price: 36.99,
      image: '/assets/Dry Fruits/Dried Mango.png',
      description: 'Sweet and tangy dried mango, a tropical treat packed with vitamins and antioxidants.',
      category: 'dry-fruits',
      origin: 'Philippines',
      benefits: 'High in vitamin A and antioxidants',
      rating: 5
    },
    {
      id: 'df18',
      name: 'Dry Plums',
      price: 31.99,
      image: '/assets/Dry Fruits/Dry Plums.png',
      description: 'Soft and sweet dried plums, known for their digestive health benefits and rich flavor.',
      category: 'dry-fruits',
      origin: 'California, USA',
      benefits: 'Supports digestive health',
      rating: 4
    },
    {
      id: 'df19',
      name: 'Fennel',
      price: 24.99,
      image: '/assets/Dry Fruits/Fennel.png',
      description: 'Licorice-flavored fennel seeds, used as a mouth freshener and digestive aid in Indian cuisine.',
      category: 'dry-fruits',
      origin: 'Mediterranean',
      benefits: 'Aids digestion and freshens breath',
      rating: 4
    },
    {
      id: 'df20',
      name: 'Figs Anjeer',
      price: 39.50,
      image: '/assets/Dry Fruits/Figs Anjeer.png',
      description: 'Soft and honey-sweet dried figs, packed with fiber and nutrients for a healthy snack.',
      category: 'dry-fruits',
      origin: 'Turkey',
      benefits: 'High in fiber and essential minerals',
      rating: 5
    },
    {
      id: 'df21',
      name: 'Flax Seeds',
      price: 27.99,
      image: '/assets/Dry Fruits/Flax Seeds.png',
      description: 'Nutty flax seeds, rich in omega-3 fatty acids and fiber, perfect for smoothies and baking.',
      category: 'dry-fruits',
      origin: 'Canada',
      benefits: 'Rich in omega-3 fatty acids and lignans',
      rating: 4
    },
    {
      id: 'df22',
      name: 'Fox Nuts Makhana',
      price: 44.99,
      image: '/assets/Dry Fruits/Fox Nuts Makhana.png',
      description: 'Light and crunchy fox nuts, a healthy snack roasted or used in Indian sweets and curries.',
      category: 'dry-fruits',
      origin: 'India',
      benefits: 'Low in calories, high in protein',
      rating: 4
    },
    {
      id: 'df23',
      name: 'Hazelnuts Pahadi Badam',
      price: 54.99,
      image: '/assets/Dry Fruits/Hazelnuts Pahadi Badam.png',
      description: 'Rich and buttery hazelnuts, a delicious addition to desserts, snacks, and nut mixes.',
      category: 'dry-fruits',
      origin: 'Turkey',
      benefits: 'Rich in healthy fats and vitamin E',
      rating: 5
    },
    {
      id: 'df24',
      name: 'Macadamia Nuts',
      price: 62.99,
      image: '/assets/Dry Fruits/Macadamia Nuts.png',
      description: 'Creamy and indulgent macadamia nuts, perfect for snacking or baking into cookies.',
      category: 'dry-fruits',
      origin: 'Australia',
      benefits: 'Rich in monounsaturated fats and minerals',
      rating: 5
    },
    {
      id: 'df25',
      name: 'Pecans',
      price: 50.99,
      image: '/assets/Dry Fruits/Pecans.png',
      description: 'Buttery and slightly sweet pecans, a favorite in pies, salads, and roasted snacks.',
      category: 'dry-fruits',
      origin: 'USA',
      benefits: 'Rich in antioxidants and healthy fats',
      rating: 4
    },
    {
      id: 'df26',
      name: 'Pili Nut',
      price: 70.99,
      image: '/assets/Dry Fruits/Pili Nut.png',
      description: 'Rich and creamy pili nuts, a rare superfood packed with healthy fats and antioxidants.',
      category: 'dry-fruits',
      origin: 'Philippines',
      benefits: 'High in magnesium and vitamin E',
      rating: 4
    },
    {
      id: 'df27',
      name: 'Pine Nuts Chilgoza',
      price: 85.99,
      image: '/assets/Dry Fruits/Pine Nuts Chilgoza.png',
      description: 'Delicate and nutty pine nuts, essential for pesto, salads, and gourmet dishes.',
      category: 'dry-fruits',
      origin: 'Pakistan',
      benefits: 'Contains protein, iron and healthy fats',
      rating: 5
    },
    {
      id: 'df28',
      name: 'Poppy Seeds',
      price: 29.99,
      image: '/assets/Dry Fruits/Poppy Seeds.png',
      description: 'Tiny poppy seeds with a mild nutty flavor, used in baking, curries, and garnishes.',
      category: 'dry-fruits',
      origin: 'Turkey',
      benefits: 'Good source of minerals and fiber',
      rating: 4
    },
    {
      id: 'df29',
      name: 'Prunes Sukha Aloo Bukhara',
      price: 33.99,
      image: '/assets/Dry Fruits/Prunes Sukha Aloo Bukhara.png',
      description: 'Chewy and sweet dried plums, known for their digestive health benefits and rich taste.',
      category: 'dry-fruits',
      origin: 'USA',
      benefits: 'Promotes digestive health',
      rating: 4
    },
    {
      id: 'df30',
      name: 'Pumpkin Seed',
      price: 30.99,
      image: '/assets/Dry Fruits/Pumpkin Seed.png',
      description: 'Nutty and crunchy pumpkin seeds, packed with magnesium and perfect for snacks or salads.',
      category: 'dry-fruits',
      origin: 'Mexico',
      benefits: 'Rich in magnesium and zinc',
      rating: 4
    },
    {
      id: 'df31',
      name: 'Raisins Kismish',
      price: 26.99,
      image: '/assets/Dry Fruits/Raisins Kismish.png',
      description: 'Plump and sweet raisins, a versatile ingredient for baking, trail mixes, and savory dishes.',
      category: 'dry-fruits',
      origin: 'Afghanistan',
      benefits: 'Natural source of energy and antioxidants',
      rating: 4
    },
    {
      id: 'df32',
      name: 'Sacha Inchi',
      price: 48.99,
      image: '/assets/Dry Fruits/Sacha Inchi.png',
      description: 'Nutty sacha inchi seeds, a Peruvian superfood rich in protein and omega-3 fatty acids.',
      category: 'dry-fruits',
      origin: 'Peru',
      benefits: 'High in plant-based omega-3s and protein',
      rating: 4
    },
    {
      id: 'df33',
      name: 'Sesame Seeds',
      price: 23.99,
      image: '/assets/Dry Fruits/Sesame Seeds.png',
      description: 'Tiny sesame seeds with a nutty flavor, used in tahini, garnishes, and Asian cuisines.',
      category: 'dry-fruits',
      origin: 'India',
      benefits: 'Rich in calcium and healthy oils',
      rating: 4
    },
    {
      id: 'df34',
      name: 'Sunflower Seeds',
      price: 21.99,
      image: '/assets/Dry Fruits/Sunflower Seeds.png',
      description: 'Crunchy sunflower seeds, packed with nutrients and perfect for snacking or salads.',
      category: 'dry-fruits',
      origin: 'Russia',
      benefits: 'Good source of vitamin E and selenium',
      rating: 4
    },
    {
      id: 'df35',
      name: 'Tiger Nuts',
      price: 37.99,
      image: '/assets/Dry Fruits/Tiger Nuts.png',
      description: 'Sweet and chewy tiger nuts, a prebiotic-rich snack with a nutty flavor despite being tubers.',
      category: 'dry-fruits',
      origin: 'West Africa',
      benefits: 'High in fiber and resistant starch',
      rating: 4
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
    // Inject custom styles
    const style = document.createElement('style');
    style.textContent = `
      .dryfruit-products-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: 'Poppins', sans-serif;
        color: #333;
      }

      .dryfruit-hero {
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                          url('https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
        background-size: cover;
        background-position: center;
        color: white;
        text-align: center;
        padding: 100px 20px;
        border-radius: 10px;
        margin-bottom: 40px;
        position: relative;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .dryfruit-hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(25, 84, 123, 0.8) 0%, rgba(71, 148, 235, 0.7) 100%);
        border-radius: 10px;
      }

      .dryfruit-hero-content {
        position: relative;
        z-index: 1;
        max-width: 800px;
        margin: 0 auto;
      }

      .dryfruit-hero h1 {
        font-size: 2.8em;
        margin-bottom: 15px;
        font-weight: 700;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      }

      .dryfruit-hero p {
        font-size: 1.2em;
        max-width: 800px;
        margin: 0 auto;
        opacity: 0.9;
        line-height: 1.6;
      }

      .dryfruit-search-container {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
      }

      .dryfruit-search-input {
        width: 100%;
        max-width: 500px;
        padding: 12px 20px;
        border: 2px solid #d1e3ff;
        border-radius: 30px;
        font-size: 16px;
        outline: none;
        transition: all 0.3s;
        background-color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      }

      .dryfruit-search-input:focus {
        border-color: #4a89dc;
        box-shadow: 0 0 8px rgba(74, 137, 220, 0.3);
      }

      .dryfruit-products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 25px;
      }

      .dryfruit-card {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s, box-shadow 0.3s;
        background: white;
        display: flex;
        flex-direction: column;
        height: 100%;
        border: 1px solid #eaeaea;
      }

      .dryfruit-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }

      .dryfruit-card-image {
        height: 200px;
        overflow: hidden;
        position: relative;
      }

      .dryfruit-card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
      }

      .dryfruit-card:hover .dryfruit-card-image img {
        transform: scale(1.05);
      }

      .dryfruit-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: linear-gradient(135deg, #4a89dc, #5ca3ff);
        color: white;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 2;
      }

      .fallback-image {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #f8f9fa;
        color: #4a89dc;
      }

      .fallback-image span {
        font-size: 3rem;
        font-weight: bold;
        opacity: 0.5;
      }

      .dryfruit-card-details {
        padding: 20px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }

      .dryfruit-card-details h3 {
        margin: 0 0 10px 0;
        font-size: 1.3em;
        color: #2c3e50;
        font-weight: 600;
      }

      .rating {
        margin-bottom: 12px;
      }

      .dryfruit-description {
        color: #666;
        font-size: 0.9em;
        margin-bottom: 15px;
        flex-grow: 1;
        line-height: 1.5;
      }

      .dryfruit-meta {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 15px;
        font-size: 0.85em;
        background: rgba(230, 240, 255, 0.5);
        padding: 10px;
        border-radius: 6px;
      }

      .dryfruit-origin, .dryfruit-benefits {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .dryfruit-origin svg, .dryfruit-benefits svg {
        color: #4a89dc;
      }

      .dryfruit-price {
        font-size: 1.4em;
        font-weight: 700;
        color: #4a89dc;
        margin-top: auto;
        margin-bottom: 5px;
      }

      .dryfruit-price-per-kg {
        font-size: 0.8em;
        color: #999;
        margin-bottom: 15px;
      }

      .dryfruit-actions {
        display: flex;
        justify-content: center;
      }

      .dryfruit-whatsapp-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #25D366;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 30px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        text-decoration: none;
        width: 100%;
      }

      .dryfruit-whatsapp-btn:hover {
        background: #20ba5a;
        transform: translateY(-2px);
      }

      .dryfruit-products-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 300px;
        text-align: center;
      }

      .dryfruit-products-loading svg {
        color: #4a89dc;
        margin-bottom: 20px;
        font-size: 2em;
        animation: spin 1.5s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .dryfruit-no-results {
        text-align: center;
        padding: 40px;
        background: #f9f9f9;
        border-radius: 10px;
      }

      .dryfruit-reset-search {
        background: #4a89dc;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 30px;
        margin-top: 15px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .dryfruit-reset-search:hover {
        background: #3976c3;
      }

      @media (max-width: 768px) {
        .dryfruit-products-grid {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }
        
        .dryfruit-hero {
          padding: 80px 20px;
        }
        
        .dryfruit-hero h1 {
          font-size: 2.2em;
        }
        
        .dryfruit-hero p {
          font-size: 1em;
        }
      }

      @media (max-width: 480px) {
        .dryfruit-hero {
          padding: 60px 15px;
        }
        
        .dryfruit-hero h1 {
          font-size: 1.8em;
        }
        
        .dryfruit-hero p {
          font-size: 0.9em;
        }
        
        .dryfruit-card-image {
          height: 180px;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Clean up function
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Ensure all products have valid data
  const validatedProducts = ensureValidProducts(dryFruitsRaw);

  // Filter products based on search term
  const getFilteredProducts = () => {
    if (!searchTerm) return dryFruitsRaw;
    return dryFruitsRaw.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  };
  
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
  const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const fallbackImage = "https://via.placeholder.com/300x200?text=Image+Not+Available";
    
    const whatsappMessage = encodeURIComponent(`Hi, I'm interested in purchasing ${product.name}. Could you provide more information?`);
    const whatsappLink = `https://wa.me/+971555555555?text=${whatsappMessage}`;

    // Dubai market prices (roughly converting our existing prices to realistic AED values)
    const getAdjustedPrice = () => {
      // Product prices are already realistic AED values for Dubai market
      return product.price;
    };

    // Check if product should be marked premium (any product with rating of 5 or price > 50)
    const isPremium = product.rating === 5 || product.price > 50;

    return (
      <div 
        className="dryfruit-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="dryfruit-card-image">
          {!imageError ? (
            <img 
              src={getImagePath(product.image)} 
              alt={product.name}
              onError={handleImageError}
            />
          ) : (
            <div className="fallback-image">
              <span>{product.name.charAt(0)}</span>
            </div>
          )}
          {isPremium && (
            <div className="dryfruit-badge">Premium</div>
          )}
        </div>
        <div className="dryfruit-card-details">
          <h3>{product.name}</h3>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < product.rating ? "#f1c40f" : "#e4e5e9"} />
            ))}
          </div>
          <p className="dryfruit-description">{product.description}</p>
          <div className="dryfruit-meta">
            <div className="dryfruit-origin">
              <FaMapMarkerAlt /> <span>{product.origin}</span>
            </div>
            <div className="dryfruit-benefits">
              <FaLeaf /> <span>{product.benefits}</span>
            </div>
          </div>
          <div className="dryfruit-price">{getAdjustedPrice().toFixed(2)} AED</div>
          <div className="dryfruit-price-per-kg">Per kg</div>
          <div className="dryfruit-actions">
            <a 
              href={whatsappLink} 
            target="_blank"
            rel="noopener noreferrer"
              className="dryfruit-whatsapp-btn"
          >
              <FaWhatsapp /> Inquire Now
          </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Figs Dubai | Dry Fruits</title>
        <meta name="description" content="Shop premium dry fruits at FIGS Dubai (Future Indo Global Services Dubai). Quality almonds, walnuts, pistachios, and more delivered worldwide." />
        <meta name="keywords" content="FIGSDUBAI, figsdubai, figs dubai, Future indo global services dubai, dry fruits, almonds, walnuts, pistachios" />
        <meta property="og:title" content="Figs Dubai | Dry Fruits" />
        <meta property="og:description" content="Shop premium dry fruits at FIGS Dubai. Quality almonds, walnuts, pistachios, and more delivered worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://figsdubai.com/products/dry-fruits" />
        <meta property="og:image" content="/images/hero-bg.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Figs Dubai | Dry Fruits" />
        <meta name="twitter:description" content="Shop premium dry fruits at FIGS Dubai. Quality almonds, walnuts, pistachios, and more delivered worldwide." />
        <meta name="twitter:image" content="/images/hero-bg.jpg" />
      </Helmet>
      <div className="dryfruit-products-container">
        <div className="dryfruit-hero">
          <div className="dryfruit-hero-content">
            <h1>Premium Dry Fruits Collection</h1>
            <p>Discover our carefully selected range of premium quality dry fruits and nuts, sourced from the finest orchards around the world</p>
          </div>
        </div>

        <div className="dryfruit-search-container">
              <input
                type="text"
            placeholder="Search our premium collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            className="dryfruit-search-input"
              />
            </div>

        {loading ? (
          <div className="dryfruit-products-loading">
            <FaLeaf size={30} className="spin" />
            <p>Preparing our finest selection for you...</p>
          </div>
        ) : getFilteredProducts().length > 0 ? (
          <div className="dryfruit-products-grid">
            {getFilteredProducts().map((product) => (
              <ErrorBoundary key={product.id}>
                <ProductCard product={product} />
              </ErrorBoundary>
            ))}
            </div>
          ) : (
          <div className="dryfruit-no-results">
            <h3>No Products Found</h3>
            <p>We couldn't find any products matching your search. Please try a different term.</p>
            <button className="dryfruit-reset-search" onClick={() => setSearchTerm('')}>
              View All Products
            </button>
              </div>
          )}
      </div>
    </>
  );
};

export default DryFruitsProducts; 
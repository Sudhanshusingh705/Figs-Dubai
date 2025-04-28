import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import Spinner from '../components/Spinner';
import '../styles/ProductDetail.css';

const TeaDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { t } = useLanguage();
  
  // All tea products data based on the images in assets/Tea folder
  const teaProducts = [
    {
      id: 1,
      name: 'Black Tea',
      image: '/assets/Tea/Black Tea.jpg',
      description: 'Rich and robust black tea with a full-bodied flavor. Perfect for starting your day.',
      longDescription: 'Black tea is the most oxidized of all tea types, resulting in a robust, full-bodied flavor profile with notes of malt, chocolate, and sometimes fruits. Our premium black tea is sourced from high-altitude estates where ideal growing conditions produce leaves with exceptional character. It can be enjoyed on its own or with milk and sweetener, making it the perfect energizing start to your day or a comforting afternoon refreshment.',
      origin: 'Assam and Darjeeling, India',
      brewingTips: 'Brew with water at 90-95°C (195-205°F) for 3-5 minutes',
      healthBenefits: 'Contains antioxidants, may improve heart health, provides steady energy through caffeine and L-theanine',
      price: 8.99,
      unit: '100g',
      inStock: true
    },
    {
      id: 2,
      name: 'Chai Tea',
      image: '/assets/Tea/Chai Tea.jpg',
      description: 'Aromatic blend of black tea with spices like cardamom, cinnamon, and ginger.',
      longDescription: 'Our chai tea is a fragrant, warming blend that combines premium black tea with an authentic mix of traditional Indian spices. Each sip delivers the perfect balance of cardamom, cinnamon, ginger, cloves, and black pepper, creating a rich and complex flavor profile. This comforting beverage can be prepared traditionally by simmering with milk and sweetener, or brewed like regular tea for a lighter experience.',
      origin: 'India',
      brewingTips: 'For authentic chai, simmer with milk and sweeten to taste. For lighter version, brew with water at 95°C (205°F) for 4-5 minutes',
      healthBenefits: 'Contains antioxidants from tea and spices, may aid digestion, supports immune system through anti-inflammatory spices',
      price: 9.49,
      unit: '100g',
      inStock: true
    },
    {
      id: 3,
      name: 'Chamomile Tea',
      image: '/assets/Tea/Chamomile Tea.webp',
      description: 'Soothing herbal tea with delicate floral notes, perfect for relaxation.',
      longDescription: 'Our chamomile tea consists of whole chamomile flower heads, carefully harvested and dried to preserve their delicate honey-like sweetness and distinctive apple notes. This caffeine-free herbal infusion has been used for centuries as a natural way to calm the mind and prepare for restful sleep. The golden-colored brew delivers a gentle, soothing experience perfect for unwinding at the end of a busy day.',
      origin: 'Egypt and Eastern Europe',
      brewingTips: 'Brew with water at 90-95°C (195-205°F) for 5 minutes',
      healthBenefits: 'May promote better sleep, has calming effects, supports digestive health, contains antioxidants',
      price: 7.99,
      unit: '75g',
      inStock: true
    },
    {
      id: 4,
      name: 'Darjeeling Tea',
      image: '/assets/Tea/Darjeeling Tea.webp',
      description: 'The "champagne of teas" with a distinctive muscatel flavor and floral aroma.',
      longDescription: 'Grown in the foothills of the Himalayas, our Darjeeling tea is harvested from the spring flush, capturing the prized "muscatel" character—a unique musky-sweet flavor with notes of ripe grapes, fruits, and flowers. Often called the "champagne of teas," Darjeeling offers a complex, nuanced taste experience with a bright amber cup. This sophisticated tea is best enjoyed without milk to appreciate its delicate character and distinctive terroir.',
      origin: 'Darjeeling, India',
      brewingTips: 'Brew with water at 85-90°C (185-195°F) for 3-4 minutes',
      healthBenefits: 'Rich in antioxidants, may support heart health, contains moderate caffeine for gentle energy',
      price: 12.99,
      unit: '100g',
      inStock: true
    },
    {
      id: 5,
      name: 'Dark Tea',
      image: '/assets/Tea/Dark Tea.webp',
      description: 'Post-fermented tea with a smooth, earthy flavor that improves with age.',
      longDescription: 'Dark tea, also known as post-fermented tea, undergoes a unique microbial fermentation process that transforms its character over time. Our dark tea offers a smooth, clean taste with deep earthy notes and remarkable complexity. Unlike most teas, dark tea actually improves with age, developing richer, more refined flavors. Popular in China and increasingly appreciated worldwide, this tea makes an excellent introduction to the fascinating world of aged and fermented teas.',
      origin: 'Yunnan, China',
      brewingTips: 'Rinse leaves briefly, then brew with water at 95-100°C (205-212°F) for 3-4 minutes. Can be steeped multiple times',
      healthBenefits: 'Contains probiotics from fermentation, may aid digestion and metabolism, has been traditionally used to help with fat digestion',
      price: 11.49,
      unit: '100g',
      inStock: true
    },
    {
      id: 6,
      name: 'Green Tea',
      image: '/assets/Tea/Green Tea.webp',
      description: 'Fresh and earthy green tea packed with antioxidants and light caffeine.',
      longDescription: 'Our premium green tea offers a fresh, verdant flavor profile with subtle notes of grass, vegetables, and a gentle sweetness. Minimally processed to preserve its natural character and beneficial compounds, this tea delivers a clean, refreshing taste and a beautiful light green infusion. Green tea contains less caffeine than black tea, providing a gentle energy boost without jitters, making it perfect for any time of day.',
      origin: 'China and Japan',
      brewingTips: 'Brew with water at 70-80°C (160-175°F) for 2-3 minutes to avoid bitterness',
      healthBenefits: 'High in catechins and antioxidants, may support metabolism and brain function, contains L-theanine for focused calm',
      price: 10.99,
      unit: '100g',
      inStock: true
    },
    {
      id: 7,
      name: 'Herbal Tea',
      image: '/assets/Tea/Herbal Tea.webp',
      description: 'Caffeine-free blend of herbs and botanicals with a mild and pleasant taste.',
      longDescription: 'Our signature herbal tea blend combines carefully selected botanicals to create a soothing, caffeine-free infusion with a delightful flavor profile. Featuring a harmonious mix of hibiscus, lemongrass, rose hips, and mint, this refreshing blend delivers a beautiful ruby-colored cup with naturally sweet and tangy notes. Perfect for any time of day or night, this herbal infusion provides a moment of calm without any caffeine.',
      origin: 'Blend of herbs from multiple regions',
      brewingTips: 'Brew with freshly boiled water (100°C/212°F) for 5-7 minutes to fully extract flavors',
      healthBenefits: 'Caffeine-free, contains various antioxidants, may support relaxation and hydration',
      price: 8.29,
      unit: '75g',
      inStock: true
    },
    {
      id: 8,
      name: 'Irani Chai',
      image: '/assets/Tea/Irani Chai.jpg',
      description: 'Creamy Persian-style tea with a unique preparation method and rich flavor.',
      longDescription: "Irani Chai is a distinctive style of tea preparation with roots in Persian culture that has become particularly popular in parts of India. Our authentic Irani Chai blend features robust black tea specially selected to complement the traditional preparation method, which involves brewing a strong tea concentrate separately from milk that's been simmered until slightly caramelized. The result is a creamy, indulgent beverage with a unique depth of flavor that's both comforting and invigorating.",
      origin: 'Iran and Hyderabad, India',
      brewingTips: 'Traditional preparation involves separately brewing strong tea and simmering milk, then combining. For a simple version, brew with half water, half milk at 95°C (205°F) for 4-5 minutes',
      healthBenefits: 'Contains antioxidants from tea, provides energy through caffeine, milk adds calcium and protein',
      price: 9.99,
      unit: '100g',
      inStock: true
    },
    {
      id: 9,
      name: 'Lemongrass Tea',
      image: '/assets/Tea/Lemongrass Tea.webp',
      description: 'Citrusy and refreshing herbal tea with a subtle sweetness.',
      longDescription: 'Our lemongrass tea delivers a bright, citrusy flavor profile with subtle notes of ginger and a natural sweetness. Made from premium lemongrass stalks that are carefully harvested and dried to preserve their essential oils, this caffeine-free herbal infusion produces a beautiful pale yellow cup with an uplifting aroma. Refreshing both hot and iced, lemongrass tea provides a revitalizing experience any time of day.',
      origin: 'Southeast Asia',
      brewingTips: 'Brew with water at 95-100°C (205-212°F) for 5-7 minutes. Excellent both hot and iced',
      healthBenefits: 'Contains citral, which has antioxidant properties, may aid digestion, traditionally used to reduce fever',
      price: 7.49,
      unit: '75g',
      inStock: true
    },
    {
      id: 10,
      name: 'Masala Chai',
      image: '/assets/Tea/Masala Chai.jpg',
      description: 'Traditional Indian spiced tea with warming spices and bold flavor.',
      longDescription: 'Our Masala Chai is an authentic Indian spiced tea blend featuring premium Assam black tea and a proprietary mix of freshly ground spices. Each batch contains perfectly balanced proportions of cardamom, cinnamon, ginger, cloves, and black pepper, creating a warming, aromatic beverage with a rich complexity that can be enjoyed throughout the day. This traditional chai delivers a bold, satisfying flavor experience whether prepared with milk for a creamy texture or brewed with water for a lighter profile.',
      origin: 'India',
      brewingTips: 'For traditional preparation, simmer 1-2 teaspoons with equal parts water and milk, adding sweetener to taste. For a lighter version, brew with hot water at 95°C (205°F) for 3-5 minutes',
      healthBenefits: 'Contains antioxidants from both tea and spices, warming spices may support circulation and digestion',
      price: 9.79,
      unit: '100g',
      inStock: true
    },
    {
      id: 11,
      name: 'Matcha Tea',
      image: '/assets/Tea/Matcha Tea.jpg',
      description: 'Stone-ground Japanese green tea powder with a vibrant color and rich umami flavor.',
      longDescription: 'Our ceremonial-grade matcha is stone-ground from shade-grown green tea leaves, creating a fine powder that dissolves completely when whisked with water. This traditional Japanese tea offers a complex flavor profile balancing umami richness with natural sweetness and a pleasant mild bitterness. The vibrant green color and velvety texture create a complete sensory experience. Matcha provides a unique combination of calm alertness due to its L-theanine content alongside caffeine.',
      origin: 'Japan',
      brewingTips: 'Sift 1-2 tsp into a warm bowl, add 2oz water at 80°C (175°F), and whisk in "M" motion until frothy',
      healthBenefits: 'Extremely high in antioxidants, boosts metabolism, provides sustained energy and focus through combined effect of caffeine and L-theanine',
      price: 14.99,
      unit: '30g',
      inStock: true
    },
    {
      id: 12,
      name: 'Mate Tea',
      image: '/assets/Tea/Mate Tea.png',
      description: 'South American caffeinated beverage with a grassy, slightly bitter flavor.',
      longDescription: 'Yerba Mate is a traditional South American beverage made from the leaves of the holly species Ilex paraguariensis. Our premium mate offers a distinctive flavor profile featuring notes of herbs, grass, and a pleasant earthiness with a slightly bitter finish. Naturally high in caffeine but with a different chemical composition than coffee or tea, mate provides a unique form of stimulation often described as energizing without nervousness. Traditionally shared in a social setting using a gourd and bombilla (metal straw).',
      origin: 'South America (Argentina, Paraguay, Brazil)',
      brewingTips: 'Traditional preparation uses a gourd and bombilla. For simple brewing, steep 1-2 tbsp in water at 70-80°C (160-175°F) for 3-5 minutes',
      healthBenefits: 'Contains xanthines for energy, rich in antioxidants, provides nutritional compounds including vitamins and minerals',
      price: 10.49,
      unit: '200g',
      inStock: true
    }
  ];
  
  useEffect(() => {
    // Simulate fetching product data
    setLoading(true);
    
    const timer = setTimeout(() => {
      const foundProduct = teaProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Handle WhatsApp inquiry
  const handleWhatsAppInquiry = () => {
    if (!product) return;
    
    const message = encodeURIComponent(`Hi, I'm interested in the ${product.name} tea. Could you please provide more information about availability and pricing?`);
    const whatsappUrl = `https://wa.me/971551234567?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  
  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-container">
          <Spinner />
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="back-link">
            <Link to="/products/tea">
              <FaArrowLeft /> Back to Tea Products
            </Link>
          </div>
          <div className="error-container">
            <h2>Product Not Found</h2>
            <p>Sorry, the tea product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products/tea" className="back-btn">
              Browse All Teas
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="back-link">
          <Link to="/products/tea">
            <FaArrowLeft /> Back to Tea Products
          </Link>
        </div>
        
        <div className="product-detail">
          <div className="product-image-container">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/600x400?text=Product+Image";
              }}
            />
          </div>
          
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-price">${product.price.toFixed(2)} <span className="unit">per {product.unit}</span></p>
            
            <div className="product-availability">
              <span className={`status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="product-description">
              <p>{product.longDescription}</p>
            </div>
            
            <div className="product-details">
              <div className="detail-item">
                <h3>Origin</h3>
                <p>{product.origin}</p>
              </div>
              <div className="detail-item">
                <h3>Brewing Tips</h3>
                <p>{product.brewingTips}</p>
              </div>
              <div className="detail-item">
                <h3>Health Benefits</h3>
                <p>{product.healthBenefits}</p>
              </div>
            </div>
            
            <div className="product-actions">
              <button 
                className="button primary whatsapp-button"
                onClick={handleWhatsAppInquiry}
              >
                <FaWhatsapp className="icon" /> Inquire on WhatsApp
              </button>
              <Link to="/contact" className="button secondary">
                Contact for Bulk Orders
              </Link>
            </div>
          </div>
        </div>
        
        <div className="related-products">
          <h2>You Might Also Like</h2>
          <div className="related-products-grid">
            {teaProducts
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="related-product-card">
                  <Link to={`/product/tea/${relatedProduct.id}`}>
                    <div className="related-product-image">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/300x200?text=Product+Image";
                        }}
                      />
                    </div>
                    <div className="related-product-info">
                      <h3>{relatedProduct.name}</h3>
                      <p className="price">${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        
        <div className="view-all-container">
          <Link to="/products/tea" className="view-all-btn">
            View All Premium Teas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeaDetail; 
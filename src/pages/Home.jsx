import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { FaShippingFast, FaGlobe, FaHandshake, FaChartLine } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getProducts({ featured: true, limit: 4 });
        setFeaturedProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>FIGS Dubai | Premium Dry Fruits, Spices, Tea & Global Trade</title>
        <meta name="description" content="FIGS Dubai - Future Indo Global Services Dubai. Premium dry fruits, spices, tea, and global import/export solutions. Trusted partner for international trade from Dubai." />
        <meta name="keywords" content="FIGSDUBAI, figsdubai, figs dubai, Future indo global services dubai" />
        <meta property="og:title" content="FIGS Dubai | Premium Dry Fruits, Spices, Tea & Global Trade" />
        <meta property="og:description" content="Premium dry fruits, spices, tea, and global import/export solutions from Dubai. Trusted partner for international trade." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://futureindoglobalservices.ae/" />
        <meta property="og:image" content="/images/hero-bg.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FIGS Dubai | Premium Dry Fruits, Spices, Tea & Global Trade" />
        <meta name="twitter:description" content="Premium dry fruits, spices, tea, and global import/export solutions from Dubai." />
        <meta name="twitter:image" content="/images/hero-bg.jpg" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "FIGS Dubai",
            "url": "https://futureindoglobalservices.ae/",
            "description": "Premium dry fruits, spices, and tea from Dubai. Future Indo Global Services Dubai.",
            "@id": "https://futureindoglobalservices.ae/#store",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Product Categories",
              "itemListElement": [
                { "@type": "OfferCatalog", "name": "Dry Fruits", "url": "https://futureindoglobalservices.ae/products/dry-fruits" },
                { "@type": "OfferCatalog", "name": "Spices", "url": "https://futureindoglobalservices.ae/products/spices" },
                { "@type": "OfferCatalog", "name": "Tea", "url": "https://futureindoglobalservices.ae/products/tea" }
              ]
            }
          }
        `}</script>
      </Helmet>
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Global Trade Solutions</h1>
            <p>Your trusted partner for international import and export services</p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">Browse Products</Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Services</h2>
              <p>Comprehensive solutions for your global trade needs</p>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <FaGlobe />
                </div>
                <h3>Global Sourcing</h3>
                <p>Find the right products from trusted suppliers across the world.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <FaShippingFast />
                </div>
                <h3>International Shipping</h3>
                <p>Efficient and reliable shipping to and from any destination.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <FaHandshake />
                </div>
                <h3>Trade Consulting</h3>
                <p>Expert guidance on regulations, compliance, and trade opportunities.</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <FaChartLine />
                </div>
                <h3>Market Analysis</h3>
                <p>Data-driven insights to inform your international business strategy.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-products-section">
          <div className="container">
            <div className="section-header">
              <h2>Featured Products</h2>
              <p>Explore our selection of high-quality products</p>
            </div>

            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="products-grid">
                {featuredProducts.map(product => (
                  <div className="product-card" key={product._id}>
                    <div className="product-image">
                      <img src={product.images[0] || '/images/product-placeholder.jpg'} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                      <p className="product-price">${product.price.toFixed(2)}</p>
                      <Link to={`/products/${product._id}`} className="view-product-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="view-all-container">
              <Link to="/products" className="view-all-btn">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose Us</h2>
              <p>Benefits of partnering with Import Export LLC</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-item">
                <h3>Global Network</h3>
                <p>Access to suppliers and buyers in over 100 countries worldwide.</p>
              </div>
              <div className="benefit-item">
                <h3>Quality Assurance</h3>
                <p>Rigorous quality control processes for all products and services.</p>
              </div>
              <div className="benefit-item">
                <h3>Competitive Pricing</h3>
                <p>Cost-effective solutions to maximize your profit margins.</p>
              </div>
              <div className="benefit-item">
                <h3>Expert Support</h3>
                <p>Dedicated team of professionals to guide you at every step.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Expand Your Global Reach?</h2>
              <p>Contact us today to discuss your import and export needs.</p>
              <Link to="/contact" className="cta-button">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <style jsx>{`
          .home-page {
            overflow: hidden;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          
          .section-header {
            text-align: center;
            margin-bottom: 50px;
          }
          
          .section-header h2 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 15px;
          }
          
          .section-header p {
            font-size: 1.1rem;
            color: #7f8c8d;
            max-width: 600px;
            margin: 0 auto;
          }
          
          /* Hero Section */
          .hero-section {
            background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg');
            background-size: cover;
            background-position: center;
            height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            padding: 0 20px;
          }
          
          .hero-content {
            max-width: 800px;
          }
          
          .hero-content h1 {
            font-size: 3.5rem;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
          
          .hero-content p {
            font-size: 1.5rem;
            margin-bottom: 30px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          }
          
          .hero-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
          }
          
          .btn {
            padding: 12px 30px;
            border-radius: 5px;
            font-weight: 600;
            font-size: 1rem;
            text-decoration: none;
            transition: all 0.3s;
          }
          
          .btn-primary {
            background-color: #3498db;
            color: white;
            border: 2px solid #3498db;
          }
          
          .btn-primary:hover {
            background-color: #2980b9;
            border-color: #2980b9;
          }
          
          .btn-outline {
            background-color: transparent;
            color: white;
            border: 2px solid white;
          }
          
          .btn-outline:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
          
          /* Services Section */
          .services-section {
            padding: 80px 0;
            background-color: #f8f9fa;
          }
          
          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
          }
          
          .service-card {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          
          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .service-icon {
            width: 70px;
            height: 70px;
            background-color: #3498db;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 28px;
          }
          
          .service-card h3 {
            margin-bottom: 15px;
            color: #2c3e50;
          }
          
          .service-card p {
            color: #7f8c8d;
            line-height: 1.6;
          }
          
          /* Featured Products Section */
          .featured-products-section {
            padding: 80px 0;
          }
          
          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
          }
          
          .product-card {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          
          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
          }
          
          .product-image {
            height: 200px;
            overflow: hidden;
          }
          
          .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }
          
          .product-card:hover .product-image img {
            transform: scale(1.1);
          }
          
          .product-info {
            padding: 20px;
            background-color: white;
          }
          
          .product-info h3 {
            margin-bottom: 10px;
            font-size: 1.2rem;
            color: #2c3e50;
          }
          
          .product-category {
            color: #7f8c8d;
            font-size: 0.9rem;
            margin-bottom: 10px;
          }
          
          .product-price {
            font-weight: 700;
            color: #3498db;
            margin-bottom: 15px;
            font-size: 1.2rem;
          }
          
          .view-product-btn {
            display: inline-block;
            padding: 8px 15px;
            background-color: #3498db;
            color: white;
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.3s;
          }
          
          .view-product-btn:hover {
            background-color: #2980b9;
          }
          
          .view-all-container {
            text-align: center;
          }
          
          .view-all-btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: transparent;
            color: #3498db;
            border: 2px solid #3498db;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
          }
          
          .view-all-btn:hover {
            background-color: #3498db;
            color: white;
          }
          
          /* Loading Spinner */
          .loading-spinner {
            display: flex;
            justify-content: center;
            padding: 40px 0;
          }
          
          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Benefits Section */
          .benefits-section {
            padding: 80px 0;
            background-color: #f8f9fa;
          }
          
          .benefits-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          
          .benefit-item {
            padding: 30px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          
          .benefit-item h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.3rem;
          }
          
          .benefit-item p {
            color: #7f8c8d;
            line-height: 1.6;
          }
          
          /* CTA Section */
          .cta-section {
            padding: 80px 0;
            background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/cta-bg.jpg');
            background-size: cover;
            background-position: center;
            color: white;
            text-align: center;
          }
          
          .cta-content {
            max-width: 800px;
            margin: 0 auto;
          }
          
          .cta-content h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
          }
          
          .cta-content p {
            font-size: 1.2rem;
            margin-bottom: 30px;
          }
          
          .cta-button {
            display: inline-block;
            padding: 15px 40px;
            background-color: #3498db;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: background-color 0.3s;
          }
          
          .cta-button:hover {
            background-color: #2980b9;
          }
          
          /* Responsive */
          @media (max-width: 992px) {
            .hero-content h1 {
              font-size: 2.8rem;
            }
            
            .hero-content p {
              font-size: 1.2rem;
            }
          }
          
          @media (max-width: 768px) {
            .services-grid,
            .products-grid,
            .benefits-grid {
              grid-template-columns: 1fr;
            }
            
            .hero-section {
              height: 60vh;
            }
            
            .hero-content h1 {
              font-size: 2.2rem;
            }
            
            .section-header h2 {
              font-size: 2rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Home; 
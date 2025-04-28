import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaShippingFast, FaBoxOpen, FaGlobe, FaWarehouse, FaHandshake, FaChevronRight } from 'react-icons/fa';
import { MdOutlineVerified, MdSupportAgent, MdPayment } from 'react-icons/md';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Services.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [animate, setAnimate] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setAnimate(true);
    
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100
    });
    
    // Refresh AOS for any layout changes
    AOS.refresh();
  }, []);

  const handleTabChange = (tab) => {
    setAnimate(false);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimate(true);
    }, 300);
  };

  return (
    <div className="services-page">
      {/* Hero Banner */}
      <div className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content" data-aos="fade-up">
          <h1>{t('ourPremiumServices')}</h1>
          <p>{t('servicesSubtitle')}</p>
          <div className="hero-buttons">
            <Link to="/contact" className="hero-btn primary-btn">Get in Touch</Link>
            <Link to="/products" className="hero-btn secondary-btn">Explore Products</Link>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <section className="services-overview">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{t('whatWeOffer')}</h2>
            <div className="section-underline"></div>
            <p>{t('whatWeOfferSubtitle')}</p>
          </div>

          <div className="service-categories">
            <div className="service-category" data-aos="fade-up" data-aos-delay="100">
              <div className="service-icon">
                <img src="/assets/Dry Fruits/Almonds.png" alt={t('dryFruits')} />
              </div>
              <h3>{t('premiumDryFruits')}</h3>
              <p>{t('premiumDryFruitsDesc')}</p>
              <Link to="/products/dry-fruits" className="service-link">
                Explore <FaChevronRight />
              </Link>
            </div>

            <div className="service-category" data-aos="fade-up" data-aos-delay="200">
              <div className="service-icon">
                <img src="/assets/Spices/Coriander seed.webp" alt={t('spices')} />
              </div>
              <h3>{t('aromaticSpices')}</h3>
              <p>{t('aromaticSpicesDesc')}</p>
              <Link to="/products/spices" className="service-link">
                Explore <FaChevronRight />
              </Link>
            </div>

            <div className="service-category" data-aos="fade-up" data-aos-delay="300">
              <div className="service-icon">
                <img src="/assets/Tea/Masala Chai.jpg" alt={t('tea')} />
              </div>
              <h3>{t('fineTeas')}</h3>
              <p>{t('fineTeaDesc')}</p>
              <Link to="/products/tea" className="service-link">
                Explore <FaChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="quality-commitment">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>The Premium Quality Promise</h2>
            <div className="section-underline"></div>
            <p>We maintain the highest standards throughout our sourcing, processing, and distribution to ensure that every product exceeds your expectations</p>
          </div>

          <div className="quality-process" data-aos="fade-up">
            <div className="process-step" data-aos="fade-up">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Careful Selection</h3>
                <p>We meticulously select our products from regions renowned for producing the finest quality dry fruits, spices, and teas. Our sourcing team travels to these regions to handpick the premium varieties and establish direct relationships with farmers.</p>
              </div>
            </div>
            
            <div className="process-step" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Ethical Sourcing</h3>
                <p>We partner with farmers who employ sustainable agricultural practices and ensure fair compensation for their premium harvests. This approach not only guarantees superior products but also supports communities and preserves traditional farming methods.</p>
              </div>
            </div>
            
            <div className="process-step" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Rigorous Testing</h3>
                <p>Every batch undergoes comprehensive quality testing in our state-of-the-art facilities to verify authenticity, freshness, and compliance with international safety standards. We examine color, aroma, taste, texture, and moisture content to ensure perfection.</p>
              </div>
            </div>
            
            <div className="process-step" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Premium Packaging</h3>
                <p>Our products are carefully packaged in climate-controlled environments using specially designed materials that preserve their natural flavors, aromas, and nutritional properties during transit and storage, delivering exceptional quality directly to your doorstep.</p>
              </div>
            </div>
          </div>

          <div className="quality-certificates" data-aos="fade-up">
            <div className="certificate">
              <div className="certificate-icon">
                <MdOutlineVerified />
              </div>
              <h4>ISO Certified</h4>
            </div>
            
            <div className="certificate">
              <div className="certificate-icon">
                <FaLeaf />
              </div>
              <h4>Organic Certified</h4>
            </div>
            
            <div className="certificate">
              <div className="certificate-icon">
                <FaGlobe />
              </div>
              <h4>Fair Trade</h4>
            </div>
          </div>

          <div className="view-all-container" data-aos="fade-up">
            <Link to="/about" className="view-all-btn">Learn More About Our Standards</Link>
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="business-services">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{t('businessServices')}</h2>
            <div className="section-underline"></div>
            <p>{t('businessServicesSubtitle')}</p>
          </div>

          <div className="services-grid">
            <div className="service-box" data-aos="fade-up">
              <div className="service-icon">
                <FaBoxOpen />
              </div>
              <h3>{t('bulkOrdering')}</h3>
              <p>{t('bulkOrderingDesc')}</p>
              <div className="service-arrow">
                <FaChevronRight />
              </div>
            </div>

            <div className="service-box" data-aos="fade-up" data-aos-delay="100">
              <div className="service-icon">
                <FaWarehouse />
              </div>
              <h3>{t('storageTitle')}</h3>
              <p>{t('storageDesc')}</p>
              <div className="service-arrow">
                <FaChevronRight />
              </div>
            </div>

            <div className="service-box" data-aos="fade-up" data-aos-delay="200">
              <div className="service-icon">
                <FaShippingFast />
              </div>
              <h3>{t('globalShipping')}</h3>
              <p>{t('globalShippingDesc')}</p>
              <div className="service-arrow">
                <FaChevronRight />
              </div>
            </div>

            <div className="service-box" data-aos="fade-up" data-aos-delay="50">
              <div className="service-icon">
                <MdOutlineVerified />
              </div>
              <h3>{t('qualityTesting')}</h3>
              <p>{t('qualityTestingDesc')}</p>
              <div className="service-arrow">
                <FaChevronRight />
              </div>
            </div>

            <div className="service-box" data-aos="fade-up" data-aos-delay="150">
              <div className="service-icon">
                <FaGlobe />
              </div>
              <h3>{t('importExport')}</h3>
              <p>{t('importExportDesc')}</p>
              <div className="service-arrow">
                <FaChevronRight />
              </div>
            </div>

            <div className="service-box" data-aos="fade-up" data-aos-delay="250">
              <div className="service-icon">
                <FaHandshake />
              </div>
              <h3>{t('b2bPartnerships')}</h3>
              <p>{t('b2bPartnershipsDesc')}</p>
              <div className="service-arrow">
                <FaChevronRight />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Services */}
      <section className="customer-services">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{t('customerServices')}</h2>
            <div className="section-underline"></div>
            <p>{t('customerServicesSubtitle')}</p>
          </div>

          <div className="customer-service-boxes">
            <div className="cs-box" data-aos="fade-right">
              <div className="cs-icon">
                <MdSupportAgent />
              </div>
              <div className="cs-content">
                <h3>{t('customerSupport')}</h3>
                <p>{t('customerSupportDesc')}</p>
                <Link to="/contact" className="cs-link">Contact Support <FaChevronRight /></Link>
              </div>
            </div>

            <div className="cs-box" data-aos="fade-up">
              <div className="cs-icon">
                <FaLeaf />
              </div>
              <div className="cs-content">
                <h3>{t('productAuthenticity')}</h3>
                <p>{t('productAuthenticityDesc')}</p>
                <Link to="/about" className="cs-link">Learn More <FaChevronRight /></Link>
              </div>
            </div>

            <div className="cs-box" data-aos="fade-left">
              <div className="cs-icon">
                <MdPayment />
              </div>
              <div className="cs-content">
                <h3>{t('securePayment')}</h3>
                <p>{t('securePaymentDesc')}</p>
                <Link to="/contact" className="cs-link">Payment Options <FaChevronRight /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>Why Choose Our Services</h2>
            <div className="section-underline"></div>
            <p>Experience the difference with our premium services and products</p>
          </div>
          
          <div className="benefits-container">
            <div className="benefit-item" data-aos="fade-up">
              <div className="benefit-number">01</div>
              <h3>Premium Quality</h3>
              <p>We source only the finest quality products from trusted regions known for their exceptional production.</p>
            </div>
            
            <div className="benefit-item" data-aos="fade-up" data-aos-delay="100">
              <div className="benefit-number">02</div>
              <h3>Direct Sourcing</h3>
              <p>By working directly with farmers and producers, we eliminate middlemen and ensure fair trade practices.</p>
            </div>
            
            <div className="benefit-item" data-aos="fade-up" data-aos-delay="200">
              <div className="benefit-number">03</div>
              <h3>Strict Quality Control</h3>
              <p>Every product undergoes rigorous testing to ensure it meets our high standards before reaching you.</p>
            </div>
            
            <div className="benefit-item" data-aos="fade-up" data-aos-delay="300">
              <div className="benefit-number">04</div>
              <h3>Global Network</h3>
              <p>Our established distribution network ensures timely delivery to over 50 countries worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <div className="container">
          <div className="cta-content" data-aos="fade-up">
            <h2>{t('readyToExperience')}</h2>
            <p>{t('readyToExperienceSubtitle')}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-btn primary">
                {t('contactUs')}
                <span className="btn-icon"><FaChevronRight /></span>
              </Link>
              <Link to="/products" className="cta-btn secondary">
                {t('exploreProducts')}
                <span className="btn-icon"><FaChevronRight /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 
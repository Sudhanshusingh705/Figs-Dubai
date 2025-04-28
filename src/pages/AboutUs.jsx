import React from 'react';
import '../styles/AboutUs.css';
import { FaGlobe, FaHandshake, FaLeaf, FaMedal, FaShippingFast, FaRegLightbulb } from 'react-icons/fa';
import { FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>Figs Dubai | About Us</title>
        <meta name="description" content="Learn about FIGS Dubai (Future Indo Global Services Dubai), our journey, values, and commitment to premium dry fruits, spices, and tea." />
        <meta name="keywords" content="FIGSDUBAI, figsdubai, figs dubai, Future indo global services dubai, about figs dubai" />
        <meta property="og:title" content="Figs Dubai | About Us" />
        <meta property="og:description" content="Learn about FIGS Dubai, our journey, values, and commitment to premium dry fruits, spices, and tea." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://figsdubai.com/about" />
        <meta property="og:image" content="/images/hero-bg.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Figs Dubai | About Us" />
        <meta name="twitter:description" content="Learn about FIGS Dubai, our journey, values, and commitment to premium dry fruits, spices, and tea." />
        <meta name="twitter:image" content="/images/hero-bg.jpg" />
      </Helmet>
      <div className="about-us-page">
        {/* Hero Banner */}
        <div className="about-hero">
          <div className="about-hero-content">
            <h1>About FIGS Dubai</h1>
            <p>Bringing premium quality spices, dry fruits, and tea to the world since 2025</p>
          </div>
        </div>

        {/* Our Story */}
        <section className="about-section story-section">
          <div className="section-header">
            <h2>Our Story</h2>
            <div className="title-underline"></div>
          </div>
          <div className="about-story-container">
            <div className="about-story-image-container">
              <div className="about-story-image main-image">
                <img src="https://img.freepik.com/free-photo/top-view-assortment-indian-spices-with-copy-space_23-2148550676.jpg" alt="Premium dried fruits and spices arrangement" />
                <div className="story-image-overlay">
                  <span>Since 2025</span>
                </div>
                <div className="story-image-caption">
                  <span>Premium Quality</span>
                  <span>Global Sourcing</span>
                  <span>Authentic Flavors</span>
                </div>
              </div>
              <div className="floating-image-badge">
                <img src="https://img.freepik.com/free-photo/confident-business-man-standing-with-arms-crossed_23-2148526222.jpg" alt="Founder in warehouse" />
                <div className="badge-caption">Our Founder</div>
              </div>
            </div>
            <div className="about-story-content">
              <h3 className="story-subtitle">From Humble Beginnings to Global Excellence</h3>
              <p className="story-paragraph">
                <span className="story-first-letter">F</span>IGS Dubai was founded in 2025 by Mr. Rajeev Kumar with a vision to bridge the gap between premium quality produce and global markets. What began as a small venture importing exotic dry fruits has evolved into a diversified business offering a wide range of premium dry fruits, spices, and teas.
              </p>
              <div className="story-quote">
                <blockquote>"Quality is not an act, it is a habit. At FIGS Dubai, we have made excellence our daily pursuit."</blockquote>
                <cite>— Rajeev Kumar, Founder</cite>
              </div>
              <p className="story-paragraph">
                Our journey has been one of constant discovery and growth. We've traveled to the lush valleys of Kashmir for walnuts, the fertile plains of Afghanistan for premium dried fruits, the spice gardens of Kerala for cardamom, and the highlands of Darjeeling for the finest tea leaves.
              </p>
              <div className="story-additional-image">
                <img src="https://img.freepik.com/free-photo/indian-condiments-wooden-table_23-2148550819.jpg" alt="Selection of premium spices and ingredients" />
                <div className="additional-image-caption">Our premium selection of spices sourced from around the world</div>
              </div>
              <p className="story-paragraph">
                Today, FIGS Dubai stands as a trusted name in premium food products, supplying to retail customers, gourmet restaurants, and wholesale distributors across the Middle East and beyond. Our commitment to quality, authenticity, and customer satisfaction remains as strong as it was on day one.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="about-section mission-vision-section">
          <div className="mission-vision-container">
            <div className="mission-block">
              <div className="section-header">
                <h2>Our Mission</h2>
                <div className="title-underline"></div>
              </div>
              <div className="mission-content">
                <div className="mission-icon">
                  <FaGlobe />
                </div>
                <p>
                  To connect global consumers with the finest quality dry fruits, spices, and teas sourced directly from regions of origin while ensuring fair trade practices and sustainable sourcing methods.
                </p>
                <p>
                  We aim to preserve traditional harvesting techniques while embracing modern quality control standards to deliver products that enhance culinary experiences worldwide.
                </p>
              </div>
            </div>

            <div className="vision-block">
              <div className="section-header">
                <h2>Our Vision</h2>
                <div className="title-underline"></div>
              </div>
              <div className="vision-content">
                <div className="vision-icon">
                  <FaRegLightbulb />
                </div>
                <p>
                  To become the world's most trusted source for premium quality food products, recognized globally for our commitment to excellence, sustainability, and innovation.
                </p>
                <p>
                  We envision a future where FIGS Dubai products are synonymous with unparalleled quality, where our supply chain sets industry standards for sustainability, and where we contribute positively to the communities we source from.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="about-section values-section">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <div className="title-underline"></div>
          </div>
          <div className="values-container">
            <div className="value-item">
              <div className="value-icon">
                <FaMedal />
              </div>
              <h3>Quality Excellence</h3>
              <p>We never compromise on quality. Every product undergoes rigorous testing and quality checks before reaching our customers.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">
                <FaHandshake />
              </div>
              <h3>Integrity</h3>
              <p>We build relationships based on trust and transparency, maintaining ethical standards in all our business practices.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">
                <FaLeaf />
              </div>
              <h3>Sustainability</h3>
              <p>We are committed to environmentally responsible sourcing and operations, supporting sustainable farming practices.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">
                <FaShippingFast />
              </div>
              <h3>Reliability</h3>
              <p>We deliver what we promise, when we promise it, maintaining consistency in our products and services.</p>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="about-section milestones-section">
          <div className="section-header">
            <h2>Our Specialty Journey</h2>
            <div className="title-underline"></div>
            <p className="section-description">Discover how we've grown our premium offerings over the years, focusing on the best quality Dry Fruits, Spices, and Tea from around the world.</p>
          </div>
          
          <div className="journey-timeline-container">
            <div className="timeline-line"></div>
            
            <div className="timeline-row">
              <div className="timeline-card">
                <div className="card-content">
                  <h3 className="card-title">Premium Dry Fruits Launch</h3>
                  <p className="card-description">
                    Started our journey with a curated selection of premium quality almonds, walnuts, pistachios, and cashews sourced directly from the valleys of Kashmir and Afghanistan.
                  </p>
                  <div className="card-icon">🌰</div>
                </div>
                <div className="timeline-year-marker">
                  <div className="year-dot"></div>
                  <div className="year-label">2025</div>
                </div>
              </div>
              
              <div className="timeline-card">
                <div className="card-content">
                  <h3 className="card-title">Exotic Dry Fruits Expansion</h3>
                  <p className="card-description">
                    Expanded our dry fruits collection to include exotic varieties like Brazilian nuts, macadamia, pecans, and organic dried berries from certified farms worldwide.
                  </p>
                  <div className="card-icon">🥜</div>
                </div>
                <div className="timeline-year-marker">
                  <div className="year-dot"></div>
                  <div className="year-label">2024</div>
                </div>
              </div>
            </div>
            
            <div className="timeline-row">
              <div className="timeline-card">
                <div className="card-content">
                  <h3 className="card-title">Premium Spices Introduction</h3>
                  <p className="card-description">
                    Added a handpicked selection of fresh, aromatic spices sourced from the spice gardens of Kerala, including cardamom, cinnamon, cloves, and black pepper.
                  </p>
                  <div className="card-icon">🌶️</div>
                </div>
                <div className="timeline-year-marker">
                  <div className="year-dot"></div>
                  <div className="year-label">2024</div>
                </div>
              </div>
              
              <div className="timeline-card">
                <div className="card-content">
                  <h3 className="card-title">Specialty Spice Blends</h3>
                  <p className="card-description">
                    Developed our signature line of spice blends, combining traditional recipes with modern flavors to create unique masalas and seasonings for culinary enthusiasts.
                  </p>
                  <div className="card-icon">✨</div>
                </div>
                <div className="timeline-year-marker">
                  <div className="year-dot"></div>
                  <div className="year-label">2024</div>
                </div>
              </div>
            </div>
            
            <div className="timeline-row">
              <div className="timeline-card">
                <div className="card-content">
                  <h3 className="card-title">Exclusive Tea Collection</h3>
                  <p className="card-description">
                    Introduced our premium tea collection featuring Darjeeling, Assam, and specialty teas from renowned estates across India, Sri Lanka, and China, focusing on single-origin varieties.
                  </p>
                  <div className="card-icon">🍵</div>
                </div>
                <div className="timeline-year-marker">
                  <div className="year-dot"></div>
                  <div className="year-label">2024</div>
                </div>
              </div>
              
              <div className="timeline-card">
                <div className="card-content">
                  <h3 className="card-title">Organic Certification</h3>
                  <p className="card-description">
                    Achieved organic certification for our entire range of products, emphasizing our commitment to sustainable farming practices and chemical-free processing methods.
                  </p>
                  <div className="card-icon">🌿</div>
                </div>
                <div className="timeline-year-marker">
                  <div className="year-dot"></div>
                  <div className="year-label">2024</div>
                </div>
              </div>
            </div>
            
            <div className="timeline-row">
              <div className="timeline-card">
                <div className="card-content">
                  <h3 className="card-title">Global Distribution Network</h3>
                  <p className="card-description">
                    Expanded our distribution network to over 50 countries, bringing our premium quality dry fruits, spices, and teas to discerning customers and businesses worldwide.
                  </p>
                  <div className="card-icon">🌎</div>
                </div>
                <div className="timeline-year-marker">
                  <div className="year-dot"></div>
                  <div className="year-label">2024</div>
                </div>
              </div>
              
              <div className="timeline-card">
                <div className="card-content">
                  <h3 className="card-title">Innovation & Excellence</h3>
                  <p className="card-description">
                    Continuing our journey of excellence with ongoing research, taste innovations, and strict quality control to bring you the finest dry fruits, spices, and teas from around the world.
                  </p>
                  <div className="card-icon">🚀</div>
                </div>
                <div className="timeline-year-marker">
                  <div className="year-dot"></div>
                  <div className="year-label">Present</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get In Touch */}
        <section className="about-section contact-section">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <div className="title-underline"></div>
          </div>
          <div className="contact-container">
            <div className="contact-image">
              <img src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="FIGS Dubai office" />
            </div>
            <div className="contact-content">
              <h3>Join Us on Our Journey</h3>
              <p>Whether you're a retailer looking for premium products, a chef seeking the finest ingredients, or a food enthusiast wanting to elevate your culinary experience, we'd love to hear from you.</p>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <span>info@futureindoglobalservices.ae</span>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <span>+91 8882855844</span>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <FaLocationDot />
                  </div>
                  <span>Dubai Business Bay, UAE</span>
                </div>
              </div>
              
              <div className="contact-buttons">
                <button className="contact-btn primary-btn">Send Message</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs; 
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Home.css';

// Import AOS for animations
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const dryFruitsRef = useRef(null);
  const spicesRef = useRef(null);
  const teaRef = useRef(null);
  
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Banner carousel data
  const bannerSlides = [
    {
      id: 1,
      title: "Your Trusted Partner for Premium Dry Fruits",
      subtitle: "Bringing the Finest Quality Dry Fruits from Around the World",
      image: "/assets/Dry Fruits/Almonds.png",
      buttonText: "Explore Dry Fruits",
      buttonLink: "dry-fruits",
      backgroundColor: "linear-gradient(135deg, #19396b 0%, #2a5298 100%)"
    },
    {
      id: 2,
      title: "Exotic Spices for Authentic Flavors",
      subtitle: "Premium Spices Sourced Directly from the Finest Regions",
      image: "/assets/Spices/Turmeric.webp",
      buttonText: "Discover Spices",
      buttonLink: "spices",
      backgroundColor: "linear-gradient(135deg, #5e2c04 0%, #8B4513 100%)"
    },
    {
      id: 3,
      title: "Experience the Richness of Our Premium Teas",
      subtitle: "Carefully Selected and Curated Tea Collections",
      image: "/assets/Tea/Mas",
      buttonText: "View Tea Collection",
      buttonLink: "tea",
      backgroundColor: "linear-gradient(135deg, #105e26 0%, #1e8a3e 100%)"
    }
  ];

  // Function to navigate between carousel slides
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
  };

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100
    });
    
    // Refresh AOS for any layout changes
    AOS.refresh();
    
    // Auto-advancing carousel
    const carouselInterval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    // Cleanup intervals
    return () => {
      clearInterval(carouselInterval);
    };
  }, [language]);
  
  // Dry Fruits data (26 products)
  const dryFruits = [
    { id: 1, name: "Almonds", image: "/assets/Dry Fruits/Almonds.png", description: "Premium quality almonds sourced from California, known for their rich flavor and nutritional benefits." },
    { id: 2, name: "Apricots", image: "/assets/Dry Fruits/Apricots Khubani.png", description: "Soft and tangy dried apricots, perfect for snacking or adding to desserts and salads." },
    { id: 3, name: "Betel Nut", image: "/assets/Dry Fruits/Betel Nut.png", description: "Chewy and mildly sweet betel nuts, often used in traditional practices and cultural ceremonies." },
    { id: 4, name: "Brazil Nuts", image: "/assets/Dry Fruits/Brazil Nuts.png", description: "Rich and creamy Brazil nuts, packed with selenium and essential nutrients for a healthy diet." },
    { id: 5, name: "Cashews Kaju", image: "/assets/Dry Fruits/Cashews Kaju.png", description: "Buttery and crunchy cashews, ideal for snacking or enhancing both savory and sweet dishes." },
    { id: 6, name: "Chestnut", image: "/assets/Dry Fruits/Chestnut.png", description: "Sweet and nutty chestnuts, perfect for roasting or incorporating into holiday recipes." },
    { id: 7, name: "Chia Seeds", image: "/assets/Dry Fruits/Chia Seeds.png", description: "Tiny but mighty chia seeds, loaded with omega-3s and fiber for a nutritious boost." },
    { id: 8, name: "Cinnamon", image: "/assets/Dry Fruits/Cinnamon.jpg", description: "Warm and sweet cinnamon, a versatile spice for baking, beverages, and savory dishes." },
    { id: 9, name: "Clove", image: "/assets/Dry Fruits/Cloves.jpg", description: "Aromatic and pungent cloves, used sparingly to add depth to curries, stews, and baked goods." },
    { id: 10, name: "Corn Nuts", image: "/assets/Dry Fruits/Corn Nuts.png", description: "Crunchy and salty corn nuts, a popular snack with bold flavors and a satisfying texture." },
    { id: 11, name: "Cudpahnut", image: "/assets/Dry Fruits/Cudpahnut.png", description: "Rare and flavorful Cudpah nuts, prized for their unique taste and health benefits." },
    { id: 12, name: "Dates Khajoor", image: "/assets/Dry Fruits/Dates Khajoor.png", description: "Sweet and chewy dates, a natural energy booster and perfect for healthy snacks or desserts." },
    { id: 13, name: "Dried Khajoor", image: "/assets/Dry Fruits/Dates Khajoor.png", description: "Dried dates with a rich, caramel-like sweetness, ideal for baking and energy-packed treats." },
    { id: 14, name: "Dried Coconut", image: "/assets/Dry Fruits/Dried Coconut.png", description: "Shredded dried coconut with a tropical flavor, great for desserts, smoothies, and granola." },
    { id: 15, name: "Dried Kiwi", image: "/assets/Dry Fruits/Dried Kiwi.png", description: "Tangy and chewy dried kiwi slices, bursting with vitamin C and a zesty flavor." },
    { id: 16, name: "Dried Mango", image: "/assets/Dry Fruits/Dried Mango.png", description: "Sweet and tangy dried mango, a tropical treat packed with vitamins and antioxidants." },
    { id: 17, name: "Dry Plums", image: "/assets/Dry Fruits/Dry Plums.png", description: "Soft and sweet dried plums, known for their digestive health benefits and rich flavor." },
    { id: 18, name: "Fennel", image: "/assets/Dry Fruits/Fennel.png", description: "Licorice-flavored fennel seeds, used as a mouth freshener and digestive aid in Indian cuisine." },
    { id: 19, name: "Figs Anjeer", image: "/assets/Dry Fruits/Figs Anjeer.png", description: "Soft and honey-sweet dried figs, packed with fiber and nutrients for a healthy snack." },
    { id: 20, name: "Flax Seeds", image: "/assets/Dry Fruits/Flax Seeds.png", description: "Nutty flax seeds, rich in omega-3 fatty acids and fiber, perfect for smoothies and baking." },
    { id: 21, name: "Fox Nuts Makhana", image: "/assets/Dry Fruits/Fox Nuts Makhana.png", description: "Light and crunchy fox nuts, a healthy snack roasted or used in Indian sweets and curries." },
    { id: 22, name: "Hazelnuts Pahadi Badam", image: "/assets/Dry Fruits/Hazelnuts Pahadi Badam.png", description: "Rich and buttery hazelnuts, a delicious addition to desserts, snacks, and nut mixes." },
    { id: 23, name: "Macadamia Nuts", image: "/assets/Dry Fruits/Macadamia Nuts.png", description: "Creamy and indulgent macadamia nuts, perfect for snacking or baking into cookies." },
    { id: 24, name: "Pecans", image: "/assets/Dry Fruits/Pecans.png", description: "Buttery and slightly sweet pecans, a favorite in pies, salads, and roasted snacks." },
    { id: 25, name: "Pili Nut", image: "/assets/Dry Fruits/Pili Nut.png", description: "Rich and creamy pili nuts, a rare superfood packed with healthy fats and antioxidants." },
    { id: 26, name: "Pine Nuts Chilgoza", image: "/assets/Dry Fruits/Pine Nuts Chilgoza.png", description: "Delicate and nutty pine nuts, essential for pesto, salads, and gourmet dishes." },
    { id: 27, name: "Pistachios Pista", image: "/assets/Dry Fruits/Pistachios Pista.png", description: "Vibrant green pistachios with a buttery flavor, perfect for snacking and baking." },
    { id: 28, name: "Poppy Seeds", image: "/assets/Dry Fruits/Poppy Seeds.png", description: "Tiny poppy seeds with a mild nutty flavor, used in baking, curries, and garnishes." },
    { id: 29, name: "Prunes Sukha Aloo Bukhara", image: "/assets/Dry Fruits/Prunes Sukha Aloo Bukhara.png", description: "Chewy and sweet dried plums, known for their digestive health benefits and rich taste." },
    { id: 30, name: "Pumpkin Seed", image: "/assets/Dry Fruits/Pumpkin Seed.png", description: "Nutty and crunchy pumpkin seeds, packed with magnesium and perfect for snacks or salads." },
    { id: 31, name: "Raisins Kismish", image: "/assets/Dry Fruits/Raisins Kismish.png", description: "Plump and sweet raisins, a versatile ingredient for baking, trail mixes, and savory dishes." },
    { id: 32, name: "Sacha Inchi", image: "/assets/Dry Fruits/Sacha Inchi.png", description: "Nutty sacha inchi seeds, a Peruvian superfood rich in protein and omega-3 fatty acids." },
    { id: 33, name: "Sesame Seeds", image: "/assets/Dry Fruits/Sesame Seeds.png", description: "Tiny sesame seeds with a nutty flavor, used in tahini, garnishes, and Asian cuisines." },
    { id: 34, name: "Sunflower Seeds", image: "/assets/Dry Fruits/Sunflower Seeds.png", description: "Crunchy sunflower seeds, packed with nutrients and perfect for snacking or salads." },
    { id: 35, name: "Tiger Nuts", image: "/assets/Dry Fruits/Tiger Nuts.png", description: "Sweet and chewy tiger nuts, a prebiotic-rich snack with a nutty flavor despite being tubers." },
    { id: 36, name: "Walnuts Akhrot", image: "/assets/Dry Fruits/Walnuts Akhrot.png", description: "Rich and earthy walnuts, packed with omega-3s and ideal for snacking or baking." }
];
  
  // Spices data (20 products)
  const spices = [
    { id: 1, name: "Anise", image: "/assets/Spices/Anise.webp", description: "Aromatic spice with a licorice-like flavor, popular in both sweet and savory dishes across many cuisines." },
    { id: 2, name: "Asafoetida", image: "/assets/Spices/Asafoetida.webp", description: "Pungent spice used in small amounts to add a savory, umami flavor to dishes, especially in Indian cuisine." },
    { id: 3, name: "Basil", image: "/assets/Spices/Basil.jpg", description: "Aromatic herb with a sweet, slightly peppery flavor, essential in Mediterranean and many Asian cuisines." },
    { id: 4, name: "Bay Leaf", image: "/assets/Spices/Bay leaf.jpg", description: "Aromatic leaf used to flavor soups, stews, and braises, removed before serving." },
    { id: 5, name: "Black Cardamom", image: "/assets/Spices/Black cardamom.webp", description: "Smoky, robust spice used in savory dishes and garam masala blends in Indian cuisine." },
    { id: 6, name: "Black Cumin", image: "/assets/Spices/Black cumin.webp", description: "Earthy, slightly bitter spice used in Middle Eastern, Indian, and North African cuisines." },
    { id: 7, name: "Black Pepper", image: "/assets/Spices/Black pepper.webp", description: "The world's most traded spice, adding heat and depth to countless dishes across global cuisines." },
    { id: 8, name: "Caraway", image: "/assets/Spices/Caraway.webp", description: "Aromatic seeds with a distinctive earthy anise-like flavor, popular in European cuisines." },
    { id: 9, name: "Cardamom", image: "/assets/Spices/Cardamom.webp", description: "Intensely aromatic spice with a complex sweet-spicy flavor, used in both sweet and savory dishes." },
    { id: 10, name: "Coriander Seeds", image: "/assets/Spices/Coriander seeds.webp", description: "Citrusy, nutty seeds used to enhance curries, pickles, and spice blends globally." },
    { id: 11, name: "Coriander", image: "/assets/Spices/Coriander.jpg", description: "Herb with a fresh, citrusy flavor, widely used as a garnish or in chutneys and marinades." },
    { id: 12, name: "Cumin", image: "/assets/Spices/Cumin.jpg", description: "Warm, earthy spice that is a staple in Mexican, Indian, and Middle Eastern cuisines." },
    { id: 13, name: "Curry Leaves", image: "/assets/Spices/Curry leaves.jpg", description: "Aromatic leaves used to temper South Indian dishes, imparting a unique citrusy flavor." },
    { id: 14, name: "Fennel", image: "/assets/Spices/Fennel.webp", description: "Sweet, licorice-flavored seeds used in teas, desserts, and savory dishes worldwide." },
    { id: 15, name: "Fenugreek", image: "/assets/Spices/Fenugreek.jpg", description: "Bitter-sweet seeds used in spice mixes and dishes like Indian curries and pickles." },
    { id: 16, name: "Garam Masala", image: "/assets/Spices/Garam masala.webp", description: "Warming spice blend combining cinnamon, cloves, and cardamom, essential in Indian cooking." },
    { id: 17, name: "Ginger", image: "/assets/Spices/Ginger.jpg", description: "Zesty, aromatic root used fresh or dried to add warmth and depth to both sweet and savory dishes." },
    { id: 18, name: "Nutmeg", image: "/assets/Spices/Nutmeg.webp", description: "Warm, nutty spice often grated into creamy sauces, baked goods, and spiced beverages." },
    { id: 19, name: "Red Chilli Powder", image: "/assets/Spices/Red chili powder (lal mirch).webp", description: "Fiery red powder used to add heat and vibrant color to curries, marinades, and spice blends." },
    { id: 20, name: "Tej Patta", image: "/assets/Spices/Tej patta.jpg", description: "Indian bay leaf with a subtle clove-cinnamon flavor, used in rice dishes and curries." },
    { id: 21, name: "Turmeric", image: "/assets/Spices/Turmeric.webp", description: "Golden-yellow spice with earthy notes, prized for its anti-inflammatory properties and vibrant color." }
  ];
  
  // Tea data (10 products)
  const tea = [
    { id: 1, name: "Black Tea", image: "/assets/Tea/Black Tea.jpg", description: "Rich and robust black tea with a full-bodied flavor. Perfect for starting your day." },
    { id: 2, name: "Chai Tea", image: "/assets/Tea/Chai Tea.jpg", description: "Aromatic blend of black tea with spices like cardamom, cinnamon, and ginger." },
    { id: 3, name: "Chamomile Tea", image: "/assets/Tea/Chamomile Tea.webp", description: "Soothing herbal tea with delicate floral notes, perfect for relaxation." },
    { id: 4, name: "Darjeeling Tea", image: "/assets/Tea/Darjeeling Tea.webp", description: "The 'champagne of teas' with a distinctive muscatel flavor and floral aroma." },
    { id: 5, name: "Green Tea", image: "/assets/Tea/Green Tea.webp", description: "Fresh and earthy green tea packed with antioxidants and light caffeine." },
    { id: 6, name: "Herbal Tea", image: "/assets/Tea/Herbal Tea.webp", description: "Caffeine-free infusion of herbs and botanicals with a mild, soothing taste." },
    { id: 7, name: "Irani Chai", image: "/assets/Tea/Irani Chai.jpg", description: "Creamy and sweet tea with a rich texture, perfect for dessert pairings." },
    { id: 8, name: "Lemongrass Tea", image: "/assets/Tea/Lemongrass Tea.webp", description: "Citrusy and refreshing tea with a hint of sweetness and calming properties." },
    { id: 9, name: "Masala Chai", image: "/assets/Tea/Masala Chai.jpg", description: "Spiced Indian tea with bold flavors of cinnamon, cloves, and black pepper." },
    { id: 10, name: "Matcha Tea", image: "/assets/Tea/Matcha Tea.jpg", description: "Vibrant green tea powder with a rich umami flavor and energizing benefits." },
    { id: 11, name: "Mate Tea", image: "/assets/Tea/Mate Tea.webp", description: "Energizing South American tea with a bold, earthy flavor and high caffeine." },
    { id: 12, name: "Nilgiri Tea", image: "/assets/Tea/Nilgiri Tea.webp", description: "Fragrant Indian tea with a brisk, fruity flavor and floral undertones." },
    { id: 13, name: "Oolong Tea", image: "/assets/Tea/Oolong Tea Wulong Tea.webp", description: "Semi-oxidized tea with a balance of green and black tea characteristics." },
    { id: 14, name: "Peach Tea", image: "/assets/Tea/Peach Tea.jpg", description: "Sweet and fruity tea with the juicy flavor of ripe peaches and a light aroma." },
    { id: 15, name: "Pu-erh Tea", image: "/assets/Tea/Pu-erh Tea (Puer Tea).jpg", description: "Aged Chinese tea with a deep, earthy flavor and digestive health benefits." },
    { id: 16, name: "Rooibos Tea", image: "/assets/Tea/Rooibos Tea.webp", description: "South African red tea with a naturally sweet taste and antioxidant properties." },
    { id: 17, name: "Tandoori Tea", image: "/assets/Tea/Tandoori Chai.webp", description: "Unique spiced tea with a smoky flavor inspired by traditional tandoor cooking." },
    { id: 18, name: "White Tea", image: "/assets/Tea/White Tea.webp", description: "Delicate and subtly sweet tea with minimal processing and a light aroma." }
];
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Restaurant Owner",
      content: "The quality of dry fruits and spices from FIGS Dubai has transformed our dishes. Our customers can taste the difference, and we've received numerous compliments on our new menu items that feature these premium ingredients.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/43.jpg"
    },
    {
      id: 2,
      name: "Ahmed Al-Mansoori",
      title: "Wholesale Distributor",
      content: "As a distributor of gourmet products, I've worked with many suppliers, but FIGS Dubai stands out for their consistency and reliability. Their products are always fresh, and their business practices are professional and transparent.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Priya Sharma",
      title: "Tea Enthusiast",
      content: "Their tea collection is exceptional! I've been a tea connoisseur for years, and the varieties offered by FIGS Dubai are among the finest I've tasted. The Darjeeling and Masala Chai are particular favorites.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  // Product Card Component
  const ProductCard = ({ product, category }) => {
    const handleWhatsAppInquiry = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const message = encodeURIComponent(`Hi, I'm interested in the ${product.name}. Could you please provide more information about availability and pricing?`);
      const whatsappUrl = `https://wa.me/8882855844?text=${message}`;
      window.open(whatsappUrl, '_blank');
    };

    // Determine badge text based on category
    const getBadgeText = () => {
      switch(category) {
        case 'dry-fruits':
          return 'Dry Fruit';
        case 'spices':
          return 'Spice';
        case 'tea':
          return 'Premium Tea';
        default:
          return category;
      }
    };

    return (
      <div className="product-card" data-aos="fade-up">
        <Link to={`/product/${category}/${product.id}`} className="product-link">
          <div className="product-badge">{getBadgeText()}</div>
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">
              {product.description.length > 100 
                ? `${product.description.substring(0, 100)}...` 
                : product.description}
            </p>
            <div className="product-price">42.50 AED</div>
            <div className="product-unit-price">85.00 AED/kg</div>
            <div className="product-origin">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              India
            </div>
            <div className="product-benefits">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Health Benefits
            </div>
            <button 
              className="enquiry-btn"
              onClick={handleWhatsAppInquiry}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.199-.57-.349m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Enquire on WhatsApp
            </button>
          </div>
        </Link>
      </div>
    );
  };

  // Horizontal Scrollable Section Component
  const ScrollableProductSection = ({ title, description, products, category, reference }) => {
    const scrollContainerRef = useRef(null);
    
    const handleScroll = (direction) => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        // Adjust scroll amount to show exactly 4 cards at a time
        const cardWidth = container.querySelector('.product-grid-item').offsetWidth;
        const scrollAmount = direction === 'left' ? -(cardWidth * 4) : (cardWidth * 4);
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };
    
    return (
      <section className={`product-section ${category}-section`} ref={reference}>
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">{title}</h2>
          <div className="title-underline"></div>
          <p className="section-description">{description}</p>
        </div>
        
        <div className="scrollable-container">
          <div className="products-row four-cards-per-row" ref={scrollContainerRef}>
            {products.map(product => (
              <div className="product-grid-item" key={product.id}>
                <ProductCard product={product} category={category} />
              </div>
            ))}
          </div>
          <div className="scroll-arrows">
            <button className="scroll-arrow scroll-left" aria-label="Scroll left" onClick={() => handleScroll('left')}>
              &#10094;
            </button>
            <button className="scroll-arrow scroll-right" aria-label="Scroll right" onClick={() => handleScroll('right')}>
              &#10095;
            </button>
          </div>
        </div>
        
        <div className="view-all-container" data-aos="fade-up">
          <Link to={category === "dry-fruits" ? "/products/dry-fruits" : 
                     category === "spices" ? "/products/spices" : 
                     "/products/tea"} className="view-all-btn">
            View All {title}
          </Link>
        </div>
      </section>
    );
  };

  // Testimonial Card Component
  const TestimonialCard = ({ testimonial }) => {
    return (
      <div className="testimonial-card" data-aos="fade-up">
        <div className="testimonial-rating">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="star">★</span>
          ))}
        </div>
        <div className="testimonial-content">
          <p>"{testimonial.content}"</p>
        </div>
        <div className="testimonial-author">
          <img src={testimonial.image} alt={testimonial.name} className="author-image" />
          <div className="author-info">
            <h4 className="author-name">{testimonial.name}</h4>
            <p className="author-title">{testimonial.title}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home-container">
      {/* Hero Banner Carousel Section */}
      <section className="hero-carousel">
        <div className="carousel-slides-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {bannerSlides.map((slide, index) => (
            <div 
              key={slide.id} 
              className="carousel-slide"
              style={{ background: slide.backgroundColor }}
            >
              <div className="carousel-content">
                <h1 className="carousel-title">{slide.title}</h1>
                <p className="carousel-subtitle">{slide.subtitle}</p>
                <div className="carousel-cta">
                  <button 
                    className="carousel-btn primary"
                    onClick={() => {
                      const ref = slide.buttonLink === 'dry-fruits' ? dryFruitsRef 
                               : slide.buttonLink === 'spices' ? spicesRef 
                               : teaRef;
                      scrollToSection(ref);
                    }}
                  >
                    {slide.buttonText}
                  </button>
                  <Link to="/about" className="carousel-btn secondary">
                    Learn More About Us
                  </Link>
                </div>
              </div>
              <div className="carousel-image">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-control prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="carousel-control next" onClick={nextSlide}>
          &#10095;
        </button>
        
        <div className="carousel-indicators">
          {bannerSlides.map((_, index) => (
            <button 
              key={index} 
              className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Dry Fruits Section */}
      <ScrollableProductSection 
        title="Premium Dry Fruits"
        description="Discover our wide range of premium-quality dry fruits sourced from the finest farms globally. Perfect for health-conscious consumers and gourmet enthusiasts alike."
        products={dryFruits}
        category="dry-fruits"
        reference={dryFruitsRef}
      />

      {/* Spices Section */}
      <ScrollableProductSection 
        title="Premium Spices"
        description="Experience the rich aroma and authentic taste of our handpicked spices, sourced directly from their origins."
        products={spices}
        category="spices"
        reference={spicesRef}
      />

      {/* Tea Section */}
      <ScrollableProductSection 
        title="Premium Tea"
        description="Savor the exquisite flavors of our premium teas, carefully curated for every tea lover."
        products={tea}
        category="tea"
        reference={teaRef}
      />

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">What Our Customers Say</h2>
            <div className="title-underline"></div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-bg-overlay"></div>
        <div className="container">
          <div className="cta-content" data-aos="fade-up">
            <h2 className="cta-title" data-aos="zoom-in" data-aos-delay="100">Ready to Experience Premium Quality?</h2>
            <div className="cta-features" data-aos="fade-up" data-aos-delay="200">
              <div className="cta-feature">
                <div className="feature-icon">🌍</div>
                <h3>Global Sourcing</h3>
                <p>Products sourced from the finest regions worldwide</p>
              </div>
              <div className="cta-feature">
                <div className="feature-icon">✓</div>
                <h3>Quality Guaranteed</h3>
                <p>Strict quality testing for every product</p>
              </div>
              <div className="cta-feature">
                <div className="feature-icon">🚚</div>
                <h3>Fast Shipping</h3>
                <p>Delivery to over 50+ countries</p>
              </div>
            </div>
            <p className="cta-description" data-aos="fade-up" data-aos-delay="300">
              Contact us today to discuss your wholesale requirements or place a retail order.
              <span className="cta-highlight">New customers receive 10% off their first order!</span>
            </p>
            <div className="cta-form" data-aos="fade-up" data-aos-delay="400">
              <input type="email" placeholder="Enter your email" className="cta-input" />
              <button className="cta-submit">Subscribe</button>
            </div>
            <div className="cta-buttons" data-aos="fade-up" data-aos-delay="500">
              <Link to="/contact" className="cta-button primary">
                <span className="button-text">Contact Us</span>
                <span className="button-icon">→</span>
              </Link>
              <Link to="/shop" className="cta-button secondary">
                <span className="button-text">Shop Now</span>
                <span className="button-icon">🛒</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof">
        <div className="container">
          <div className="partners-grid" data-aos="fade-up">
            <div className="partner-logo">Trusted by 500+ businesses worldwide</div>
            <div className="partner-logo">Featured in Dubai Business Magazine</div>
            <div className="partner-logo">ISO 9001 Certified</div>
            <div className="partner-logo">Member of Dubai Chamber of Commerce</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import Spinner from '../components/Spinner';
import '../styles/ProductDetail.css';

const SpiceDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { t } = useLanguage();
  
  // All spice products data based on the images in assets/Spices folder
  const spiceProducts = [
    {
      id: 1,
      name: 'Anise',
      image: '/assets/Spices/Anise.webp',
      description: 'Aromatic spice with a licorice-like flavor, popular in both sweet and savory dishes across many cuisines.',
      longDescription: 'Anise, with its distinctive licorice-like flavor, is a versatile spice used in cuisines worldwide. The star-shaped fruits are harvested just before ripening and dried before use. Anise is commonly used in baking, particularly in Mediterranean and European desserts, as well as in alcoholic beverages like ouzo and sambuca. It pairs beautifully with fish dishes and is a key component in many spice blends from Chinese five-spice to Indian garam masala.',
      origin: 'Mediterranean region',
      culinaryUses: 'Baking, beverages, meat preparation, fish dishes, spice blends',
      healthBenefits: 'May aid digestion, has antimicrobial properties, and could help with respiratory conditions',
      price: 6.99,
      unit: '100g',
      inStock: true
    },
    {
      id: 2,
      name: 'Asafoetida',
      image: '/assets/Spices/Asafoetida.webp',
      description: 'Pungent spice used in small amounts to add a savory, umami flavor to dishes, especially in Indian cuisine.',
      longDescription: 'Asafoetida, also known as "hing" in Indian cuisine, is a powerful spice derived from the dried sap of a species of giant fennel. Despite its strong, somewhat unpleasant smell when raw, it transforms during cooking into a smooth, garlicky-onion flavor that enhances many dishes. Used in tiny quantities, it\'s particularly valued in vegetarian cooking where it adds depth and umami. In addition to its culinary uses, asafoetida has been used in traditional medicine for centuries.',
      origin: 'Iran and Afghanistan',
      culinaryUses: 'Lentil dishes, vegetable preparations, pickles, adds umami flavor to food',
      healthBenefits: 'Aids digestion, may reduce flatulence, has anti-inflammatory properties',
      price: 8.49,
      unit: '50g',
      inStock: true
    },
    {
      id: 3,
      name: 'Basil',
      image: '/assets/Spices/Basil.jpg',
      description: 'Aromatic herb with a sweet, slightly peppery flavor, essential in Mediterranean and many Asian cuisines.',
      longDescription: 'Basil is a tender herb belonging to the mint family, revered for its aromatic leaves that can range in flavor from sweet to slightly peppery. There are numerous varieties of basil, including sweet basil, Thai basil, and holy basil, each with its distinct flavor profile. Fresh basil leaves are commonly used in Mediterranean cuisine, particularly Italian, where it\'s a key ingredient in pesto. In Southeast Asian cuisines, varieties like Thai basil are essential in dishes such as curries and stir-fries.',
      origin: 'India, originally, now cultivated worldwide',
      culinaryUses: 'Pesto, tomato dishes, salads, Mediterranean cuisine, Asian dishes',
      healthBenefits: 'Rich in antioxidants, anti-inflammatory properties, may help lower blood sugar',
      price: 4.99,
      unit: 'Bunch',
      inStock: true
    },
    {
      id: 4,
      name: 'Bay Leaf',
      image: '/assets/Spices/Bay leaf.jpg',
      description: 'Aromatic leaf used to flavor soups, stews, and braises, removed before serving.',
      longDescription: 'Bay leaves come from the bay laurel tree and are used to add a complex, herbal flavor to slow-cooked dishes. They release their flavor gradually during cooking, infusing dishes with a subtle depth that\'s difficult to replicate. While bay leaves are typically removed before serving as they remain tough even after cooking, their contribution to the overall flavor profile is significant. Bay leaves can be used fresh or dried, with dried leaves having a stronger, more concentrated flavor.',
      origin: 'Mediterranean region',
      culinaryUses: 'Soups, stews, sauces, marinades, rice dishes',
      healthBenefits: 'Contains anti-inflammatory compounds, may help with digestion, rich in vitamins',
      price: 3.99,
      unit: '50g',
      inStock: true
    },
    {
      id: 5,
      name: 'Black Cardamom',
      image: '/assets/Spices/Black cardamom.webp',
      description: 'Smoky, robust spice used in savory dishes and garam masala blends in Indian cuisine.',
      longDescription: 'Black cardamom, larger and distinctly different from green cardamom, offers a bold, smoky flavor profile thanks to the method of drying over open flames. The pods contain small, sticky seeds that carry an intense, camphor-like aroma. Black cardamom is primarily used in savory dishes, particularly in Northern Indian, Nepalese, and Chinese cuisines. It\'s a common ingredient in spice blends like garam masala and biryanis, where it adds depth and complexity.',
      origin: 'Nepal, India, and Bhutan',
      culinaryUses: 'Curries, rice dishes, spice blends, meat dishes, lentil preparations',
      healthBenefits: 'May help with gastrointestinal issues, has antimicrobial properties, can aid respiratory health',
      price: 7.99,
      unit: '50g',
      inStock: true
    },
    {
      id: 6,
      name: 'Black Cumin',
      image: '/assets/Spices/Black cumin.webp',
      description: 'Earthy, slightly bitter spice used in Middle Eastern, Indian, and North African cuisines.',
      longDescription: 'Black cumin, also known as Nigella sativa or "kalonji," features small, black, crescent-shaped seeds with a complex flavor profile that includes notes of onions, black pepper, and oregano. This spice has been used for thousands of years in cuisines across the Middle East, Mediterranean, and South Asia. The seeds are often toasted to enhance their nutty, earthy flavor before being used in cooking. They\'re particularly popular as a topping for bread and in spice blends, adding both flavor and visual appeal.',
      origin: 'Southwest Asia and the Mediterranean',
      culinaryUses: 'Bread topping, curries, vegetable dishes, pickles, spice blends',
      healthBenefits: 'Rich in antioxidants, may help lower cholesterol, has anti-inflammatory properties',
      price: 6.49,
      unit: '100g',
      inStock: true
    },
    {
      id: 7,
      name: 'Black Pepper',
      image: '/assets/Spices/Black pepper.webp',
      description: 'The world\'s most traded spice, adding heat and depth to countless dishes across global cuisines.',
      longDescription: 'Black pepper, often called the "king of spices," is produced from the still-green, unripe drupes of the pepper plant. The drupes are cooked briefly and then dried, causing them to shrivel and become dark black or brown. Black pepper offers a complex heat that develops slowly on the palate, along with hints of citrus, wood, and earthiness. It\'s one of the most versatile spices, used in virtually every cuisine worldwide to enhance and deepen flavor profiles in both savory and sweet dishes.',
      origin: 'Southern India, now cultivated in many tropical regions',
      culinaryUses: 'Universal seasoning, meat preparation, sauces, soups, marinades',
      healthBenefits: 'Contains piperine which may aid nutrient absorption, has antioxidant properties',
      price: 5.99,
      unit: '100g',
      inStock: true
    },
    {
      id: 8,
      name: 'Caraway',
      image: '/assets/Spices/Caraway.webp',
      description: 'Aromatic seeds with a distinctive earthy anise-like flavor, popular in European cuisines.',
      longDescription: 'Caraway seeds come from a biennial plant in the same family as carrots and parsley. These crescent-shaped seeds have a distinctive warm, earthy flavor with notes of anise and citrus. Caraway is a signature flavor in many European cuisines, particularly German, Austrian, and Eastern European. The seeds are commonly used in rye bread, sauerkraut, and various meat dishes. In addition to the seeds, caraway leaves and roots are also used in cooking, offering a similar but milder flavor profile.',
      origin: 'Europe and Western Asia',
      culinaryUses: 'Rye bread, sauerkraut, cheeses, pork dishes, vegetable preparations',
      healthBenefits: 'May aid digestion, has antimicrobial properties, can help relieve bloating',
      price: 4.49,
      unit: '75g',
      inStock: true
    },
    {
      id: 9,
      name: 'Cardamom',
      image: '/assets/Spices/Cardamom.webp',
      description: 'Intensely aromatic spice with a complex sweet-spicy flavor, used in both sweet and savory dishes.',
      longDescription: 'Green cardamom, often referred to simply as cardamom, is one of the world\'s most expensive spices by weight. Its complex flavor profile combines elements of mint, lemon, and eucalyptus in tiny, intensely aromatic pods. Each pod contains small black seeds which hold most of the flavor. Cardamom is integral to Indian and Middle Eastern cuisines, used in everything from spice blends to desserts and coffee. In Scandinavian countries, it\'s a popular flavoring for baked goods.',
      origin: 'Southern India',
      culinaryUses: 'Curries, rice dishes, coffee, teas, baked goods, desserts',
      healthBenefits: 'Aids digestion, has antimicrobial properties, may help with oral health',
      price: 9.99,
      unit: '50g',
      inStock: true
    },
    {
      id: 10,
      name: 'Carom Seeds',
      image: '/assets/Spices/Carom seeds.webp',
      description: 'Pungent, aromatic seeds with thyme-like flavor, used in Indian breads and savory dishes.',
      longDescription: 'Carom seeds, also known as ajwain or bishop\'s weed, are tiny, ridged seeds with a flavor profile similar to thyme but more intense, with notes of anise and oregano. Despite their name, they\'re actually fruits rather than seeds. Carom is particularly popular in Indian cuisine, where it\'s used in breads like parathas and in legume dishes to aid digestion. The seeds are typically dry-roasted or tempered in hot oil to release their flavor before being added to dishes.',
      origin: 'India and the Eastern Mediterranean',
      culinaryUses: 'Indian breads, legume dishes, vegetable preparations, chutneys',
      healthBenefits: 'Aids digestion, may help with respiratory conditions, has antimicrobial properties',
      price: 5.49,
      unit: '75g',
      inStock: true
    },
    {
      id: 11,
      name: 'Coriander',
      image: '/assets/Spices/Coriander.jpg',
      description: 'Fresh herb with bright, citrusy flavor, used as garnish and ingredient in many world cuisines.',
      longDescription: 'Coriander leaves, also known as cilantro or Chinese parsley, are the fresh leafy herb from the coriander plant. The bright, citrusy flavor of coriander leaves has a distinctive quality that people tend to either love or hate. Fresh coriander is widely used across Asian, Middle Eastern, and Latin American cuisines as both an ingredient and garnish. The herb adds a fresh, vibrant note to dishes and is typically added toward the end of cooking or as a finishing touch to preserve its flavor and color.',
      origin: 'Mediterranean and Middle East, now cultivated worldwide',
      culinaryUses: 'Garnish for curries, soups, salads, salsas, chutneys',
      healthBenefits: 'Rich in antioxidants, may help lower blood sugar, contains immune-boosting compounds',
      price: 3.99,
      unit: 'Bunch',
      inStock: true
    },
    {
      id: 12,
      name: 'Coriander Seed',
      image: '/assets/Spices/Coriander seed.webp',
      description: 'Warm, citrusy spice used whole or ground in countless dishes across global cuisines.',
      longDescription: 'Coriander seeds are the dried fruit of the coriander plant, offering a completely different flavor profile from the fresh leaves. When dried, the seeds develop a warm, aromatic, slightly citrusy flavor with subtle notes of sage. Coriander seed is one of the oldest known spices, used in cuisines worldwide from Indian and Middle Eastern to Latin American and European. The seeds can be used whole or ground, with toasting often recommended to enhance their flavor before grinding.',
      origin: 'Mediterranean and Middle East',
      culinaryUses: 'Curries, spice blends, pickling spice, meat rubs, breads',
      healthBenefits: 'May help lower cholesterol, has anti-inflammatory properties, aids digestion',
      price: 4.29,
      unit: '100g',
      inStock: true
    },
    {
      id: 13,
      name: 'Cumin',
      image: '/assets/Spices/Cumin.jpg',
      description: 'Earthy, warming spice essential in Middle Eastern, Indian, Mexican, and many other cuisines.',
      longDescription: 'Cumin is derived from the dried seed of the herb Cuminum cyminum, a member of the parsley family. It features a distinctive warm, earthy flavor with hints of citrus and bitterness. One of the most consumed spices in the world, cumin is essential to numerous global cuisines, particularly Middle Eastern, Indian, North African, and Mexican. The seeds can be used whole, particularly in tempering, or ground into powder for spice blends and rubs. Toasting cumin seeds before use enhances their rich, nutty flavor profile.',
      origin: 'Middle East and Mediterranean',
      culinaryUses: 'Curries, chili, taco seasoning, spice blends, rice dishes',
      healthBenefits: 'Rich in iron, may aid digestion, has antioxidant properties',
      price: 5.49,
      unit: '100g',
      inStock: true
    },
    {
      id: 14,
      name: 'Curry Leaves',
      image: '/assets/Spices/Curry leaves.jpg',
      description: 'Aromatic leaves with a unique citrus-like flavor, essential in South Indian cuisine.',
      longDescription: 'Curry leaves come from the curry tree (Murraya koenigii) and, despite their name, are not related to curry powder. These glossy, aromatic leaves have a unique flavor profile that includes notes of citrus, anise, and something distinctly their own. Curry leaves are integral to South Indian cuisine, where they\'re typically tempered in hot oil at the beginning of cooking to release their flavor. While dried curry leaves are available, they lose much of their aroma and flavor, making fresh leaves highly prized outside regions where they\'re cultivated.',
      origin: 'Indian subcontinent',
      culinaryUses: 'South Indian curries, chutneys, rice dishes, lentil preparations',
      healthBenefits: 'Rich in antioxidants, may help regulate blood sugar, has anti-inflammatory properties',
      price: 4.99,
      unit: 'Bunch',
      inStock: true
    },
    {
      id: 15,
      name: 'Fennel',
      image: '/assets/Spices/Fennel.webp',
      description: 'Sweet, anise-flavored seeds used in both sweet and savory dishes across many cuisines.',
      longDescription: 'Fennel seeds are the dried fruits of the fennel plant, a flowering herb related to carrots. These oval-shaped seeds have a sweet, licorice-like flavor similar to anise but milder and more subtle. Fennel seeds are widely used in cuisines across the globe, from Indian to Italian to Chinese. They\'re particularly popular in Mediterranean cooking, where they\'re used in sausages, bread, and fish dishes. In Indian cuisine, fennel seeds are often served after meals as a breath freshener and digestive aid.',
      origin: 'Mediterranean region',
      culinaryUses: 'Sausages, fish dishes, bread, curries, teas',
      healthBenefits: 'Aids digestion, may help with respiratory issues, has antioxidant properties',
      price: 5.29,
      unit: '75g',
      inStock: true
    },
    {
      id: 16,
      name: 'Fenugreek',
      image: '/assets/Spices/Fenugreek.jpg',
      description: 'Bitter, maple-like flavor that\'s essential in Indian and Middle Eastern cuisines.',
      longDescription: 'Fenugreek seeds come from a plant in the legume family and are characterized by their distinctive bitter taste and strong maple syrup-like aroma. The small, hard, rectangular seeds are used both whole and ground in many cuisines, particularly Indian, where they\'re a common ingredient in spice blends like panch phoron and sambar powder. Fenugreek leaves, both fresh and dried (called kasuri methi), are also used as herbs, offering a milder version of the seeds\' flavor profile.',
      origin: 'Mediterranean region and Western Asia',
      culinaryUses: 'Curries, spice blends, pickles, breads, vegetable dishes',
      healthBenefits: 'May help control blood sugar, supports breastfeeding mothers, has anti-inflammatory properties',
      price: 4.49,
      unit: '100g',
      inStock: true
    },
    {
      id: 17,
      name: 'Garam Masala',
      image: '/assets/Spices/Garam Masala.webp',
      description: 'Warming spice blend featuring cardamom, cinnamon, cloves, and other spices, essential in Indian cuisine.',
      longDescription: 'Garam masala is a fragrant spice blend widely used in Indian cuisine. The term "garam" means hot or heating, referring not to chili heat but to the warming effect these spices have in the body according to traditional Ayurvedic medicine. While recipes vary by region and family tradition, common ingredients include black peppercorns, cloves, cinnamon, cardamom, cumin, and coriander. Unlike many spice blends, garam masala is typically added toward the end of cooking to preserve its aromatic qualities.',
      origin: 'Indian subcontinent',
      culinaryUses: 'Curries, lentil dishes, meat preparations, vegetable dishes',
      healthBenefits: 'Contains antioxidants from various spices, may aid digestion, has anti-inflammatory properties',
      price: 7.99,
      unit: '75g',
      inStock: true
    },
    {
      id: 18,
      name: 'Ginger',
      image: '/assets/Spices/Ginger.jpg',
      description: 'Pungent, spicy root used fresh or dried in cuisines worldwide, especially Asian and Caribbean dishes.',
      longDescription: 'Ginger is the rhizome (underground stem) of the plant Zingiber officinale, prized for its distinctive pungent, spicy flavor. Fresh ginger has a bright, slightly sweet heat, while dried and ground ginger offers a warmer, more mellow flavor profile. Ginger is incredibly versatile, used in cuisines worldwide in both savory and sweet applications. In Asian cuisines, it\'s often used as a base flavor along with garlic and scallions, while in Western cooking, it\'s popular in baked goods and beverages.',
      origin: 'Maritime Southeast Asia, now cultivated worldwide in tropical regions',
      culinaryUses: 'Stir-fries, curries, marinades, baked goods, teas, juices',
      healthBenefits: 'May help with nausea, has anti-inflammatory properties, can aid digestion',
      price: 4.99,
      unit: '250g',
      inStock: true
    },
    {
      id: 19,
      name: 'Nutmeg',
      image: '/assets/Spices/Nutmeg.webp',
      description: 'Warm, aromatic spice used in sweet dishes, baked goods, and savory foods like potato dishes.',
      longDescription: 'Nutmeg is the seed kernel inside the fruit of the nutmeg tree, prized for its warm, aromatic sweetness. The spice has a complex flavor profile with notes of clove, pine, and camphor. Nutmeg is widely used in cuisines around the world, adding depth to both sweet dishes like baked goods and custards and savory foods like potato dishes and cream sauces. It\'s almost always used in small quantities due to its potency and becomes bitter if overused. The same fruit that produces nutmeg also yields mace, another spice derived from the reddish covering of the nutmeg seed.',
      origin: 'Banda Islands in Indonesia, now cultivated in various tropical regions',
      culinaryUses: 'Baked goods, custards, egg dishes, potato dishes, cream sauces',
      healthBenefits: 'Contains antioxidants, may help with sleep quality, has antimicrobial properties',
      price: 8.99,
      unit: '50g',
      inStock: true
    },
    {
      id: 20,
      name: 'Red Chili Powder',
      image: '/assets/Spices/Red chili powder (lal mirch).webp',
      description: 'Vibrant, hot spice made from ground dried chili peppers, essential in many world cuisines.',
      longDescription: 'Red chili powder is made from ground dried red chili peppers and varies in heat level depending on the variety of pepper used. This vibrant red spice is ubiquitous in cuisines worldwide, from Indian and Thai to Mexican and Spanish. Beyond heat, chilies contribute complex flavor notes that can range from fruity and bright to smoky and earthy. In Indian cuisine, red chili powder (lal mirch) is one of the most basic and essential spices, used in nearly every savory dish to add both color and spice.',
      origin: 'Americas, now cultivated worldwide',
      culinaryUses: 'Curries, marinades, rubs, sauces, stews',
      healthBenefits: 'Contains capsaicin which may boost metabolism, rich in vitamins A and C',
      price: 5.49,
      unit: '100g',
      inStock: true
    },
    {
      id: 21,
      name: 'Tej Patta',
      image: '/assets/Spices/Tej Patta.jpg',
      description: 'Indian bay leaf with a more complex cinnamon-like flavor, used in many North Indian dishes.',
      longDescription: 'Tej patta, or Indian bay leaf, comes from the Cinnamomum tamala tree and differs from the Mediterranean bay leaf in both appearance and flavor. These large, three-veined leaves have a more complex flavor profile that includes notes of cinnamon, cloves, and cassia. Tej patta is widely used in North Indian, Nepalese, and Bhutanese cuisines, particularly in rice dishes, curries, and masalas. Like Mediterranean bay leaves, they\'re typically added whole and removed before serving.',
      origin: 'Indian subcontinent, particularly Northern India and Nepal',
      culinaryUses: 'Rice dishes, curries, spice blends, biryanis, lentil dishes',
      healthBenefits: 'Contains essential oils with antimicrobial properties, may aid digestion',
      price: 4.29,
      unit: '50g',
      inStock: true
    },
    {
      id: 22,
      name: 'Turmeric',
      image: '/assets/Spices/Turmeric.webp',
      description: 'Brilliant yellow spice with earthy flavor, used for color and health benefits in many cuisines.',
      longDescription: 'Turmeric is the ground rhizome of the Curcuma longa plant, instantly recognizable by its brilliant golden-yellow color. It has an earthy, slightly bitter flavor with notes of pepper and mustard. Turmeric is a staple in many Asian cuisines, particularly Indian, where it\'s used in nearly every curry for both its color and flavor. Beyond its culinary applications, turmeric has been used in traditional medicine for thousands of years and is now popular worldwide for its potential health benefits, largely attributed to the compound curcumin.',
      origin: 'Indian subcontinent and Southeast Asia',
      culinaryUses: 'Curries, rice dishes, soups, smoothies, golden milk',
      healthBenefits: 'Contains curcumin with strong anti-inflammatory and antioxidant properties',
      price: 6.49,
      unit: '100g',
      inStock: true
    }
  ];

  useEffect(() => {
    // Simulate fetching product data
    setLoading(true);
    
    const timer = setTimeout(() => {
      const foundProduct = spiceProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Handle WhatsApp inquiry
  const handleWhatsAppInquiry = () => {
    if (!product) return;
    
    const message = encodeURIComponent(`Hi, I'm interested in the ${product.name} spice. Could you please provide more information about availability and pricing?`);
    const whatsappUrl = `https://wa.me/971551234567?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="back-link">
            <Link to="/products/spices">
              <FaArrowLeft /> {t('backToProducts')}
            </Link>
          </div>
          <div className="not-found">
            <h2>Product Not Found</h2>
            <p>Sorry, the spice you're looking for does not exist or has been removed.</p>
            <Link to="/products/spices" className="button primary">View All Spices</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="back-link">
          <Link to="/products/spices">
            <FaArrowLeft /> {t('backToProducts')}
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
                <h3>Culinary Uses</h3>
                <p>{product.culinaryUses}</p>
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
            {spiceProducts
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="related-product-card">
                  <Link to={`/product/spices/${relatedProduct.id}`}>
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
      </div>
    </div>
  );
};

export default SpiceDetail; 
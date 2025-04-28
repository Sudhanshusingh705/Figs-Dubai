import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaWhatsapp, FaLeaf, FaSeedling, FaMugHot } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Products.css';
import { Helmet } from 'react-helmet-async';

// Error boundary component to catch rendering errors
class ErrorBoundary extends Component {
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

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { t } = useLanguage();

  // Fix issues with product data
  const ensureValidProducts = (products) => {
    return products.map(product => ({
      ...product,
      // Ensure required fields have defaults
      id: product.id || `id-${Math.random().toString(36).substr(2, 9)}`,
      name: product.name || 'Unnamed Product',
      price: product.price || 0,
      description: product.description || 'No description available',
      category: product.category || 'uncategorized'
    }));
  };

  // Product data organized by category
  const dryFruitsRaw = [
    {
      id: 'df1',
      name: 'Almonds',
      price: 45.99,
      image: '/assets/Dry Fruits/Almonds.png',
      description: 'Sourced from the finest orchards, our almonds are known for their exceptional taste and quality.',
      category: 'dry-fruits'
    },
    {
      id: 'df2',
      name: 'Walnuts Akhrot',
      price: 52.99,
      image: '/assets/Dry Fruits/Walnuts Akhrot.png',
      description: 'Directly imported from the valleys of Kashmir, these walnuts are packed with nutrients and flavor.',
      category: 'dry-fruits'
    },
    {
      id: 'df3',
      name: 'Dates Khajoor',
      price: 38.50,
      image: '/assets/Dry Fruits/Dates Khajoor.png',
      description: 'Known as the king of dates, our Medjool dates are naturally sweet and incredibly nutritious.',
      category: 'dry-fruits'
    },
    {
      id: 'df4',
      name: 'Pistachios Pista',
      price: 65.99,
      image: '/assets/Dry Fruits/Pistachios Pista.png',
      description: 'Premium pistachios from Iran, renowned for their distinctive flavor and beautiful green color.',
      category: 'dry-fruits'
    },
    {
      id: 'df5',
      name: 'Apricots Khubani',
      price: 35.75,
      image: '/assets/Dry Fruits/Apricots Khubani.png',
      description: 'Soft and tangy dried apricots, perfect for snacking or adding to desserts and salads.',
      category: 'dry-fruits'
    },
    {
      id: 'df6',
      name: 'Betel Nut',
      price: 28.99,
      image: '/assets/Dry Fruits/Betel nut.png',
      description: 'Chewy and mildly sweet betel nuts, often used in traditional practices and cultural ceremonies.',
      category: 'dry-fruits'
    },
    {
      id: 'df7',
      name: 'Brazil Nuts',
      price: 48.50,
      image: '/assets/Dry Fruits/Brazil nuts.png',
      description: 'Rich and creamy Brazil nuts, packed with selenium and essential nutrients for a healthy diet.',
      category: 'dry-fruits'
    },
    {
      id: 'df8',
      name: 'Cashews Kaju',
      price: 58.99,
      image: '/assets/Dry Fruits/Cashews Kaju.png',
      description: 'Buttery and crunchy cashews, ideal for snacking or enhancing both savory and sweet dishes.',
      category: 'dry-fruits'
    },
    {
      id: 'df9',
      name: 'Chestnut',
      price: 42.00,
      image: '/assets/Dry Fruits/Chestnut.png',
      description: 'Sweet and nutty chestnuts, perfect for roasting or incorporating into holiday recipes.',
      category: 'dry-fruits'
    },
    {
      id: 'df10',
      name: 'Chia Seeds',
      price: 32.99,
      image: '/assets/Dry Fruits/Chia seeds.png',
      description: 'Tiny but mighty chia seeds, loaded with omega-3s and fiber for a nutritious boost.',
      category: 'dry-fruits'
    },
    {
      id: 'df11',
      name: 'Cinnamon',
      price: 25.50,
      image: '/assets/Dry Fruits/Cinnamon.jpg',
      description: 'Warm and sweet cinnamon, a versatile spice for baking, beverages, and savory dishes.',
      category: 'dry-fruits'
    },
    {
      id: 'df12',
      name: 'Clove',
      price: 30.00,
      image: '/assets/Dry Fruits/Cloves.jpg',
      description: 'Aromatic and pungent cloves, used sparingly to add depth to curries, stews, and baked goods.',
      category: 'dry-fruits'
    },
    {
      id: 'df13',
      name: 'Corn Nuts',
      price: 22.99,
      image: '/assets/Dry Fruits/Corn nuts.png',
      description: 'Crunchy and salty corn nuts, a popular snack with bold flavors and a satisfying texture.',
      category: 'dry-fruits'
    },
    {
      id: 'df14',
      name: 'Cudpahnut',
      price: 60.99,
      image: '/assets/Dry Fruits/Cudpahnut.png',
      description: 'Rare and flavorful Cudpah nuts, prized for their unique taste and health benefits.',
      category: 'dry-fruits'
    },
    {
      id: 'df15',
      name: 'Dried Coconut',
      price: 34.99,
      image: '/assets/Dry Fruits/Dried coconut.png',
      description: 'Shredded dried coconut with a tropical flavor, great for desserts, smoothies, and granola.',
      category: 'dry-fruits'
    },
    {
      id: 'df16',
      name: 'Dried Kiwi',
      price: 40.50,
      image: '/assets/Dry Fruits/Dried Kiwi.png',
      description: 'Tangy and chewy dried kiwi slices, bursting with vitamin C and a zesty flavor.',
      category: 'dry-fruits'
    },
    {
      id: 'df17',
      name: 'Dried Mango',
      price: 36.99,
      image: '/assets/Dry Fruits/Dried Mango.png',
      description: 'Sweet and tangy dried mango, a tropical treat packed with vitamins and antioxidants.',
      category: 'dry-fruits'
    },
    {
      id: 'df18',
      name: 'Dry Plums',
      price: 31.99,
      image: '/assets/Dry Fruits/Dry plums.png',
      description: 'Soft and sweet dried plums, known for their digestive health benefits and rich flavor.',
      category: 'dry-fruits'
    },
    {
      id: 'df19',
      name: 'Fennel',
      price: 24.99,
      image: '/assets/Dry Fruits/Fennel.png',
      description: 'Licorice-flavored fennel seeds, used as a mouth freshener and digestive aid in Indian cuisine.',
      category: 'dry-fruits'
    },
    {
      id: 'df20',
      name: 'Figs Anjeer',
      price: 39.50,
      image: '/assets/Dry Fruits/Figs Anjeer.png',
      description: 'Soft and honey-sweet dried figs, packed with fiber and nutrients for a healthy snack.',
      category: 'dry-fruits'
    },
    {
      id: 'df21',
      name: 'Flax Seeds',
      price: 27.99,
      image: '/assets/Dry Fruits/Flax seeds.png',
      description: 'Nutty flax seeds, rich in omega-3 fatty acids and fiber, perfect for smoothies and baking.',
      category: 'dry-fruits'
    },
    {
      id: 'df22',
      name: 'Fox Nuts Makhana',
      price: 44.99,
      image: '/assets/Dry Fruits/Fox nuts Makhana.png',
      description: 'Light and crunchy fox nuts, a healthy snack roasted or used in Indian sweets and curries.',
      category: 'dry-fruits'
    },
    {
      id: 'df23',
      name: 'Hazelnuts Pahadi Badam',
      price: 54.99,
      image: '/assets/Dry Fruits/Hazelnuts Pahadi Badam.png',
      description: 'Rich and buttery hazelnuts, a delicious addition to desserts, snacks, and nut mixes.',
      category: 'dry-fruits'
    },
    {
      id: 'df24',
      name: 'Macadamia Nuts',
      price: 62.99,
      image: '/assets/Dry Fruits/Macadamia Nuts.png',
      description: 'Creamy and indulgent macadamia nuts, perfect for snacking or baking into cookies.',
      category: 'dry-fruits'
    },
    {
      id: 'df25',
      name: 'Pecans',
      price: 50.99,
      image: '/assets/Dry Fruits/Pecans.png',
      description: 'Buttery and slightly sweet pecans, a favorite in pies, salads, and roasted snacks.',
      category: 'dry-fruits'
    },
    {
      id: 'df26',
      name: 'Pili Nut',
      price: 70.99,
      image: '/assets/Dry Fruits/Pili nut.png',
      description: 'Rich and creamy pili nuts, a rare superfood packed with healthy fats and antioxidants.',
      category: 'dry-fruits'
    },
    {
      id: 'df27',
      name: 'Pine Nuts Chilgoza',
      price: 85.99,
      image: '/assets/Dry Fruits/Pine nuts Chilgoza.png',
      description: 'Delicate and nutty pine nuts, essential for pesto, salads, and gourmet dishes.',
      category: 'dry-fruits'
    },
    {
      id: 'df28',
      name: 'Poppy Seeds',
      price: 29.99,
      image: '/assets/Dry Fruits/Poppy seeds.png',
      description: 'Tiny poppy seeds with a mild nutty flavor, used in baking, curries, and garnishes.',
      category: 'dry-fruits'
    },
    {
      id: 'df29',
      name: 'Prunes Sukha Aloo Bukhara',
      price: 33.99,
      image: '/assets/Dry Fruits/Prunes Sukha Aloo Bukhara.png',
      description: 'Chewy and sweet dried plums, known for their digestive health benefits and rich taste.',
      category: 'dry-fruits'
    },
    {
      id: 'df30',
      name: 'Pumpkin Seed',
      price: 30.99,
      image: '/assets/Dry Fruits/Pumpkin seeds.png',
      description: 'Nutty and crunchy pumpkin seeds, packed with magnesium and perfect for snacks or salads.',
      category: 'dry-fruits'
    },
    {
      id: 'df31',
      name: 'Raisins Kismish',
      price: 26.99,
      image: '/assets/Dry Fruits/Raisins Kishmish.png',
      description: 'Plump and sweet raisins, a versatile ingredient for baking, trail mixes, and savory dishes.',
      category: 'dry-fruits'
    },
    {
      id: 'df32',
      name: 'Sacha Inchi',
      price: 48.99,
      image: '/assets/Dry Fruits/Sacha Inchi.png',
      description: 'Nutty sacha inchi seeds, a Peruvian superfood rich in protein and omega-3 fatty acids.',
      category: 'dry-fruits'
    },
    {
      id: 'df33',
      name: 'Sesame Seeds',
      price: 23.99,
      image: '/assets/Dry Fruits/Sesame seeds.png',
      description: 'Tiny sesame seeds with a nutty flavor, used in tahini, garnishes, and Asian cuisines.',
      category: 'dry-fruits'
    },
    {
      id: 'df34',
      name: 'Sunflower Seeds',
      price: 21.99,
      image: '/assets/Dry Fruits/Sunflower seeds.png',
      description: 'Crunchy sunflower seeds, packed with nutrients and perfect for snacking or salads.',
      category: 'dry-fruits'
    },
    {
      id: 'df35',
      name: 'Tiger Nuts',
      price: 37.99,
      image: '/assets/Dry Fruits/Tiger nuts.png',
      description: 'Sweet and chewy tiger nuts, a prebiotic-rich snack with a nutty flavor despite being tubers.',
      category: 'dry-fruits'
    }
  ];

  const spicesRaw = [
    {
      id: 'sp1',
      name: 'Cardamom',
      price: 18.99,
      image: '/assets/Spices/Cardamom.webp',
      description: 'Our premium cardamom pods are hand-picked to ensure the highest quality and aromatic flavor.',
      category: 'spices'
    },
    {
      id: 'sp2',
      name: 'Saffron',
      price: 124.99,
      image: '/assets/Spices/Saffron.jpg',
      description: 'The finest quality saffron threads, known for their distinctive aroma and rich color.',
      category: 'spices'
    },
    {
      id: 'sp3',
      name: 'Black Pepper',
      price: 12.50,
      image: '/assets/Spices/Black pepper.webp',
      description: 'A premium variety of black pepper known for its complex flavor profile and intense aroma.',
      category: 'spices'
    },
    {
      id: 'sp4',
      name: 'Cinnamon Sticks',
      price: 9.99,
      image: '/assets/Spices/Cinnamon.jpg',
      description: 'Premium Ceylon cinnamon sticks with a sweet, delicate flavor perfect for desserts and beverages.',
      category: 'spices'
    },
    {
      id: 'sp5',
      name: 'Anise',
      price: 10.99,
      image: '/assets/Spices/Anise.webp',
      description: 'Aromatic spice with a licorice-like flavor, popular in both sweet and savory dishes across many cuisines.',
      category: 'spices'
    },
    {
      id: 'sp6',
      name: 'Asafoetida',
      price: 8.99,
      image: '/assets/Spices/Asafoetida.webp',
      description: 'Pungent spice used in small amounts to add a savory, umami flavor to dishes, especially in Indian cuisine.',
      category: 'spices'
    },
    {
      id: 'sp7',
      name: 'Basil',
      price: 7.99,
      image: '/assets/Spices/Basil.jpg',
      description: 'Aromatic herb with a sweet, slightly peppery flavor, essential in Mediterranean and many Asian cuisines.',
      category: 'spices'
    },
    {
      id: 'sp8',
      name: 'Bay Leaf',
      price: 6.99,
      image: '/assets/Spices/Bay leaf.jpg',
      description: 'Aromatic leaf used to flavor soups, stews, and braises, removed before serving.',
      category: 'spices'
    },
    {
      id: 'sp9',
      name: 'Black Cardamom',
      price: 22.99,
      image: '/assets/Spices/Black cardamom.webp',
      description: 'Smoky, robust spice used in savory dishes and garam masala blends in Indian cuisine.',
      category: 'spices'
    },
    {
      id: 'sp10',
      name: 'Black Cumin',
      price: 14.99,
      image: '/assets/Spices/Black cumin.webp',
      description: 'Earthy, slightly bitter spice used in Middle Eastern, Indian, and North African cuisines.',
      category: 'spices'
    },
    {
      id: 'sp11',
      name: 'Caraway',
      price: 9.99,
      image: '/assets/Spices/Caraway.webp',
      description: 'Aromatic seeds with a distinctive earthy anise-like flavor, popular in European cuisines.',
      category: 'spices'
    },
    {
      id: 'sp12',
      name: 'Coriander Seeds',
      price: 8.50,
      image: '/assets/Spices/Coriander seed.webp',
      description: 'Citrusy, nutty seeds used to enhance curries, pickles, and spice blends globally.',
      category: 'spices'
    },
    {
      id: 'sp13',
      name: 'Coriander',
      price: 7.99,
      image: '/assets/Spices/Coriander.jpg',
      description: 'Herb with a fresh, citrusy flavor, widely used as a garnish or in chutneys and marinades.',
      category: 'spices'
    },
    {
      id: 'sp14',
      name: 'Cumin',
      price: 9.50,
      image: '/assets/Spices/Cumin.jpg',
      description: 'Warm, earthy spice that is a staple in Mexican, Indian, and Middle Eastern cuisines.',
      category: 'spices'
    },
    {
      id: 'sp15',
      name: 'Curry Leaves',
      price: 11.99,
      image: '/assets/Spices/Curry leaves.jpg',
      description: 'Aromatic leaves used to temper South Indian dishes, imparting a unique citrusy flavor.',
      category: 'spices'
    },
    {
      id: 'sp16',
      name: 'Fennel',
      price: 10.99,
      image: '/assets/Spices/Fennel.webp',
      description: 'Sweet, licorice-flavored seeds used in teas, desserts, and savory dishes worldwide.',
      category: 'spices'
    },
    {
      id: 'sp17',
      name: 'Fenugreek',
      price: 12.99,
      image: '/assets/Spices/Fenugreek.jpg',
      description: 'Bitter-sweet seeds used in spice mixes and dishes like Indian curries and pickles.',
      category: 'spices'
    },
    {
      id: 'sp18',
      name: 'Garam Masala',
      price: 14.99,
      image: '/assets/Spices/Garam masala.webp',
      description: 'Warming spice blend combining cinnamon, cloves, and cardamom, essential in Indian cooking.',
      category: 'spices'
    },
    {
      id: 'sp19',
      name: 'Ginger',
      price: 10.99,
      image: '/assets/Spices/Ginger.jpg',
      description: 'Zesty, aromatic root used fresh or dried to add warmth and depth to both sweet and savory dishes.',
      category: 'spices'
    },
    {
      id: 'sp20',
      name: 'Nutmeg',
      price: 13.99,
      image: '/assets/Spices/Nutmeg.webp',
      description: 'Warm, nutty spice often grated into creamy sauces, baked goods, and spiced beverages.',
      category: 'spices'
    },
    {
      id: 'sp21',
      name: 'Red Chilli Powder',
      price: 8.99,
      image: '/assets/Spices/Red chili powder (lal mirch).webp',
      description: 'Fiery red powder used to add heat and vibrant color to curries, marinades, and spice blends.',
      category: 'spices'
    },
    {
      id: 'sp22',
      name: 'Tej Patta',
      price: 9.99,
      image: '/assets/Spices/Tej patta.jpg',
      description: 'Indian bay leaf with a subtle clove-cinnamon flavor, used in rice dishes and curries.',
      category: 'spices'
    },
    {
      id: 'sp23',
      name: 'Turmeric',
      price: 7.99,
      image: '/assets/Spices/Turmeric.webp',
      description: 'Golden-yellow spice with earthy notes, prized for its anti-inflammatory properties and vibrant color.',
      category: 'spices'
    }
  ];

  const teasRaw = [
    {
      id: 't1',
      name: 'Darjeeling Tea',
      price: 22.99,
      image: '/assets/Tea/Darjeeling Tea.webp',
      description: 'The champagne of teas, our first flush Darjeeling offers delicate muscatel flavors.',
      category: 'tea'
    },
    {
      id: 't2',
      name: 'Assam Gold',
      price: 19.50,
      image: '/assets/Tea/Assam.jpg',
      description: 'A robust black tea with a rich malty flavor and deep amber color.',
      category: 'tea'
    },
    {
      id: 't3',
      name: 'Green Tea',
      price: 24.99,
      image: '/assets/Tea/Green Tea.webp',
      description: 'A premium green tea with a refreshing taste and delicate sweetness.',
      category: 'tea'
    },
    {
      id: 't4',
      name: 'Masala Chai',
      price: 16.99,
      image: '/assets/Tea/Masala Chai.jpg',
      description: 'Traditional Indian spiced tea blend with cardamom, cinnamon, and other aromatic spices.',
      category: 'tea'
    },
    {
      id: 't5',
      name: 'Black Tea',
      price: 18.99,
      image: '/assets/Tea/Black Tea.jpg',
      description: 'Rich and robust black tea with a full-bodied flavor. Perfect for starting your day.',
      category: 'tea'
    },
    {
      id: 't6',
      name: 'Chai Tea',
      price: 17.99,
      image: '/assets/Tea/Chai Tea.jpg',
      description: 'Aromatic blend of black tea with spices like cardamom, cinnamon, and ginger.',
      category: 'tea'
    },
    {
      id: 't7',
      name: 'Chamomile Tea',
      price: 15.99,
      image: '/assets/Tea/Chamomile Tea.webp',
      description: 'Soothing herbal tea with delicate floral notes, perfect for relaxation.',
      category: 'tea'
    },
    {
      id: 't8',
      name: 'Herbal Tea',
      price: 14.99,
      image: '/assets/Tea/Herbal Tea.webp',
      description: 'Caffeine-free infusion of herbs and botanicals with a mild, soothing taste.',
      category: 'tea'
    },
    {
      id: 't9',
      name: 'Irani Chai',
      price: 21.99,
      image: '/assets/Tea/Irani Chai.jpg',
      description: 'Creamy and sweet tea with a rich texture, perfect for dessert pairings.',
      category: 'tea'
    },
    {
      id: 't10',
      name: 'Lemongrass Tea',
      price: 16.50,
      image: '/assets/Tea/Lemongrass Tea.webp',
      description: 'Citrusy and refreshing tea with a hint of sweetness and calming properties.',
      category: 'tea'
    },
    {
      id: 't11',
      name: 'Matcha Tea',
      price: 26.99,
      image: '/assets/Tea/Matcha Tea.jpg',
      description: 'Vibrant green tea powder with a rich umami flavor and energizing benefits.',
      category: 'tea'
    },
    {
      id: 't12',
      name: 'Mate Tea',
      price: 20.99,
      image: '/assets/Tea/Mate Tea.png',
      description: 'Energizing South American tea with a bold, earthy flavor and high caffeine.',
      category: 'tea'
    },
    {
      id: 't13',
      name: 'Nilgiri Tea',
      price: 19.99,
      image: '/assets/Tea/Nilgiri Tea.webp',
      description: 'Fragrant Indian tea with a brisk, fruity flavor and floral undertones.',
      category: 'tea'
    },
    {
      id: 't14',
      name: 'Oolong Tea',
      price: 23.99,
      image: '/assets/Tea/Oolong Tea Wulong Tea.webp',
      description: 'Semi-oxidized tea with a balance of green and black tea characteristics.',
      category: 'tea'
    },
    {
      id: 't15',
      name: 'Peach Tea',
      price: 17.50,
      image: '/assets/Tea/Peach Tea.jpg',
      description: 'Sweet and fruity tea with the juicy flavor of ripe peaches and a light aroma.',
      category: 'tea'
    },
    {
      id: 't16',
      name: 'Pu-erh Tea',
      price: 25.99,
      image: '/assets/Tea/Pu-erh Tea (Puer Tea).jpg',
      description: 'Aged Chinese tea with a deep, earthy flavor and digestive health benefits.',
      category: 'tea'
    },
    {
      id: 't17',
      name: 'Rooibos Tea',
      price: 18.50,
      image: '/assets/Tea/Rooibos Tea.webp',
      description: 'South African red tea with a naturally sweet taste and antioxidant properties.',
      category: 'tea'
    },
    {
      id: 't18',
      name: 'Tandoori Tea',
      price: 22.50,
      image: '/assets/Tea/Tandoori Chai.webp',
      description: 'Unique spiced tea with a smoky flavor inspired by traditional tandoor cooking.',
      category: 'tea'
    },
    {
      id: 't19',
      name: 'White Tea',
      price: 24.50,
      image: '/assets/Tea/White Tea.webp',
      description: 'Delicate and subtly sweet tea with minimal processing and a light aroma.',
      category: 'tea'
    }
  ];

  // Ensure all products have valid data
  const dryFruits = ensureValidProducts(dryFruitsRaw);
  const spices = ensureValidProducts(spicesRaw);
  const teas = ensureValidProducts(teasRaw);

  // All products combined
  const allProducts = [...dryFruits, ...spices, ...teas];

  // Add useEffect for initialization logging
  useEffect(() => {
    console.log('Products component initialized');
    
    // Set loading to false after a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Slightly longer loading time for better UX
    
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on search term and active category
  const getFilteredProducts = () => {
    let filtered = allProducts;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Scroll to products section
    const productsSection = document.querySelector('.products-sections');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset filters function
  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
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
    const [imageError, setImageError] = useState(false);
    const isHovered = hoveredProduct === product.id;

    const handleImageError = () => {
      console.error(`Image error for product: ${product.name}, path: ${product.image}`);
      setImageError(true);
    };

    // Create WhatsApp message
    const whatsappMessage = encodeURIComponent(`Hello, I'm interested in your ${product.name}. Could you provide more details?`);
    const whatsappLink = `https://wa.me/+971123456789?text=${whatsappMessage}`;

    // Check if product is premium (for demonstration - premium if expensive or high quality)
    const isPremium = product.price > 50;

    return (
      <div 
        className={`product-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        <div className="product-image">
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
          <div className="product-badge">
            {product.category === 'dry-fruits' ? (
              <><FaSeedling className="badge-icon" /> Dry Fruit</>
            ) : product.category === 'spices' ? (
              <><FaLeaf className="badge-icon" /> Spice</>
            ) : (
              <><FaMugHot className="badge-icon" /> Tea</>
            )}
          </div>
          {isPremium && (
            <div className="premium-badge">
              <FaStar className="premium-icon" /> Premium
            </div>
          )}
        </div>
        <div className="product-details">
          <h3>{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-price">AED {product.price.toFixed(2)}</div>
          <div className="product-actions">
            <Link to={`/product/${product.category}/${product.id}`} className="view-details">
              View Details
            </Link>
            <a href={whatsappLink} className="whatsapp-button" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Inquire
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

  // Get products for a section - add filtering logic here
  const getSectionProducts = (category) => {
    let sectionProducts = [];
    
    switch(category) {
      case 'dry-fruits':
        sectionProducts = dryFruits;
        break;
      case 'spices':
        sectionProducts = spices;
        break;
      case 'tea':
        sectionProducts = teas;
        break;
      default:
        sectionProducts = [];
    }
    
    // Apply search filter
    if (searchTerm) {
      sectionProducts = sectionProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return sectionProducts;
  };
  
  // Should display section? Return true if we should show the section
  const shouldDisplaySection = (category) => {
    return activeCategory === 'all' || activeCategory === category;
  };

  return (
    <>
      <Helmet>
        <title>Figs Dubai | All Products</title>
        <meta name="description" content="Browse all premium products from FIGS Dubai (Future Indo Global Services Dubai): dry fruits, spices, tea, and more. Quality, authenticity, and global delivery." />
        <meta name="keywords" content="FIGSDUBAI, figsdubai, figs dubai, Future indo global services dubai, figs dubai products, dry fruits, spices, tea" />
        <meta property="og:title" content="Figs Dubai | All Products" />
        <meta property="og:description" content="Browse all premium products from FIGS Dubai: dry fruits, spices, tea, and more. Quality, authenticity, and global delivery." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://figsdubai.com/products" />
        <meta property="og:image" content="/images/hero-bg.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Figs Dubai | All Products" />
        <meta name="twitter:description" content="Browse all premium products from FIGS Dubai: dry fruits, spices, tea, and more. Quality, authenticity, and global delivery." />
        <meta name="twitter:image" content="/images/hero-bg.jpg" />
      </Helmet>
      <div className="products-page">
        {/* Enhanced Hero Banner */}
        <div className="products-hero">
          <div className="products-hero-overlay"></div>
          <div className="products-hero-content">
            <h1>Our Premium Products</h1>
            <div className="hero-underline"></div>
            <p>Explore our curated selection of premium quality imports from around the world</p>
          </div>
        </div>
        
        {/* Enhanced Filter Section */}
        <div className="filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          
          <div className="category-filter">
            <button
              className={activeCategory === 'all' ? 'active' : ''}
              onClick={() => handleCategoryChange('all')}
            >
              All Products
            </button>
            <button
              className={activeCategory === 'dry-fruits' ? 'active' : ''}
              onClick={() => handleCategoryChange('dry-fruits')}
            >
              <FaSeedling className="category-icon" /> Dry Fruits
            </button>
            <button
              className={activeCategory === 'spices' ? 'active' : ''}
              onClick={() => handleCategoryChange('spices')}
            >
              <FaLeaf className="category-icon" /> Spices
            </button>
            <button
              className={activeCategory === 'tea' ? 'active' : ''}
              onClick={() => handleCategoryChange('tea')}
            >
              <FaMugHot className="category-icon" /> Tea
            </button>
          </div>
        </div>
        
        {/* Products Display with Enhanced Loading */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Discovering premium products from around the world...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-sections">
            {/* Dry Fruits Section */}
            {shouldDisplaySection('dry-fruits') && (
              <section className="product-section">
                <div className="section-header">
                  <h2>Premium Dry Fruits</h2>
                  <div className="section-underline"></div>
                  <p>Handpicked and sourced from the finest orchards</p>
                </div>
                
                <div className="products-grid">
                  {activeCategory === 'all' 
                    ? getSectionProducts('dry-fruits').map(product => (
                        <SafeProductCard key={`df-${product.id}`} product={product} />
                      ))
                    : filteredProducts
                        .filter(product => product.category === 'dry-fruits')
                        .map(product => (
                          <SafeProductCard key={`df-${product.id}`} product={product} />
                        ))
                  }
                  {activeCategory === 'dry-fruits' && filteredProducts.filter(p => p.category === 'dry-fruits').length === 0 && (
                    <div className="empty-products">
                      <p>No dry fruits products match your search criteria</p>
                      <button onClick={resetFilters}>Clear Filters</button>
                    </div>
                  )}
                </div>
                
                {activeCategory === 'all' && getSectionProducts('dry-fruits').length > 0 && (
                  <div className="view-all-container">
                    <Link to="/products/dry-fruits" className="view-all-btn">View All Dry Fruits</Link>
                  </div>
                )}
              </section>
            )}
            
            {/* Spices Section */}
            {shouldDisplaySection('spices') && (
              <section className="product-section">
                <div className="section-header">
                  <h2>Exotic Spices</h2>
                  <div className="section-underline"></div>
                  <p>Traditional spices to enhance your culinary creations</p>
                </div>
                
                <div className="products-grid">
                  {activeCategory === 'all' 
                    ? getSectionProducts('spices').map(product => (
                        <SafeProductCard key={`sp-${product.id}`} product={product} />
                      ))
                    : filteredProducts
                        .filter(product => product.category === 'spices')
                        .map(product => (
                          <SafeProductCard key={`sp-${product.id}`} product={product} />
                        ))
                  }
                  {activeCategory === 'spices' && filteredProducts.filter(p => p.category === 'spices').length === 0 && (
                    <div className="empty-products">
                      <p>No spices products match your search criteria</p>
                      <button onClick={resetFilters}>Clear Filters</button>
                    </div>
                  )}
                </div>
                
                {activeCategory === 'all' && getSectionProducts('spices').length > 0 && (
                  <div className="view-all-container">
                    <Link to="/products/spices" className="view-all-btn">View All Spices</Link>
                  </div>
                )}
              </section>
            )}
            
            {/* Tea Section */}
            {shouldDisplaySection('tea') && (
              <section className="product-section">
                <div className="section-header">
                  <h2>Luxury Tea Collection</h2>
                  <div className="section-underline"></div>
                  <p>Handcrafted teas for the perfect brew</p>
                </div>
                
                <div className="products-grid">
                  {activeCategory === 'all' 
                    ? getSectionProducts('tea').map(product => (
                        <SafeProductCard key={`tea-${product.id}`} product={product} />
                      ))
                    : filteredProducts
                        .filter(product => product.category === 'tea')
                        .map(product => (
                          <SafeProductCard key={`tea-${product.id}`} product={product} />
                        ))
                  }
                  {activeCategory === 'tea' && filteredProducts.filter(p => p.category === 'tea').length === 0 && (
                    <div className="empty-products">
                      <p>No tea products match your search criteria</p>
                      <button onClick={resetFilters}>Clear Filters</button>
                    </div>
                  )}
                </div>
                
                {activeCategory === 'all' && getSectionProducts('tea').length > 0 && (
                  <div className="view-all-container">
                    <Link to="/products/tea" className="view-all-btn">View All Tea</Link>
                  </div>
                )}
              </section>
            )}
          </div>
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
            <p>We couldn't find any products matching your criteria.</p>
            {searchTerm && (
              <p>Your search for "<strong>{searchTerm}</strong>" returned no results.</p>
            )}
            {activeCategory !== 'all' && (
              <p>Category filter: <strong>{activeCategory}</strong></p>
            )}
            <button 
              className="reset-filter-btn" 
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Products; 
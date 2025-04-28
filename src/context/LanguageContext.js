import React, { createContext, useState, useContext, useEffect } from 'react';

// List of RTL languages
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

// Translation data
const translations = {
  en: {
    // Hero Section
    heroTitle: "Premium Imports & Exports from Dubai",
    heroSubtitle: "High-quality dry fruits, spices, and tea delivered worldwide",
    getStarted: "Get Started",
    exploreProducts: "Explore Products",
    
    // Why Choose Us
    whyChooseUs: "Why Choose Us",
    whyChooseUsSubtitle: "Bringing the finest products from Dubai to the world",
    qualityTitle: "Premium Quality",
    qualityDesc: "Handpicked premium products sourced directly from the finest farms",
    authenticTitle: "Authentic Products",
    authenticDesc: "100% authentic products with guaranteed quality and freshness",
    shippingTitle: "Global Shipping",
    shippingDesc: "Fast and reliable shipping to over 100 countries worldwide",
    supportTitle: "24/7 Support",
    supportDesc: "Round-the-clock customer support for all your queries",
    
    // Products Sections
    dryFruitsTitle: "Premium Dry Fruits",
    dryFruitsSubtitle: "Handpicked and sourced from the finest orchards",
    spicesTitle: "Exotic Spices",
    spicesSubtitle: "Traditional spices to enhance your culinary creations",
    teaTitle: "Luxury Tea Collection",
    teaSubtitle: "Handcrafted teas for the perfect brew",
    viewAll: "View All",
    
    // Dry Fruits Products
    medjoolDates: "Premium Medjool Dates",
    pistachios: "Iranian Pistachios",
    almonds: "Organic Almonds",
    figs: "Turkish Dried Figs",
    
    // Spices Products
    saffron: "Premium Saffron",
    cardamom: "Green Cardamom",
    sumac: "Lebanese Sumac",
    zaatar: "Authentic Za'atar Blend",
    
    // Tea Products
    arabianBlend: "Arabian Signature Blend",
    moroccanMint: "Moroccan Mint Tea",
    kashmiriKahwa: "Kashmiri Kahwa",
    dubaiSpecial: "Dubai Special Tea",
    
    // Pricing and Currency
    aed: "AED",
    perKg: "per kg",
    perGram: "per gram",
    perPack: "per pack",
    
    // Product Actions
    addToCart: "Add to Cart",
    quickView: "Quick View",
    
    // How It Works
    howItWorks: "How It Works",
    howItWorksSubtitle: "Simple process, exceptional results",
    step1Title: "Browse Products",
    step1Desc: "Explore our wide range of premium products",
    step2Title: "Place Your Order",
    step2Desc: "Choose your products and place your order",
    step3Title: "Quality Checking",
    step3Desc: "We carefully check and package your products",
    step4Title: "Fast Delivery",
    step4Desc: "Receive your products at your doorstep",
    
    // Testimonials
    testimonials: "What Our Clients Say",
    testimonialsSubtitle: "Trusted by businesses and individuals worldwide",
    testimonial1: "The quality of their dry fruits is exceptional. I've been importing from them for my restaurant chain, and our customers love the taste and freshness.",
    testimonial2: "Their spice collection is truly authentic. As a chef, I can immediately tell the difference in flavor and aroma. Highly recommended!",
    testimonial3: "Their tea collection has become a staple in our boutique hotel. Guests constantly ask where we source our teas - I'm happy to refer them to this excellent company.",
    testimonialName1: "Ahmed Al-Mansoori",
    testimonialPosition1: "CEO, Al Baraka Trading",
    testimonialName2: "Sophia Johnson",
    testimonialPosition2: "Head Chef, Spice Fusion",
    testimonialName3: "Sarah Al-Hashimi",
    testimonialPosition3: "Manager, Palm Luxury Hotel",
    
    // CTA
    ctaTitle: "Ready to Experience Premium Products from Dubai?",
    ctaSubtitle: "Join thousands of satisfied customers worldwide",
    ctaButton: "Shop Now",
    
    // Header
    home: "HOME",
    about: "ABOUT",
    aboutUs: "ABOUT US",
    products: "PRODUCTS",
    shop: "SHOP",
    services: "SERVICES",
    contact: "CONTACT",
    contactUs: "CONTACT US",
    orders: "ORDERS",
    admin: "ADMIN",
    dashboard: "DASHBOARD",
    logout: "LOGOUT",
    login: "LOGIN",
    register: "REGISTER",
    toggleMenu: "Toggle menu",
    siteName: "FIGS Dubai",
    
    // Footer
    quickLinks: "Quick Links",
    ourServices: "Our Services",
    bulkOrdering: "Bulk Ordering",
    customPackaging: "Custom Packaging",
    wholesaleDistribution: "Wholesale Distribution",
    internationalShipping: "International Shipping",
    qualityTesting: "Quality Testing",
    tradeConsulting: "Trade Consulting",
    address: "Business Bay, Dubai, UAE",
    phone: "+971 4 XXX XXXX",
    email: "info@figsdubai.com",
    workHoursWeekday: "Monday-Friday: 9:00 AM - 6:00 PM",
    workHoursWeekend: "Saturday: 10:00 AM - 2:00 PM",
    allRightsReserved: "All Rights Reserved.",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    shippingPolicy: "Shipping Policy",
    footerDescription: "FIGS Dubai is a leading import-export company specializing in premium dry fruits, spices, and teas. We connect global markets with quality products and exceptional service since 2010.",
    
    // Footer and misc
    language: "Language",
    english: "English",
    arabic: "Arabic",
    
    // Navigation
    allProducts: 'All Products',
    dryFruits: 'Dry Fruits',
    spices: 'Spices',
    tea: 'Tea',
    
    // Product Pages
    dryFruitsProducts: 'Dry Fruits Products',
    spicesProducts: 'Spices Products',
    teaProducts: 'Tea Products',
    searchDryFruits: 'Search Dry Fruits...',
    searchSpices: 'Search Spices...',
    searchTea: 'Search Tea...',
    noProductsFound: 'No products found matching your search criteria.',
    
    // Actions
    viewDetails: 'View Details',
    buyNow: 'Buy Now',
    
    // Testimonials
    readMore: 'Read More',
    
    // Call to action
    contactForBulkOrders: 'Contact us for bulk orders and exclusive deals',
    getInTouch: 'Get In Touch',
    
    // Services Page
    ourPremiumServices: "Our Premium Services",
    servicesSubtitle: "Delivering exceptional quality and service across our range of premium Dry Fruits, Spices, and Teas",
    whatWeOffer: "What We Offer",
    whatWeOfferSubtitle: "At FIGS Dubai, we provide premium import-export services with a focus on three main product categories",
    
    premiumDryFruits: "Premium Dry Fruits",
    premiumDryFruitsDesc: "Sourced directly from the lush valleys of Kashmir and the fertile plains of Afghanistan, our dry fruits maintain their natural flavor and nutritional value.",
    
    aromaticSpices: "Aromatic Spices",
    aromaticSpicesDesc: "Our spices are sourced from the renowned spice gardens of Kerala and carefully selected farms across Asia, preserving their authentic aroma and flavor.",
    
    fineTeas: "Fine Teas",
    fineTeaDesc: "Our curated tea collection features the finest leaves from Darjeeling, Assam, and Sri Lanka's renowned tea estates for an exceptional tea experience.",
    
    ourPremiumProducts: "Our Premium Products",
    ourPremiumProductsSubtitle: "Explore our diverse range of high-quality products",
    
    businessServices: "Business Services",
    businessServicesSubtitle: "We offer comprehensive services tailored to meet the needs of businesses in the food industry",
    
    bulkOrdering: "Bulk Ordering",
    bulkOrderingDesc: "Special pricing and customized packaging for wholesale customers with bulk requirements.",
    
    storageTitle: "Storage Solutions",
    storageDesc: "State-of-the-art warehousing facilities with controlled environment for product freshness.",
    
    globalShipping: "Global Shipping",
    globalShippingDesc: "Efficient logistics network ensuring timely delivery to over 30 countries worldwide.",
    
    qualityTesting: "Quality Testing",
    qualityTestingDesc: "Rigorous quality control processes ensuring all products meet international standards.",
    
    importExport: "Import-Export Consultation",
    importExportDesc: "Expert guidance on regulations, documentation, and compliance for international trade.",
    
    b2bPartnerships: "B2B Partnerships",
    b2bPartnershipsDesc: "Strategic partnership opportunities for retailers, distributors, and food service businesses.",
    
    customerServices: "Customer Services",
    customerServicesSubtitle: "We're committed to providing exceptional service at every touchpoint",
    
    customerSupport: "24/7 Customer Support",
    customerSupportDesc: "Our dedicated team is available around the clock to address any queries or concerns you may have.",
    
    productAuthenticity: "Product Authenticity Guarantee",
    productAuthenticityDesc: "We guarantee the authenticity and quality of every product, backed by our rigorous sourcing standards.",
    
    securePayment: "Secure Payment Options",
    securePaymentDesc: "Multiple secure payment methods available for your convenience and peace of mind.",
    
    readyToExperience: "Ready to Experience Premium Quality?",
    readyToExperienceSubtitle: "Contact our team today to discuss your requirements or place an order",
    contactUs: "Contact Us",
    exploreProducts: "Explore Products",
    
    // Products Page
    ourProducts: "Our Premium Products",
    productsSubtitle: "Explore our curated selection of premium quality imports from around the world",
    searchProducts: "Search products...",
    tryAdjustingFilter: "Try adjusting your search criteria or browse our categories",
    loadingProducts: "Loading products...",
    noProductsFound: "No products found matching your search criteria",
    
    // Product Categories and View All Buttons
    viewAllDryFruits: "View All Dry Fruits",
    viewAllSpices: "View All Spices", 
    viewAllTea: "View All Teas",
  },
  ar: {
    // Hero Section
    heroTitle: "واردات وصادرات متميزة من دبي",
    heroSubtitle: "فواكه مجففة وتوابل وشاي عالي الجودة يتم توصيلها في جميع أنحاء العالم",
    getStarted: "ابدأ الآن",
    exploreProducts: "استكشف المنتجات",
    
    // Why Choose Us
    whyChooseUs: "لماذا تختارنا",
    whyChooseUsSubtitle: "نقدم أفضل المنتجات من دبي إلى العالم",
    qualityTitle: "جودة ممتازة",
    qualityDesc: "منتجات ممتازة مختارة يدويًا مصدرها مباشرة من أفضل المزارع",
    authenticTitle: "منتجات أصلية",
    authenticDesc: "منتجات أصلية 100٪ مع ضمان الجودة والطزاجة",
    shippingTitle: "شحن عالمي",
    shippingDesc: "شحن سريع وموثوق به إلى أكثر من 100 دولة حول العالم",
    supportTitle: "دعم على مدار الساعة",
    supportDesc: "دعم العملاء على مدار الساعة طوال أيام الأسبوع لجميع استفساراتك",
    
    // Products Sections
    dryFruitsTitle: "فواكه مجففة ممتازة",
    dryFruitsSubtitle: "منتقاة يدويًا ومصدرها من أفضل البساتين",
    spicesTitle: "توابل فريدة",
    spicesSubtitle: "توابل تقليدية لتعزيز إبداعاتك الطهوية",
    teaTitle: "مجموعة الشاي الفاخرة",
    teaSubtitle: "شاي مصنوع يدويًا للحصول على المشروب المثالي",
    viewAll: "عرض الكل",
    
    // Dry Fruits Products
    medjoolDates: "تمر المجدول الفاخر",
    pistachios: "فستق إيراني",
    almonds: "لوز عضوي",
    figs: "تين مجفف تركي",
    
    // Spices Products
    saffron: "زعفران فاخر",
    cardamom: "هيل أخضر",
    sumac: "سماق لبناني",
    zaatar: "خلطة زعتر أصلية",
    
    // Tea Products
    arabianBlend: "خلطة عربية مميزة",
    moroccanMint: "شاي النعناع المغربي",
    kashmiriKahwa: "قهوة كشميرية",
    dubaiSpecial: "شاي دبي الخاص",
    
    // Pricing and Currency
    aed: "درهم",
    perKg: "للكيلوغرام",
    perGram: "للجرام",
    perPack: "للعبوة",
    
    // Product Actions
    addToCart: "أضف إلى السلة",
    quickView: "نظرة سريعة",
    
    // How It Works
    howItWorks: "كيفية عمل النظام",
    howItWorksSubtitle: "عملية بسيطة، نتائج استثنائية",
    step1Title: "تصفح المنتجات",
    step1Desc: "استكشف مجموعتنا الواسعة من المنتجات المميزة",
    step2Title: "ضع طلبك",
    step2Desc: "اختر منتجاتك وضع طلبك",
    step3Title: "فحص الجودة",
    step3Desc: "نقوم بفحص منتجاتك وتعبئتها بعناية",
    step4Title: "توصيل سريع",
    step4Desc: "استلم منتجاتك عند باب منزلك",
    
    // Testimonials
    testimonials: "ماذا يقول عملاؤنا",
    testimonialsSubtitle: "موثوق به من قبل الشركات والأفراد في جميع أنحاء العالم",
    testimonial1: "جودة الفواكه المجففة لديهم استثنائية. لقد كنت أستورد منهم لسلسلة مطاعمي، وعملاؤنا يحبون المذاق والطزاجة.",
    testimonial2: "مجموعة التوابل لديهم أصلية حقًا. كطاهٍ، يمكنني أن ألاحظ الفرق في النكهة والرائحة على الفور. أوصي بها بشدة!",
    testimonial3: "أصبحت مجموعة الشاي الخاصة بهم عنصرًا أساسيًا في فندقنا البوتيكي. يسأل الضيوف باستمرار عن مصدر شاينا - أنا سعيد بإحالتهم إلى هذه الشركة الممتازة.",
    testimonialName1: "أحمد المنصوري",
    testimonialPosition1: "الرئيس التنفيذي، البركة للتجارة",
    testimonialName2: "صوفيا جونسون",
    testimonialPosition2: "رئيس الطهاة، فيوجن التوابل",
    testimonialName3: "سارة الهاشمي",
    testimonialPosition3: "مديرة، فندق بالم الفاخر",
    
    // CTA
    ctaTitle: "هل أنت مستعد لتجربة منتجات متميزة من دبي؟",
    ctaSubtitle: "انضم إلى آلاف العملاء الراضين في جميع أنحاء العالم",
    ctaButton: "تسوق الآن",
    
    // Header - Add Arabic translations
    home: "الرئيسية",
    about: "من نحن",
    aboutUs: "من نحن",
    products: "المنتجات",
    shop: "المتجر",
    services: "الخدمات",
    contact: "اتصل بنا",
    contactUs: "اتصل بنا",
    orders: "الطلبات",
    admin: "الإدارة",
    dashboard: "لوحة التحكم",
    logout: "تسجيل الخروج",
    login: "تسجيل الدخول",
    register: "تسجيل جديد",
    toggleMenu: "القائمة",
    siteName: "فيجز دبي",
    
    // Footer - Add Arabic translations
    quickLinks: "روابط سريعة",
    ourServices: "خدماتنا",
    bulkOrdering: "طلبات الجملة",
    customPackaging: "تغليف مخصص",
    wholesaleDistribution: "توزيع الجملة",
    internationalShipping: "الشحن الدولي",
    qualityTesting: "اختبار الجودة",
    tradeConsulting: "استشارات تجارية",
    address: "الخليج التجاري، دبي، الإمارات العربية المتحدة",
    phone: "‎+٩٧١ ٤ XXX XXXX",
    email: "info@figsdubai.com",
    workHoursWeekday: "الاثنين-الجمعة: ٩:٠٠ ص - ٦:٠٠ م",
    workHoursWeekend: "السبت: ١٠:٠٠ ص - ٢:٠٠ م",
    allRightsReserved: "جميع الحقوق محفوظة.",
    termsOfService: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    shippingPolicy: "سياسة الشحن",
    footerDescription: "فيجز دبي هي شركة رائدة في مجال الاستيراد والتصدير متخصصة في الفواكه المجففة والتوابل والشاي. نربط الأسواق العالمية بمنتجات عالية الجودة وخدمة استثنائية منذ عام ٢٠١٠.",
    
    // Footer and misc
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",
    
    // Navigation
    allProducts: 'جميع المنتجات',
    dryFruits: 'الفواكه المجففة',
    spices: 'التوابل',
    tea: 'الشاي',
    
    // Product Pages
    dryFruitsProducts: 'منتجات الفواكه المجففة',
    spicesProducts: 'منتجات التوابل',
    teaProducts: 'منتجات الشاي',
    searchDryFruits: 'البحث في الفواكه المجففة...',
    searchSpices: 'البحث في التوابل...',
    searchTea: 'البحث في الشاي...',
    noProductsFound: 'لم يتم العثور على منتجات تطابق معايير البحث الخاصة بك.',
    
    // Actions
    viewDetails: 'عرض التفاصيل',
    buyNow: 'اشتر الآن',
    
    // Testimonials
    readMore: 'قراءة المزيد',
    
    // Call to action
    contactForBulkOrders: 'اتصل بنا للطلبات بالجملة والعروض الحصرية',
    getInTouch: 'تواصل معنا',
    
    // Services Page
    ourPremiumServices: "خدماتنا المتميزة",
    servicesSubtitle: "نقدم جودة وخدمة استثنائية عبر مجموعة منتجاتنا المتميزة من الفواكه المجففة والتوابل والشاي",
    whatWeOffer: "ما نقدمه",
    whatWeOfferSubtitle: "في فيجز دبي، نقدم خدمات استيراد وتصدير متميزة مع التركيز على ثلاث فئات رئيسية من المنتجات",
    
    premiumDryFruits: "فواكه مجففة فاخرة",
    premiumDryFruitsDesc: "مصدرها مباشرة من وديان كشمير الخضراء وسهول أفغانستان الخصبة، تحافظ فواكهنا المجففة على نكهتها الطبيعية وقيمتها الغذائية.",
    
    aromaticSpices: "توابل عطرية",
    aromaticSpicesDesc: "تأتي توابلنا من حدائق التوابل الشهيرة في كيرالا ومزارع مختارة بعناية في جميع أنحاء آسيا، مما يحافظ على عطرها ونكهتها الأصلية.",
    
    fineTeas: "شاي فاخر",
    fineTeaDesc: "تضم مجموعة الشاي المنتقاة لدينا أفضل أوراق الشاي من دارجيلنج وآسام ومزارع الشاي الشهيرة في سريلانكا لتجربة شاي استثنائية.",
    
    ourPremiumProducts: "منتجاتنا الفاخرة",
    ourPremiumProductsSubtitle: "استكشف مجموعتنا المتنوعة من المنتجات عالية الجودة",
    
    businessServices: "خدمات الأعمال",
    businessServicesSubtitle: "نقدم خدمات شاملة مصممة لتلبية احتياجات الشركات في صناعة الأغذية",
    
    bulkOrdering: "طلبات بالجملة",
    bulkOrderingDesc: "أسعار خاصة وعبوات مخصصة لعملاء الجملة ذوي المتطلبات الكبيرة.",
    
    storageTitle: "حلول التخزين",
    storageDesc: "مرافق تخزين متطورة مع بيئة متحكم بها للحفاظ على طزاجة المنتجات.",
    
    globalShipping: "شحن عالمي",
    globalShippingDesc: "شبكة لوجستية فعالة تضمن التسليم في الوقت المناسب إلى أكثر من 30 دولة حول العالم.",
    
    qualityTesting: "اختبار الجودة",
    qualityTestingDesc: "عمليات مراقبة جودة صارمة تضمن تلبية جميع المنتجات للمعايير الدولية.",
    
    importExport: "استشارات الاستيراد والتصدير",
    importExportDesc: "إرشادات خبيرة حول اللوائح والوثائق والامتثال للتجارة الدولية.",
    
    b2bPartnerships: "شراكات بين الشركات",
    b2bPartnershipsDesc: "فرص شراكة استراتيجية لتجار التجزئة والموزعين وشركات خدمات الطعام.",
    
    customerServices: "خدمات العملاء",
    customerServicesSubtitle: "نحن ملتزمون بتقديم خدمة استثنائية في كل نقطة اتصال",
    
    customerSupport: "دعم العملاء على مدار الساعة",
    customerSupportDesc: "فريقنا المتخصص متاح على مدار الساعة للرد على أي استفسارات أو مخاوف قد تكون لديك.",
    
    productAuthenticity: "ضمان أصالة المنتج",
    productAuthenticityDesc: "نضمن أصالة وجودة كل منتج، مدعومة بمعايير مصادرنا الصارمة.",
    
    securePayment: "خيارات دفع آمنة",
    securePaymentDesc: "طرق دفع آمنة متعددة متاحة لراحتك وراحة بالك.",
    
    readyToExperience: "هل أنت مستعد لتجربة الجودة الفائقة؟",
    readyToExperienceSubtitle: "اتصل بفريقنا اليوم لمناقشة متطلباتك أو تقديم طلب",
    contactUs: "اتصل بنا",
    exploreProducts: "استكشف المنتجات",
    
    // Products Page
    ourProducts: "منتجاتنا المميزة",
    productsSubtitle: "استكشف مجموعتنا المنتقاة من الواردات عالية الجودة من جميع أنحاء العالم",
    searchProducts: "البحث عن منتجات...",
    tryAdjustingFilter: "حاول تعديل معايير البحث الخاصة بك أو تصفح فئاتنا",
    loadingProducts: "جارٍ تحميل المنتجات...",
    noProductsFound: "لم يتم العثور على منتجات تطابق معايير البحث الخاصة بك",
    
    // Product Categories and View All Buttons
    viewAllDryFruits: "عرض كل الفواكه المجففة",
    viewAllSpices: "عرض كل التوابل",
    viewAllTea: "عرض كل أنواع الشاي",
  }
};

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [contentOnly, setContentOnly] = useState(true);
  const [direction, setDirection] = useState('ltr');
  
  useEffect(() => {
    // Only change direction if contentOnly is false
    if (!contentOnly && language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      setDirection('rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      setDirection('ltr');
    }
    
    // Always set the language attribute for typography styles
    document.documentElement.setAttribute('lang', language);
    
    // Save language preference
    localStorage.setItem('language', language);
    localStorage.setItem('contentOnly', contentOnly.toString());
  }, [language, contentOnly]);
  
  // Load saved language and contentOnly setting on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const savedContentOnly = localStorage.getItem('contentOnly');
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    if (savedContentOnly !== null) {
      setContentOnly(savedContentOnly === 'true');
    }
  }, []);
  
  useEffect(() => {
    // Only inject Google Translate when Arabic is selected
    if (language === 'ar') {
      // Prevent duplicate script injection
      if (!document.getElementById('google-translate-script')) {
        // Create the Google Translate script
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);

        // Create the Google Translate init function
        window.googleTranslateElementInit = function () {
          if (!document.getElementById('google_translate_element')) {
            const div = document.createElement('div');
            div.id = 'google_translate_element';
            div.style.position = 'fixed';
            div.style.bottom = '20px';
            div.style.right = '20px';
            div.style.zIndex = '9999';
            document.body.appendChild(div);
          }
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'ar,en',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        };
      }
    } else {
      // Remove Google Translate widget and script if switching back to English
      const script = document.getElementById('google-translate-script');
      if (script) script.remove();
      const widget = document.getElementById('google_translate_element');
      if (widget) widget.remove();
      // Remove the global init function
      if (window.googleTranslateElementInit) delete window.googleTranslateElementInit;
    }
  }, [language]);
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };
  
  const toggleContentOnly = () => {
    setContentOnly(prev => !prev);
  };
  
  // Translation function - removed the isLayoutKey filter to allow all content to be translated
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      toggleLanguage, 
      contentOnly,
      toggleContentOnly,
      t, 
      direction 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 
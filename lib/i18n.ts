export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const copy = {
  en: {
    nav: {
      about: "About Us",shop:"Shop", publications: "Publications", publishers: "Publishers",
      institutions: "Institutions", digital: "Digital Solutions", ai: "AI Solutions (AlAini)",
      research: "Research & Insights", news: "News", contact: "Contact", institutionCta: "For Institutions",
      search: "Search",
openMenu: "Open menu",
closeMenu: "Close menu",
menu: "Menu",
 publishing: "Publishing",
  solutions: "Solutions",
    },


    home: {
      eyebrow: "Since 1986",
      heroTitle: "Advancing Knowledge Across the Arab World",
      heroText: "Publishing, distributing, and powering academic knowledge for universities, governments, libraries, researchers, and AI innovation.",
      explore: "Explore Our Solutions", institutions: "For Institutions",
      reachTitle: "A Global Reach, A Regional Focus",
      reachText: "Delivering academic knowledge and digital solutions across the Middle East, North Africa, and beyond.",
      reachCta: "Explore Our Reach",
      impact: "Our Impact by the Numbers",
      publishersTitle: "Representing the World’s Leading Academic Publishers",
      institutionsTitle: "Trusted by Leading Educational & Government Institutions",
      viewAllInstitutions:"View All Institutions",
     ecosystem: "The UBH Ecosystem",
journey: "Our Journey",
publications: "Latest Publications",
insights: "Research & Insights",

ecosystemTitle: "Our Ecosystem",
journeyTitle: "Our Journey",
publicationsTitle: "Latest Publications",
viewAllPublications: "View all publications",
insightsTitle: "Research & Insights",
viewAllInsights: "View all insights",

partnerTitle: "Partner with the Arab World’s Academic Knowledge Leader",
      partnerText: "Let’s build the future of education, research, and innovation together.",
      contact: "Contact Us",
      // publishersTitle: "Representing the World’s Leading Academic Publishers",
publishersEyebrow: "Our Partners",
publishersDescription:
  "Explore books and academic resources from leading publishers around the world.",
publishersViewAll: "View All Publishers",
publishersTrusted: "Trusted publishing partners",
publisherRegion: {
  country: "United Arab Emirates",
  universitiesServed: "Universities Served",
  institutions: "Institutions",
  titlesSupplied: "Titles Supplied",
  yearsActive: "Years Active",
  regionalReach: "UBH Regional Reach",
},
impactStats: {
  books: "Books Delivered",
  digital: "Digital Resources Accessed",
  libraries: "Libraries Supplied",
  universities: "Universities Supported",
  researchers: "Researchers Reached",
  titles: "Academic Titles from Leading Publishers",
},

ecosystemDescription:
  "A complete ecosystem for academic knowledge.",

ecosystemItems: {
  publishing: "Publishing",
  distribution: "Distribution",
  store: "UBH Store",
  digitalLearning: "Digital Learning",
  institutionalSolutions: "Institutional Solutions",
  alaini: "AlAini",
  futurePlatforms: "Future Digital Platforms",
},

journeyItems: [
  {
    year: "1986",
    description: "UBH established in Al Ain, UAE",
  },
  {
    year: "1990s",
    description: "Expansion across the UAE and GCC",
  },
  {
    year: "2000s",
    description: "Strategic partnerships with global publishers",
  },
  {
    year: "2010s",
    description: "Digital transformation and e-learning",
  },
  {
    year: "2020s",
    description: "Launching AlAini and future digital platforms",
  },
  {
    year: "Future",
    description: "Building leading academic knowledge infrastructure",
  },
],

insightItems: [
  "The Future of Arabic AI: Opportunities and Impact",
  "Higher Education Trends in the Arab World",
  "Digital Libraries: Transforming Access",
  "Academic Publishing in a Changing World",
],

insightDate: "May",

noBooksFound: "No books found",


 statsLabels: {
  years: "Years of Excellence",
  countries: "Countries Served",
  universities: "University Partners",
  students: "Students Served",
  publishers: "Publishing Partners",
  titles: "Academic Titles",
  clients: "Government & Institutional Clients",
  digitalAccess: "Digital Access",
},
statsValues: {
  years: "40+",
  countries: "22+",
  universities: "1,200+",
  students: "10 Million+",
  publishers: "250+",
  titles: "1.5 Million+",
  clients: "1,000+",
  digitalAccess: "24/7",
},
publicationCategories: {
  all: "All",
  engineering: "Engineering",
  medicine: "Medicine",
  law: "Law",
  business: "Business",
},
    },
store: {
  destination: "Your Destination for\nAcademic  Excellence",
  description:
    "Thousands of academic books, eBooks and resources from world's leading publishers.",

  shop: "Shop Now",
  ebooks: "Browse eBooks",
  categories: "Shop by Category",
  bestSellers: "Best Sellers",
  viewAll: "View All",
  viewAllBestSellers: "View All Best Sellers",

  features: [
    "Books & eBooks",
    "Best Prices",
    "Exclusive Offers",
    "Authoritative Content",
    "Customer Support",
  ],

  newReleases: "New Releases",
  textbooks: "Textbooks",
  openAccess: "Open Access",
  offers: "Deals & Offers",

  search: "Search by title, author, ISBN, or keywords...",

  // Store header
  fastDelivery: "Fast Delivery Across GCC & Worldwide",
  securePayment: "100% Secure Payment",
  dedicatedSupport: "Dedicated Support",
  forInstitutions: "For Institutions",
  helpCenter: "Help Center",
  uaeCurrency: "UAE (AED)",
  allCategories: "All Categories",

  // Store navigation
  categoriesNav: "Categories",
  newReleasesNav: "New Releases",
  ubh: "UBH",
  bestSellersNav: "Best Sellers",
  ebooksNav: "eBooks",
  textbooksNav: "Textbooks",
  series: "Series",
  publishersNav: "Publishers",
  offersNav: "Deals & Offers",
  openAccessNav: "Open Access",
  institutionsNav: "For Institutions",

  // Sample navigation / dropdown data
  navItems: {
    categories: [
      "Academic & Professional",
      "Business & Economics",
      "Computer Science & IT",
      "Engineering",
      "Medicine & Health Sciences",
      "Law",
      "Education",
      "Social Sciences",
      "Arts & Humanities",
      "Science & Mathematics",
    ],

    newReleases: [
      "Latest Publications",
      "New This Month",
      "Coming Soon",
      "Recently Added",
    ],

    ubh: [
      "UBH Publications",
      // "UBH Books",
      // "UBH eBooks",
      // "University Book House",
    ],

    bestSellers: [
      "Top Academic Books",
      "Top eBooks",
      "Popular Textbooks",
      "Trending Titles",
    ],

    ebooks: [
      "All eBooks",
      "Academic eBooks",
      "Professional eBooks",
      "Open Access eBooks",
    ],

    textbooks: [
      "School Textbooks",
      "University Textbooks",
      "Medical Textbooks",
      "Engineering Textbooks",
      "Computer Science Textbooks",
    ],

    series: [
      "Academic Series",
      "Professional Series",
      "Textbook Series",
      "Reference Series",
    ],

    // publishers: [
    //   "All Publishers",
    //   "International Publishers",
    //   "University Publishers",
    //   "Academic Publishers",
    // ],
    publishers: [ "Local Arabic Publishers", "International Arabic Publishers", "Local English Publishers", "International English Publishers", ],

    offers: [
      "Special Offers",
      "Clearance",
      "Bundle Offers",
      "Student Offers",
      "Institutional Offers",
    ],

    openAccess: [
      "Open Access Books",
      "Open Access Journals",
      "Free Academic Resources",
      "Research Resources",
    ],

    institutions: [
      "University Solutions",
      "Library Solutions",
      "Bulk Orders",
      "Institutional Pricing",
      "Contact Sales",
    ],
  },

  // Main sections
  ebooksLibrary: "eBooks Library",
  ebooksLibraryDescription:
    "Explore thousands of eBooks anytime, anywhere.",

  exploreEbooks: "Explore eBooks",

  institutionsTitle: "For Institutions",
  institutionsDescription:
    "Special pricing, tailored solutions and dedicated support.",

  learnMore: "Learn More",
  explore: "Explore",

  newReleasesDescription:
    "Stay updated with the latest publications",

  textbooksDescription:
    "Essential textbooks for students & faculty",

  openAccessDescription:
    "Discover open access academic resources",

  offersDescription:
    "Exclusive offers on selected titles",

  noCover: "No cover available",
  ratingCount: "842",

  account: "Account",
wishlist: "Wishlist",
cart: "Cart",
},
    publishers: {
  breadcrumbHome: "Home",
  breadcrumbPublishers: "Publishers",
  title: "Publishers We Work With",
  description:
    "Explore a world of trusted publishers, bringing you the latest academic resources, research and knowledge from around the globe.",

  searchPlaceholder: "Search by publisher name...",
  search: "Search",

  filterTitle: "Filter Publishers",
  clearAll: "Clear All",
  subjectArea: "Subject Area",
  countryRegion: "Country / Region",
  language: "Language",

  results: "Showing",
  of: "of",
  publisherCount: "Publishers",

  sortBy: "Sort by",
  sortAZ: "A – Z",
  sort: "Sort",

  viewPublisher: "View Publisher",
  previousPage: "Previous page",
  nextPage: "Next page",

  ctaTitle: "Partner with the World's",
  ctaTitleSecondLine: "Leading Publishers",
  ctaDescription:
    "Together, we bring knowledge, innovation and opportunity to your institution.",
  institutions: "For Institutions",
  contact: "Contact Us",

  subjects: {
    business: "Business & Economics",
    computerScience: "Computer Science & IT",
    education: "Education & Teaching",
    engineering: "Engineering & Technology",
    medicine: "Health & Medicine",
    humanities: "Humanities & Social Sciences",
    science: "Science & Mathematics",
    law: "Law",
    arts: "Arts & Architecture",
  },

  countries: {
    uk: "United Kingdom",
    us: "United States",
    canada: "Canada",
    germany: "Germany",
    france: "France",
    australia: "Australia",
    netherlands: "Netherlands",
    others: "Others",
  },

  languages: {
    english: "English",
    arabic: "Arabic",
    french: "French",
    german: "German",
    spanish: "Spanish",
  },
  details: {
  academicPublisher: "Academic Publisher",
  publisherProfile: "Publisher Profile",
  about: "About",
  exploreResources:
    "Explore the publisher's academic resources and discover books available through University Book House.",
  academicCoverage: "Academic Coverage",
  subjectAreas: "Subject Areas",
  availableCollection: "Available Collection",
  booksResources: "Books & Academic Resources",
  booksDescription:
    "Browse books and academic resources from this publisher available through University Book House.",
  viewAllBooks: "View All Books",
  academicResource: "Academic Resource",
  explorePublications: "Explore Publications",
  browseBooks: "Browse Books",
  publisherInformation: "Publisher Information",
  country: "Country",
  founded: "Founded",
  publications: "Publications",
  visitWebsite: "Visit Publisher Website",
  explorePublishers: "Explore Publishers",
  viewAllPublishers: "View All Publishers",
  discoverMore: "Discover More Academic",
  resources: "Resources",
  discoverDescription:
    "Explore books and learning resources from leading publishers.",
  allPublishers: "All Publishers",
},
publisherDescriptions: {
  "cambridge-university-press": {
    description:
      "A global leader in academic publishing, advancing knowledge and shaping a better tomorrow.",
    longDescription:
      "Cambridge University Press is a world-leading academic publisher with a long history of supporting research, education and learning. Its publications span a broad range of academic disciplines and are used by students, educators, researchers and institutions around the world.",
  },

  "oxford-university-press": {
    description:
      "Trusted for over 450 years, Oxford University Press publishes world-leading research and academic resources.",
    longDescription:
      "Oxford University Press is a major academic publisher producing research, educational resources, dictionaries and scholarly publications for learners, educators and researchers worldwide.",
  },
  

  "springer": {
    description:
      "Publishing high-quality research and innovative solutions for a better tomorrow.",
    longDescription:
      "Springer Nature is a global publisher serving researchers, educators and professionals through academic books, journals and digital research resources.",
  },

  "mcgraw-hill": {
    description:
      "Empowering learners with trusted educational content and digital tools.",
    longDescription:
      "McGraw Hill develops educational content, learning solutions and digital resources designed to support students, educators and institutions.",
  },

  pearson: {
    description:
      "World-class learning solutions for every stage of life.",
    longDescription:
      "Pearson provides educational content, assessment and learning solutions supporting students, educators and institutions across a wide range of disciplines.",
  },

  wiley: {
    description:
      "Advancing knowledge and innovation through research, books and digital learning.",
    longDescription:
      "Wiley is a global academic publisher providing research publications, books and digital learning resources for students, researchers, educators and professionals.",
  },

  elsevier: {
    description:
      "Providing trusted information and tools to drive progress in science and healthcare.",
    longDescription:
      "Elsevier provides scientific, technical and medical information and research solutions used by researchers, healthcare professionals, educators and institutions.",
  },

  "taylor-francis": {
    description:
      "Supporting research and learning with quality content and innovative solutions.",
    longDescription:
      "Taylor & Francis publishes academic books and journals across a broad range of disciplines, supporting research, teaching and professional learning.",
  },

  cengage: {
    description:
      "Creating technology-driven solutions for better learning outcomes.",
    longDescription:
      "Cengage provides educational content, digital learning platforms and resources designed to support students and instructors.",
  },

  brill: {
    description:
      "Bridging the past and future through exceptional research and academic publishing.",
    longDescription:
      "Brill is an international academic publisher specializing in scholarly publications across the humanities, social sciences, law and related disciplines.",
  },

  bloomsbury: {
    description:
      "Publishing for a creative, connected and curious world.",
    longDescription:
      "Bloomsbury publishes books and digital resources across academic, professional, educational and creative fields.",
  },

  ieee: {
    description:
      "Advancing technology for a better tomorrow.",
    longDescription:
      "IEEE provides technical and scientific publications, standards and educational resources supporting research and innovation in engineering and technology.",
  },

  routledge: {
    description:
      "World-leading books, journals and resources for the social sciences and humanities.",
    longDescription:
      "Routledge publishes academic books and resources across the social sciences, humanities and related disciplines.",
  },

  "sage-publications": {
    description:
      "Quality research, teaching and learning for a better future.",
    longDescription:
      "SAGE publishes research, educational materials and digital resources supporting teaching, learning and scholarly communication.",
  },

  "pan-macmillan": {
    description:
      "Inspiring readers and supporting lifelong learning through extraordinary books.",
    longDescription:
      "Pan Macmillan publishes a broad range of books across fiction, non-fiction, education and other areas for readers and learners.",
  },

  hogrefe: {
    description:
      "Evidence-based knowledge for better mental health and well-being.",
    longDescription:
      "Hogrefe publishes academic and professional resources with a strong focus on psychology, mental health and related disciplines.",
  },
  "mit-press": {
    description:
      "A leading academic publisher in science, technology, design, and the humanities.",
    longDescription:
      "The MIT Press publishes scholarly books and other works across science, technology, design, architecture, and the humanities.",
  },
},
},
product: {
  home: "Home",
  shop: "Shop",
  backToShop: "Back to Shop",
  academicBook: "Academic Book",
  authors: "Authors",
  isbn: "ISBN",
  edition: "Edition",
  price: "Price",
  save: "Save",
  inStock: "In Stock",
  available: "available",
  outOfStock: "Out of Stock",
  quantity: "Quantity",
  addToCart: "Add to Cart",
  addedToCart: "Added to Cart",
  buyNow: "Buy Now",
  addToWishlist: "Add to Wishlist",
  removeFromWishlist: "Remove from Wishlist",
  addedToWishlist: "Added to Wishlist",
  share: "Share",
  genuine: "Genuine",
  uaeDelivery: "UAE Delivery",
  support: "Support",
  noCover: "No cover available",
  deliveryTitle: "UAE & International Delivery",
  deliveryDescription:
    "Delivery options will be calculated during checkout.",
  ubh: "University Book House",
  location: "Al Ain, UAE",
  productInformation: "Product Information",
  aboutBook: "About This Book",
  academicCoverage: "Academic Coverage",
  subjectAreas: "Subject Areas",
  bookDetails: "Book Details",
  published: "Published",
  language: "Language",
  pages: "Pages",
  format: "Format",
  publisher: "Publisher",
  viewPublisher: "View Publisher",
  cartNotification: "Added to cart",
  viewCart: "View Cart",
},
cart: {
  home: "Home",
  cart: "Shopping Cart",
  shoppingBag: "Shopping Bag",

  items: "items",

  continueShopping: "Continue Shopping",

  emptyCart: "Your cart is empty",
  emptyCartDescription:
    "You have not added any books to your shopping cart yet.",
  startShopping: "Start Shopping",

  remove: "Remove",
  clearCart: "Clear Cart",

  orderSummary: "Order Summary",
  subtotal: "Subtotal",
  delivery: "Delivery",
  calculatedAtCheckout: "Calculated at checkout",
  total: "Total",

  proceedToCheckout: "Proceed to Checkout",

  secureCheckout: "Secure Checkout",
  uaeDelivery: "UAE Delivery",
},
wishlist: {
  home: "Home",
  wishlist: "Wishlist",
  savedBooks: "Saved Books",
  items: "items",
  continueShopping: "Continue Shopping",
  emptyWishlist: "Your wishlist is empty",
  emptyWishlistDescription:
    "Save books you are interested in and come back to them whenever you are ready.",
  browseBooks: "Browse Books",
  clearWishlist: "Clear Wishlist",
  remove: "Remove",
  saved: "Saved",
  inStock: "In Stock",
  outOfStock: "Out of Stock",
  addToCart: "Add to Cart",
  addedToCart: "Added to Cart",
  viewProduct: "View Product",
},
checkout: {
  home: "Home",
  cart: "Shopping Cart",
  checkout: "Checkout",
  backToCart: "Back to Cart",

  secureCheckout: "Secure Checkout",
  checkoutDescription:
    "Complete your delivery details to place your order.",

  emptyCart: "Your cart is empty",
  emptyCartDescription:
    "Add books to your cart before proceeding to checkout.",
  browseBooks: "Browse Books",

  contactInformation: "Contact Information",
  contactDescription:
    "We will use these details to contact you regarding your order.",

  fullName: "Full Name",
  fullNamePlaceholder: "Enter your full name",

  email: "Email Address",
  emailPlaceholder: "you@example.com",

  phone: "Phone Number",
  phonePlaceholder: "+971 50 123 4567",

  deliveryAddress: "Delivery Address",
  deliveryDescription:
    "Please provide the address where you would like your books delivered.",

  address: "Street Address",
  addressPlaceholder: "Building, street and area",

  apartment: "Apartment, Suite, Villa",
  apartmentPlaceholder: "Apartment, villa or unit number",

  city: "City",
  cityPlaceholder: "Enter your city",

  emirate: "Emirate",
  selectEmirate: "Select Emirate",

  abuDhabi: "Abu Dhabi",
  dubai: "Dubai",
  sharjah: "Sharjah",
  ajman: "Ajman",
  ummAlQuwain: "Umm Al Quwain",
  rasAlKhaimah: "Ras Al Khaimah",
  fujairah: "Fujairah",

  postalCode: "Postal Code",
  postalCodePlaceholder: "Optional",

  deliveryMethod: "Delivery Method",
  deliveryMethodDescription:
    "Choose how you would like to receive your order.",

  standardDelivery: "Standard Delivery",
  standardDeliveryDescription:
    "Delivery within the UAE. Delivery charges will be calculated based on your order and location.",

  calculatedAtCheckout: "Calculated at checkout",

  orderSummary: "Order Summary",
  items: "items",
  subtotal: "Subtotal",
  delivery: "Delivery",
  total: "Total",

  placeOrder: "Place Order",
  orderPlaced: "Order Submitted",

  secureInformation:
    "Your information is handled securely and is used only to process and deliver your order.",

  termsDescription:
    "By placing your order, you agree to our terms and conditions.",

  uaeDelivery: "UAE Delivery",
},
profile: {
  home: "Home",
  profile: "My Profile",
  myAccount: "My Account",
  profileDescription:
    "Manage your personal information, orders, wishlist and account settings.",

  accountHolder: "Your Name",
  member: "UBH Customer",

  personalInformation: "Personal Information",
  personalInformationDescription:
    "Manage your account details and contact information.",

  name: "Name",
  firstName: "First Name",
  firstNamePlaceholder: "Enter your first name",
  lastName: "Last Name",
  lastNamePlaceholder: "Enter your last name",

  email: "Email Address",
  emailPlaceholder: "you@example.com",

  phone: "Phone Number",
  phonePlaceholder: "+971 50 123 4567",

  accountStatus: "Account Status",
  active: "Active",

  edit: "Edit",
  saveChanges: "Save Changes",
  cancel: "Cancel",
  changesSaved: "Your profile information has been saved.",

  addresses: "Delivery Addresses",
  addressDescription:
    "Manage the addresses used for your book deliveries.",
  manage: "Manage",
  defaultAddress: "Default Address",
  noAddress:
    "No delivery address has been added yet.",

  quickLinks: "Quick Links",

  orders: "My Orders",
  ordersDescription:
    "View your previous and current orders.",

  wishlist: "Wishlist",
  wishlistDescription:
    "View the books you have saved.",

  cart: "Shopping Cart",
  cartDescription:
    "View the books currently in your cart.",

  logout: "Sign Out",
},
  },
  ar: {
    nav: {
      about: "من نحن",shop:"محل", publications: "المنشورات", publishers: "الناشرون",
      institutions: "المؤسسات", digital: "الحلول الرقمية", ai: "حلول الذكاء الاصطناعي (العيني)",
      research: "الأبحاث والرؤى", news: "الأخبار", contact: "تواصل معنا", institutionCta: "للمؤسسات",
      search: "بحث",
openMenu: "فتح القائمة",
closeMenu: "إغلاق القائمة",
menu: "القائمة",
publishing: "النشر",
solutions: "الحلول",
    },
    
    home: {
      eyebrow: "منذ 1986",
      heroTitle: "نرتقي بالمعرفة في العالم العربي",
      heroText: "نشر وتوزيع وتمكين المعرفة الأكاديمية للجامعات والحكومات والمكتبات والباحثين وابتكارات الذكاء الاصطناعي.",
      explore: "استكشف حلولنا", institutions: "للمؤسسات",
      reachTitle: "انتشار عالمي، تركيز إقليمي",
      reachText: "نقدم المعرفة الأكاديمية والحلول الرقمية في الشرق الأوسط وشمال أفريقيا وما حولهما.",
      reachCta: "استكشف نطاقنا",
      impact: "أثرنا بالأرقام",
      publishersTitle: "نمثل نخبة من أبرز الناشرين الأكاديميين في العالم",
      institutionsTitle: "موثوقون لدى المؤسسات التعليمية والحكومية الرائدة",
      viewAllInstitutions:"عرض جميع المؤسسات",
      ecosystem: "منظومة UBH",
journey: "مسيرتنا",
publications: "أحدث المنشورات",
insights: "الأبحاث والرؤى",

ecosystemTitle: "منظومتنا",
journeyTitle: "مسيرتنا",
publicationsTitle: "منشوراتنا",
viewAllPublications: "عرض جميع المنشورات",
insightsTitle: "رؤى وأفكار",
viewAllInsights: "عرض جميع الرؤى",

partnerTitle: "شارك في بناء مستقبل المعرفة الأكاديمية في العالم العربي",
      partnerText: "لنبنِ معًا مستقبل التعليم والبحث والابتكار.",
      contact: "تواصل معنا",
      // publishersTitle: "نمثل نخبة من أبرز الناشرين الأكاديميين في العالم",
publishersEyebrow: "شركاؤنا",
publishersDescription:
  "استكشف الكتب والموارد الأكاديمية من أبرز الناشرين حول العالم.",
publishersViewAll: "عرض جميع الناشرين",
publishersTrusted: "شركاء نشر موثوقون",

publisherRegion: {
  country: "الإمارات العربية المتحدة",
  universitiesServed: "الجامعات التي نخدمها",
  institutions: "المؤسسات",
  titlesSupplied: "العناوين الموردة",
  yearsActive: "سنوات النشاط",
  regionalReach: "انتشار UBH الإقليمي",
},
impactStats: {
  books: "كتاب تم توصيله",
  digital: "مورد رقمي تم الوصول إليه",
  libraries: "مكتبة تم تزويدها",
  universities: "جامعة نحظى بدعمها",
  researchers: "باحث تم الوصول إليه",
  titles: "عنوان أكاديمي من ناشرين رائدين",
},

ecosystemDescription:
  "منظومة متكاملة للمعرفة الأكاديمية.",

ecosystemItems: {
  publishing: "النشر",
  distribution: "التوزيع",
  store: "متجر UBH",
  digitalLearning: "التعلّم الرقمي",
  institutionalSolutions: "الحلول المؤسسية",
  alaini: "العيني",
  futurePlatforms: "المنصات الرقمية المستقبلية",
},

journeyItems: [
  {
    year: "1986",
    description: "تأسيس UBH في العين، الإمارات العربية المتحدة",
  },
  {
    year: "التسعينيات",
    description: "التوسع في الإمارات ودول مجلس التعاون الخليجي",
  },
  {
    year: "الألفينات",
    description: "شراكات استراتيجية مع دور نشر عالمية",
  },
  {
    year: "2010s",
    description: "التحول الرقمي والتعلّم الإلكتروني",
  },
  {
    year: "2020s",
    description: "إطلاق العيني ومنصات رقمية مستقبلية",
  },
  {
    year: "المستقبل",
    description: "بناء بنية متكاملة رائدة للمعرفة الأكاديمية",
  },
],

insightItems: [
  "مستقبل الذكاء الاصطناعي العربي: الفرص والأثر",
  "اتجاهات التعليم العالي في العالم العربي",
  "المكتبات الرقمية: تطوير الوصول إلى المعرفة",
  "النشر الأكاديمي في عالم متغير",
],

insightDate: "مايو",

noBooksFound: "لم يتم العثور على كتب",


statsLabels: {
  years: "سنوات من التميز",
  countries: "دولة نخدمها",
  universities: "شركاء جامعيون",
  students: "الطلاب الذين نخدمهم",
  publishers: "شركاء النشر",
  titles: "عناوين أكاديمية",
  clients: "عملاء حكوميون ومؤسسيون",
  digitalAccess: "الوصول الرقمي",
},
statsValues: {
  years: "٤٠+",
  countries: "٢٢+",
  universities: "١٬٢٠٠+",
  students: "١٠ ملايين+",
  publishers: "٢٥٠+",
  titles: "١٫٥ مليون+",
  clients: "١٬٠٠٠+",
  digitalAccess: "٢٤/٧",
},
publicationCategories: {
  all: "الكل",
  engineering: "الهندسة",
  medicine: "الطب",
  law: "القانون",
  business: "إدارة الأعمال",
},

    },
store: {
  destination: "وجهتك للتميز الأكاديمي",
  description:
    "آلاف الكتب الأكاديمية والكتب الإلكترونية والموارد من أبرز الناشرين حول العالم.",

  shop: "تسوق الآن",
  ebooks: "تصفح الكتب الإلكترونية",
  categories: "تسوق حسب الفئة",
  bestSellers: "الأكثر مبيعًا",
  viewAll: "عرض الكل",
  viewAllBestSellers: "عرض جميع الأكثر مبيعًا",

  features: [
    "الكتب والكتب الإلكترونية",
    "أفضل الأسعار",
    "عروض حصرية",
    "محتوى موثوق",
    "دعم العملاء",
  ],

  newReleases: "إصدارات جديدة",
  textbooks: "الكتب الدراسية",
  openAccess: "الوصول المفتوح",
  offers: "العروض",

  search:
    "ابحث بالعنوان أو المؤلف أو ISBN أو الكلمات المفتاحية...",

  // Store header
  fastDelivery: "توصيل سريع في دول الخليج وحول العالم",
  securePayment: "دفع آمن 100٪",
  dedicatedSupport: "دعم مخصص",
  forInstitutions: "للمؤسسات",
  helpCenter: "مركز المساعدة",
  uaeCurrency: "الإمارات العربية المتحدة (درهم)",
  allCategories: "جميع الفئات",

  // Store navigation
  categoriesNav: "الفئات",
  newReleasesNav: "إصدارات جديدة",
  ubh: "UBH",
  bestSellersNav: "الأكثر مبيعًا",
  ebooksNav: "الكتب الإلكترونية",
  textbooksNav: "الكتب الدراسية",
  series: "السلاسل",
  publishersNav: "الناشرون",
  offersNav: "العروض",
  openAccessNav: "الوصول المفتوح",
  institutionsNav: "للمؤسسات",

  // بيانات تجريبية للقوائم المنسدلة
  navItems: {
    categories: [
      "الأكاديمية والمهنية",
      "الأعمال والاقتصاد",
      "علوم الحاسوب وتقنية المعلومات",
      "الهندسة",
      "الطب والعلوم الصحية",
      "القانون",
      "التعليم",
      "العلوم الاجتماعية",
      "الفنون والعلوم الإنسانية",
      "العلوم والرياضيات",
    ],

    newReleases: [
      "أحدث الإصدارات",
      "إصدارات هذا الشهر",
      "قريبًا",
      "المضاف حديثًا",
    ],

    ubh: [
      "منشورات UBH",
      // "كتب UBH",
      // "الكتب الإلكترونية من UBH",
      // "جامعة كتاب هاوس",
    ],

    bestSellers: [
      "أفضل الكتب الأكاديمية",
      "أفضل الكتب الإلكترونية",
      "الكتب الدراسية الأكثر مبيعًا",
      "العناوين الرائجة",
    ],

    ebooks: [
      "جميع الكتب الإلكترونية",
      "الكتب الإلكترونية الأكاديمية",
      "الكتب الإلكترونية المهنية",
      "الكتب الإلكترونية مفتوحة الوصول",
    ],

    textbooks: [
      "الكتب المدرسية",
      "الكتب الجامعية",
      "الكتب الطبية",
      "كتب الهندسة",
      "كتب علوم الحاسوب",
    ],

    series: [
      "السلاسل الأكاديمية",
      "السلاسل المهنية",
      "سلاسل الكتب الدراسية",
      "السلاسل المرجعية",
    ],

    // publishers: [
    //   "جميع الناشرين",
    //   "الناشرون الدوليون",
    //   "الناشرون الجامعيون",
    //   "الناشرون الأكاديميون",
    // ],
    publishers: [ "الناشرون العرب المحليون", "الناشرون العرب الدوليون", "الناشرون المحليون للكتب الإنجليزية", "الناشرون الدوليون للكتب الإنجليزية", ],

    offers: [
      "العروض الخاصة",
      "التصفية",
      "عروض الحزم",
      "عروض الطلاب",
      "عروض المؤسسات",
    ],

    openAccess: [
      "كتب مفتوحة الوصول",
      "مجلات مفتوحة الوصول",
      "موارد أكاديمية مجانية",
      "موارد البحث العلمي",
    ],

    institutions: [
      "حلول الجامعات",
      "حلول المكتبات",
      "الطلبات بالجملة",
      "الأسعار المؤسسية",
      "تواصل مع المبيعات",
    ],
  },

  // Main sections
  ebooksLibrary: "مكتبة الكتب الإلكترونية",

  ebooksLibraryDescription:
    "استكشف آلاف الكتب الإلكترونية في أي وقت ومن أي مكان.",

  exploreEbooks: "استكشف الكتب الإلكترونية",

  institutionsTitle: "للمؤسسات",

  institutionsDescription:
    "أسعار خاصة وحلول مخصصة ودعم مخصص.",

  learnMore: "اعرف المزيد",
  explore: "استكشف",

  newReleasesDescription:
    "ابقَ على اطلاع بأحدث الإصدارات",

  textbooksDescription:
    "كتب دراسية أساسية للطلاب وأعضاء هيئة التدريس",

  openAccessDescription:
    "اكتشف الموارد الأكاديمية مفتوحة الوصول",

  offersDescription:
    "عروض حصرية على عناوين مختارة",

  noCover: "لا توجد صورة غلاف",
  ratingCount: "٨٤٢",

  account: "الحساب",
wishlist: "المفضلة",
cart: "السلة",
},
    publishers: {
  breadcrumbHome: "الرئيسية",
  breadcrumbPublishers: "الناشرون",
  title: "الناشرون الذين نتعامل معهم",
  description:
    "استكشف مجموعة من دور النشر الموثوقة التي تقدم أحدث الموارد الأكاديمية والأبحاث والمعرفة من مختلف أنحاء العالم.",

  searchPlaceholder: "ابحث عن اسم الناشر...",
  search: "بحث",

  filterTitle: "تصفية الناشرين",
  clearAll: "مسح الكل",
  subjectArea: "المجال الموضوعي",
  countryRegion: "الدولة / المنطقة",
  language: "اللغة",

  results: "عرض",
  of: "من",
  publisherCount: "ناشرًا",

  sortBy: "ترتيب حسب",
  sortAZ: "أ – ي",
  sort: "ترتيب",

  viewPublisher: "عرض الناشر",
  previousPage: "الصفحة السابقة",
  nextPage: "الصفحة التالية",

  ctaTitle: "شارك أبرز دور النشر",
  ctaTitleSecondLine: "الأكاديمية في العالم",
  ctaDescription:
    "نعمل معًا على تقديم المعرفة والابتكار والفرص لمؤسستك.",
  institutions: "للمؤسسات",
  contact: "تواصل معنا",

  subjects: {
    business: "الأعمال والاقتصاد",
    computerScience: "علوم الحاسوب وتقنية المعلومات",
    education: "التعليم والتدريس",
    engineering: "الهندسة والتكنولوجيا",
    medicine: "الصحة والطب",
    humanities: "العلوم الإنسانية والاجتماعية",
    science: "العلوم والرياضيات",
    law: "القانون",
    arts: "الفنون والعمارة",
  },

  countries: {
    uk: "المملكة المتحدة",
    us: "الولايات المتحدة",
    canada: "كندا",
    germany: "ألمانيا",
    france: "فرنسا",
    australia: "أستراليا",
    netherlands: "هولندا",
    others: "أخرى",
  },

  languages: {
    english: "الإنجليزية",
    arabic: "العربية",
    french: "الفرنسية",
    german: "الألمانية",
    spanish: "الإسبانية",
  },
  details: {
  academicPublisher: "ناشر أكاديمي",
  publisherProfile: "ملف الناشر",
  about: "حول",
  exploreResources:
    "استكشف الموارد الأكاديمية للناشر واكتشف الكتب المتاحة من خلال دار الكتب الجامعية.",
  academicCoverage: "التغطية الأكاديمية",
  subjectAreas: "المجالات الدراسية",
  availableCollection: "المجموعة المتاحة",
  booksResources: "الكتب والموارد الأكاديمية",
  booksDescription:
    "تصفح الكتب والموارد الأكاديمية من هذا الناشر والمتاحة من خلال دار الكتب الجامعية.",
  viewAllBooks: "عرض جميع الكتب",
  academicResource: "مورد أكاديمي",
  explorePublications: "استكشف منشورات",
  browseBooks: "تصفح الكتب",
  publisherInformation: "معلومات الناشر",
  country: "الدولة",
  founded: "تأسس",
  publications: "المنشورات",
  visitWebsite: "زيارة موقع الناشر",
  explorePublishers: "استكشف الناشرين",
  viewAllPublishers: "عرض جميع الناشرين",
  discoverMore: "اكتشف المزيد من",
  resources: "الموارد الأكاديمية",
  discoverDescription:
    "استكشف الكتب وموارد التعلم من كبار الناشرين.",
  allPublishers: "جميع الناشرين",
},
publisherDescriptions: {
  "cambridge-university-press": {
    description:
      "ناشر أكاديمي عالمي رائد يساهم في تطوير المعرفة وبناء مستقبل أفضل.",
    longDescription:
      "تعد مطبعة جامعة كامبريدج من أبرز الناشرين الأكاديميين في العالم، وتمتلك تاريخًا طويلًا في دعم البحث والتعليم والتعلم. وتغطي منشوراتها مجموعة واسعة من التخصصات الأكاديمية ويستخدمها الطلاب والمعلمون والباحثون والمؤسسات حول العالم.",
  },

  "oxford-university-press": {
    description:
      "ناشر موثوق لأكثر من 450 عامًا، يقدم أبحاثًا وموارد أكاديمية رائدة عالميًا.",
    longDescription:
      "تعد مطبعة جامعة أكسفورد من كبار الناشرين الأكاديميين، حيث تقدم الأبحاث والموارد التعليمية والقواميس والمنشورات العلمية للمتعلمين والمعلمين والباحثين في جميع أنحاء العالم.",
  },

  "springer": {
    description:
      "نشر أبحاث عالية الجودة وحلول مبتكرة من أجل مستقبل أفضل.",
    longDescription:
      "تعد Springer Nature ناشرًا عالميًا يخدم الباحثين والمعلمين والمتخصصين من خلال الكتب الأكاديمية والمجلات والموارد البحثية الرقمية.",
  },

  "mcgraw-hill": {
    description:
      "تمكين المتعلمين من خلال المحتوى التعليمي الموثوق والأدوات الرقمية.",
    longDescription:
      "تطور McGraw Hill المحتوى التعليمي وحلول التعلم والموارد الرقمية المصممة لدعم الطلاب والمعلمين والمؤسسات.",
  },

  pearson: {
    description:
      "حلول تعليمية عالمية المستوى لجميع مراحل الحياة.",
    longDescription:
      "توفر Pearson المحتوى التعليمي والتقييم وحلول التعلم لدعم الطلاب والمعلمين والمؤسسات في مجموعة واسعة من التخصصات.",
  },

  wiley: {
    description:
      "تطوير المعرفة والابتكار من خلال الأبحاث والكتب والتعلم الرقمي.",
    longDescription:
      "تعد Wiley ناشرًا أكاديميًا عالميًا يوفر المنشورات البحثية والكتب وموارد التعلم الرقمية للطلاب والباحثين والمعلمين والمتخصصين.",
  },

  elsevier: {
    description:
      "توفير معلومات وأدوات موثوقة لدعم التقدم في العلوم والرعاية الصحية.",
    longDescription:
      "توفر Elsevier المعلومات العلمية والتقنية والطبية وحلول البحث التي يستخدمها الباحثون والمتخصصون في الرعاية الصحية والمعلمون والمؤسسات.",
  },

  "taylor-francis": {
    description:
      "دعم البحث والتعلم من خلال محتوى عالي الجودة وحلول مبتكرة.",
    longDescription:
      "تنشر Taylor & Francis الكتب والمجلات الأكاديمية في مجموعة واسعة من التخصصات، وتدعم البحث والتعليم والتعلم المهني.",
  },

  cengage: {
    description:
      "إنشاء حلول تعليمية تعتمد على التكنولوجيا لتحقيق نتائج تعلم أفضل.",
    longDescription:
      "توفر Cengage المحتوى التعليمي ومنصات التعلم الرقمية والموارد المصممة لدعم الطلاب والمدرسين.",
  },

  brill: {
    description:
      "الربط بين الماضي والمستقبل من خلال الأبحاث المتميزة والنشر الأكاديمي.",
    longDescription:
      "تعد Brill ناشرًا أكاديميًا دوليًا متخصصًا في المنشورات العلمية في مجالات العلوم الإنسانية والاجتماعية والقانون والتخصصات ذات الصلة.",
  },

  bloomsbury: {
    description:
      "النشر من أجل عالم مبدع ومترابط وفضولي.",
    longDescription:
      "تنشر Bloomsbury الكتب والموارد الرقمية في المجالات الأكاديمية والمهنية والتعليمية والإبداعية.",
  },

  ieee: {
    description:
      "تطوير التكنولوجيا من أجل مستقبل أفضل.",
    longDescription:
      "توفر IEEE المنشورات والمعايير والموارد التعليمية التقنية والعلمية التي تدعم البحث والابتكار في الهندسة والتكنولوجيا.",
  },

  routledge: {
    description:
      "كتب ومجلات وموارد رائدة عالميًا في العلوم الاجتماعية والعلوم الإنسانية.",
    longDescription:
      "تنشر Routledge الكتب والموارد الأكاديمية في مجالات العلوم الاجتماعية والعلوم الإنسانية والتخصصات ذات الصلة.",
  },

  "sage-publications": {
    description:
      "أبحاث وتعليم وتعلم عالي الجودة من أجل مستقبل أفضل.",
    longDescription:
      "تنشر SAGE الأبحاث والمواد التعليمية والموارد الرقمية التي تدعم التعليم والتعلم والتواصل العلمي.",
  },

  "pan-macmillan": {
    description:
      "إلهام القراء ودعم التعلم مدى الحياة من خلال الكتب المتميزة.",
    longDescription:
      "تنشر Pan Macmillan مجموعة واسعة من الكتب في مجالات الأدب والكتب غير الروائية والتعليم وغيرها من المجالات.",
  },

  hogrefe: {
    description:
      "معرفة قائمة على الأدلة من أجل صحة نفسية ورفاهية أفضل.",
    longDescription:
      "تنشر Hogrefe الموارد الأكاديمية والمهنية مع تركيز قوي على علم النفس والصحة النفسية والتخصصات ذات الصلة.",
  },
  "mit-press": {
  "description": "دار نشر أكاديمية رائدة في مجالات العلوم، والتكنولوجيا، والتصميم، والعلوم الإنسانية.",
  "longDescription": "تنشر دار مراجع معهد ماساتشوستس للتكنولوجيا (MIT Press) الكتب الأكاديمية والمؤلفات الأخرى في مجالات العلوم، والتكنولوجيا، والتصميم، والهندسة المعمارية، والعلوم الإنسانية."
}

},



},
product: {
  home: "الرئيسية",
  shop: "المتجر",
  backToShop: "العودة إلى المتجر",
  academicBook: "كتاب أكاديمي",
  authors: "المؤلفون",
  isbn: "الرقم الدولي المعياري للكتاب",
  edition: "الطبعة",
  price: "السعر",
  save: "وفّر",
  inStock: "متوفر",
  available: "نسخة متاحة",
  outOfStock: "غير متوفر",
  quantity: "الكمية",
  addToCart: "أضف إلى السلة",
  addedToCart: "تمت الإضافة إلى السلة",
  buyNow: "اشترِ الآن",
  addToWishlist: "أضف إلى المفضلة",
  removeFromWishlist: "إزالة من المفضلة",
  addedToWishlist: "تمت الإضافة إلى المفضلة",
  share: "مشاركة",
  genuine: "منتج أصلي",
  uaeDelivery: "التوصيل داخل الإمارات",
  support: "الدعم",
  noCover: "لا توجد صورة غلاف",
  deliveryTitle: "التوصيل داخل الإمارات ودوليًا",
  deliveryDescription:
    "سيتم احتساب خيارات التوصيل أثناء إتمام الطلب.",
  ubh: "دار الكتب الجامعية",
  location: "العين، الإمارات العربية المتحدة",
  productInformation: "معلومات المنتج",
  aboutBook: "نبذة عن الكتاب",
  academicCoverage: "التغطية الأكاديمية",
  subjectAreas: "المجالات الموضوعية",
  bookDetails: "تفاصيل الكتاب",
  published: "سنة النشر",
  language: "اللغة",
  pages: "عدد الصفحات",
  format: "الصيغة",
  publisher: "الناشر",
  viewPublisher: "عرض الناشر",
  cartNotification: "تمت الإضافة إلى السلة",
  viewCart: "عرض السلة",
},
cart: {
  home: "الرئيسية",
  cart: "سلة التسوق",
  shoppingBag: "سلة التسوق",

  items: "منتجات",

  continueShopping: "متابعة التسوق",

  emptyCart: "سلة التسوق فارغة",
  emptyCartDescription:
    "لم تقم بإضافة أي كتب إلى سلة التسوق بعد.",
  startShopping: "ابدأ التسوق",

  remove: "إزالة",
  clearCart: "إفراغ السلة",

  orderSummary: "ملخص الطلب",
  subtotal: "المجموع الفرعي",
  delivery: "التوصيل",
  calculatedAtCheckout: "سيتم احتسابه عند إتمام الطلب",
  total: "الإجمالي",

  proceedToCheckout: "المتابعة إلى الدفع",

  secureCheckout: "دفع آمن",
  uaeDelivery: "التوصيل داخل الإمارات",
},
wishlist: {
  home: "الرئيسية",
  wishlist: "قائمة الأمنيات",
  savedBooks: "الكتب المحفوظة",
  items: "منتجات",
  continueShopping: "متابعة التسوق",
  emptyWishlist: "قائمة الأمنيات فارغة",
  emptyWishlistDescription:
    "احفظ الكتب التي تهمك للعودة إليها عندما تكون مستعدًا للشراء.",
  browseBooks: "تصفح الكتب",
  clearWishlist: "إفراغ قائمة الأمنيات",
  remove: "إزالة",
  saved: "محفوظ",
  inStock: "متوفر",
  outOfStock: "غير متوفر",
  addToCart: "أضف إلى السلة",
  addedToCart: "تمت الإضافة",
  viewProduct: "عرض المنتج",
},
checkout: {
  home: "الرئيسية",
  cart: "سلة التسوق",
  checkout: "إتمام الطلب",
  backToCart: "العودة إلى السلة",

  secureCheckout: "إتمام الطلب بشكل آمن",
  checkoutDescription:
    "أكمل بيانات التوصيل لإتمام طلبك.",

  emptyCart: "سلة التسوق فارغة",
  emptyCartDescription:
    "أضف الكتب إلى سلة التسوق قبل المتابعة إلى إتمام الطلب.",
  browseBooks: "تصفح الكتب",

  contactInformation: "معلومات التواصل",
  contactDescription:
    "سنستخدم هذه البيانات للتواصل معك بخصوص طلبك.",

  fullName: "الاسم الكامل",
  fullNamePlaceholder: "أدخل اسمك الكامل",

  email: "البريد الإلكتروني",
  emailPlaceholder: "you@example.com",

  phone: "رقم الهاتف",
  phonePlaceholder: "+971 50 123 4567",

  deliveryAddress: "عنوان التوصيل",
  deliveryDescription:
    "يرجى إدخال العنوان الذي ترغب في توصيل الكتب إليه.",

  address: "عنوان الشارع",
  addressPlaceholder: "المبنى والشارع والمنطقة",

  apartment: "الشقة أو الفيلا أو الوحدة",
  apartmentPlaceholder: "رقم الشقة أو الفيلا أو الوحدة",

  city: "المدينة",
  cityPlaceholder: "أدخل المدينة",

  emirate: "الإمارة",
  selectEmirate: "اختر الإمارة",

  abuDhabi: "أبوظبي",
  dubai: "دبي",
  sharjah: "الشارقة",
  ajman: "عجمان",
  ummAlQuwain: "أم القيوين",
  rasAlKhaimah: "رأس الخيمة",
  fujairah: "الفجيرة",

  postalCode: "الرمز البريدي",
  postalCodePlaceholder: "اختياري",

  deliveryMethod: "طريقة التوصيل",
  deliveryMethodDescription:
    "اختر الطريقة التي ترغب في استلام طلبك بها.",

  standardDelivery: "التوصيل العادي",
  standardDeliveryDescription:
    "التوصيل داخل دولة الإمارات. سيتم احتساب رسوم التوصيل حسب الطلب والموقع.",

  calculatedAtCheckout: "سيتم احتسابه عند إتمام الطلب",

  orderSummary: "ملخص الطلب",
  items: "منتجات",
  subtotal: "المجموع الفرعي",
  delivery: "التوصيل",
  total: "الإجمالي",

  placeOrder: "إتمام الطلب",
  orderPlaced: "تم إرسال الطلب",

  secureInformation:
    "يتم التعامل مع معلوماتك بشكل آمن وتستخدم فقط لمعالجة طلبك وتوصيله.",

  termsDescription:
    "بإتمام طلبك، فإنك توافق على الشروط والأحكام.",

  uaeDelivery: "التوصيل داخل الإمارات",
},
profile: {
  home: "الرئيسية",
  profile: "ملفي الشخصي",
  myAccount: "حسابي",
  profileDescription:
    "إدارة معلوماتك الشخصية وطلباتك وقائمة الأمنيات وإعدادات الحساب.",

  accountHolder: "اسم المستخدم",
  member: "عميل UBH",

  personalInformation: "المعلومات الشخصية",
  personalInformationDescription:
    "إدارة بيانات الحساب ومعلومات التواصل الخاصة بك.",

  name: "الاسم",
  firstName: "الاسم الأول",
  firstNamePlaceholder: "أدخل اسمك الأول",
  lastName: "اسم العائلة",
  lastNamePlaceholder: "أدخل اسم العائلة",

  email: "البريد الإلكتروني",
  emailPlaceholder: "you@example.com",

  phone: "رقم الهاتف",
  phonePlaceholder: "+971 50 123 4567",

  accountStatus: "حالة الحساب",
  active: "نشط",

  edit: "تعديل",
  saveChanges: "حفظ التغييرات",
  cancel: "إلغاء",
  changesSaved: "تم حفظ معلومات الملف الشخصي.",

  addresses: "عناوين التوصيل",
  addressDescription:
    "إدارة العناوين المستخدمة لتوصيل الكتب الخاصة بك.",
  manage: "إدارة",
  defaultAddress: "العنوان الافتراضي",
  noAddress:
    "لم تتم إضافة عنوان توصيل حتى الآن.",

  quickLinks: "روابط سريعة",

  orders: "طلباتي",
  ordersDescription:
    "عرض طلباتك السابقة والحالية.",

  wishlist: "قائمة الأمنيات",
  wishlistDescription:
    "عرض الكتب التي قمت بحفظها.",

  cart: "سلة التسوق",
  cartDescription:
    "عرض الكتب الموجودة حاليًا في سلة التسوق.",

  logout: "تسجيل الخروج",
},
  },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

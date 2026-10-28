import { SHOP_CATEGORIES } from "@/lib/store/categories";

import {
  BookOpen,
  Monitor,
  Library,
  GraduationCap,
  Users,
  BookMarked,
  Truck,
  ShoppingBag,
  Laptop,
  Building2,
  Sparkles,
  Cpu,
} from "lucide-react";

export const homeStats = [
  "years",
  "countries",
  "universities",
  "students",
  "publishers",
  "titles",
  "clients",
  "digitalAccess",
] as const;

export const impactStats = [
  ["25+ Million", "Books Delivered"], ["8+ Million", "Digital Resources Accessed"],
  ["5,000+", "Libraries Supplied"], ["1,200+", "Universities Supported"],
  ["500,000+", "Researchers Reached"], ["1.5 Million+", "Academic Titles from Leading Publishers"],
];
export const impactIcons = [
  BookOpen,
  Monitor,
  Library,
  GraduationCap,
  Users,
  BookMarked,
];

// export const publishers = ["CAMBRIDGE UNIVERSITY PRESS", "Springer", "McGraw Hill", "WILEY", "OXFORD UNIVERSITY PRESS", "Taylor & Francis Group", "Pearson", "ELSEVIER"];
export const publishers = [
  {
    name: "Cambridge University Press",
    slug: "cambridge-university-press",
    logo: "/images/publishers/cambridge-university-press-logo-vector.png",
  },
  {
    name: "Springer",
    slug: "springer",
    logo: "/images/publishers/springer.png",
  },
  {
    name: "McGraw Hill",
    slug: "mcgraw-hill",
    logo: "/images/publishers/mgh-logo.svg",
  },
  {
    name: "Wiley",
    slug: "wiley",
    logo: "/images/publishers/Wiley_logo.svg",
  },
  {
    name: "Oxford University Press",
    slug: "oxford-university-press",
    logo: "/images/publishers/oxford.svg",
  },
  {
    name: "Taylor & Francis Group",
    slug: "taylor-francis",
    logo: "/images/publishers/taylor-francis-group-seeklogo.svg",
  },
  {
    name: "Pearson",
    slug: "pearson",
    logo: "/images/publishers/pearson.png",
  },
  {
    name: "Elsevier",
    slug: "elsevier",
    logo: "/images/publishers/elsevier-logo-orange.svg",
  },
];
// export const institutions = ["UNIVERSITY OF SHARJAH", "Khalifa University", "UAEU", "QATAR UNIVERSITY", "BRITISH COUNCIL", "MINISTRY OF EDUCATION UAE"];
export const institutions = [
  {
    name: "University of Sharjah",
    logo: "/images/institutions/uos.png",
  },
  {
    name: "Khalifa University",
    logo: "/images/institutions/Khalifa_University_New_Logo.png",
  },
  {
    name: "UAEU",
    logo: "/images/institutions/uaeu-logo.svg",
  },
  {
    name: "Qatar University",
    logo: "/images/institutions/qulogo.png",
  },
  {
    name: "British Council",
    logo: "/images/institutions/british_c_logo.svg",
  },
  {
    name: "Ministry of Education UAE",
    logo: "/images/institutions/moe-logo-en.svg",
  },
];

// export const books = [
//   { title: "Sapiens", author: "Yuval Noah Harari", category: "History & Humanities", price: "AED 69.00", old: "AED 89.00", image: "/images/store/book-1.jpg" },
//   { title: "Principles of Economics", author: "N. Gregory Mankiw", category: "Economics", price: "AED 309.00", old: "AED 390.00", image: "/images/store/book-2.jpg" },
//   { title: "Data Science for Beginners", author: "John Paul Mueller", category: "Computer Science", price: "AED 210.00", old: "AED 260.00", image: "/images/store/book-3.jpg" },
//   { title: "Artificial Intelligence", author: "Stuart Russell", category: "AI & Technology", price: "AED 280.00", old: "AED 350.00", image: "/images/store/book-4.jpg" },
//   { title: "Research Methods", author: "Ranjit Kumar", category: "Research", price: "AED 190.00", old: "AED 250.00", image: "/images/store/book-5.jpg" },
//   { title: "Corporate Finance", author: "Jonathan Berk", category: "Business", price: "AED 230.00", old: "AED 240.00", image: "/images/store/book-6.jpg" },
// ];

export const books = [
  // {
  //   id: "book-1",
  //   title: "Sapiens",
  //   author: "Yuval Noah Harari",
  //   publisher: "HarperCollins",
  //   category: "Business",
  //   image: "/images/store/book-1.webp",
  // },
  // {
  //   id: "book-2",
  //   title: "Principles of Economics",
  //   author: "N. Gregory Mankiw",
  //   publisher: "Cengage Learning",
  //   category: "Business",
  //   image: "/images/store/book-2.webp",
  // },
  // {
  //   id: "book-3",
  //   title: "Data Science for Beginners",
  //   author: "John Paul Mueller",
  //   publisher: "Wiley",
  //   category: "Engineering",
  //   image: "/images/store/book-3.webp",
  // },
  // {
  //   id: "book-4",
  //   title: "Artificial Intelligence",
  //   author: "Stuart Russell",
  //   publisher: "Pearson",
  //   category: "Engineering",
  //   image: "/images/store/book-4.webp",
  // },
  // {
  //   id: "book-5",
  //   title: "Research Methods",
  //   author: "Ranjit Kumar",
  //   publisher: "SAGE Publications",
  //   category: "Medicine",
  //   image: "/images/store/book-5.webp",
  // },
  // {
  //   id: "book-6",
  //   title: "Corporate Finance",
  //   author: "Jonathan Berk",
  //   publisher: "Pearson",
  //   category: "Business",
  //   image: "/images/store/book-6.webp",
  // },
  
  {
    id: "book-1",
    slug: "sapiens",
    title: "Sapiens",
    authors: ["Yuval Noah Harari"],
    publisher: "HarperCollins",
    publisherSlug: "harpercollins", // تم إضافة الحقل المفقود
    category: "Business",
    cover: "/images/store/book-1.webp",
    description: "Explore the history of humankind...",
    price: 59.00,
    currency: "AED",
    stock: 25,
    sku: "UBH-DEMO-0001",
    isbn: undefined,
    isbn10: undefined,
    barcode: undefined,
    edition: undefined,
    publicationYear: undefined,
    language: "English",
    format: "Paperback",
    pages: 464,
    subjects: ["History", "Anthropology"], // تم إضافة الحقل المفقود
    rating: 4.8,
    reviewCount: 125,
    featured: true,
    active: true,
  },
  {
    id: "book-2",
    slug: "principles-of-economics",
    title: "Principles of Economics",
    authors: ["N. Gregory Mankiw"],
    publisher: "Cengage Learning",
    publisherSlug: "cengage-learning", // تم إضافة الحقل المفقود
    category: "Business",
    cover: "/images/store/book-2.webp",
    description: "Learn the foundations of economics...",
    price: 89.00,
    currency: "AED",
    stock: 18,
    sku: "UBH-DEMO-0002",
    isbn: undefined,
    isbn10: undefined,
    barcode: undefined,
    edition: undefined,
    publicationYear: undefined,
    language: "English",
    format: "Paperback",
    pages: 900,
    subjects: ["Economics"], // تم إضافة الحقل المفقود
    rating: 4.7,
    reviewCount: 86,
    featured: true,
    active: true,
  },
  {
    id: "book-3",
    slug: "data-science-for-beginners",
    title: "Data Science for Beginners",
    authors: ["John Paul Mueller"],
    publisher: "Wiley",
    publisherSlug: "wiley", // تم إضافة الحقل المفقود
    category: "Engineering",
    cover: "/images/store/book-3.webp",
    description: "An introductory learning resource...",
    price: 75.00,
    currency: "AED",
    stock: 14,
    sku: "UBH-DEMO-0003",
    isbn: undefined,
    isbn10: undefined,
    barcode: undefined,
    edition: undefined,
    publicationYear: undefined,
    language: "English",
    format: "Paperback",
    pages: 320,
    subjects: ["Data Science", "Programming"], // تم إضافة الحقل المفقود
    rating: 4.5,
    reviewCount: 42,
    featured: false,
    active: true,
  },
  {
    id: "book-4",
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    authors: ["Stuart Russell"],
    publisher: "Pearson",
    publisherSlug: "pearson", // تم إضافة الحقل المفقود
    category: "Engineering",
    cover: "/images/store/book-4.webp",
    description: "Discover artificial intelligence...",
    price: 129.00,
    currency: "AED",
    stock: 12,
    sku: "UBH-DEMO-0004",
    isbn: undefined,
    isbn10: undefined,
    barcode: undefined,
    edition: "4th Edition",
    publicationYear: 2020,
    language: "English",
    format: "Hardcover",
    pages: 1152,
    subjects: ["Artificial Intelligence", "Computer Science"], // تم إضافة الحقل المفقود
    rating: 4.9,
    reviewCount: 103,
    featured: true,
    active: true,
  },
  {
    id: "book-5",
    slug: "research-methods",
    title: "Research Methods",
    authors: ["Ranjit Kumar"],
    publisher: "SAGE Publications",
    publisherSlug: "sage-publications", // تم إضافة الحقل المفقود
    category: "Medicine",
    cover: "/images/store/book-5.webp",
    description: "A practical introduction to research...",
    price: 69.00,
    currency: "AED",
    stock: 20,
    sku: "UBH-DEMO-0005",
    isbn: undefined,
    isbn10: undefined,
    barcode: undefined,
    edition: undefined,
    publicationYear: undefined,
    language: "English",
    format: "Paperback",
    pages: 528,
    subjects: ["Research", "Education"], // تم إضافة الحقل المفقود
    rating: 4.6,
    reviewCount: 57,
    featured: false,
    active: true,
  },
  {
    id: "book-6",
    slug: "corporate-finance",
    title: "Corporate Finance",
    authors: ["Jonathan Berk"],
    publisher: "Pearson",
    publisherSlug: "pearson", // تم إضافة الحقل المفقود
    category: "Business",
    cover: "/images/store/book-6.webp",
    description: "Study corporate financial decision-making...",
    price: 115.00,
    currency: "AED",
    stock: 16,
    sku: "UBH-DEMO-0006",
    isbn: undefined,
    isbn10: undefined,
    barcode: undefined,
    edition: undefined,
    publicationYear: undefined,
    language: "English",
    format: "Hardcover",
    pages: 988,
    subjects: ["Finance", "Business"], // تم إضافة الحقل المفقود
    rating: 4.7,
    reviewCount: 64,
    featured: true,
    active: true,
  }

];
export const categories = SHOP_CATEGORIES.map(({ slug, en, ar }) => ({ slug, en, ar }));

export const ecosystemItems = [
  {
    name: {
      en: "Publishing",
      ar: "النشر",
    },
    icon: BookOpen,
  },
  {
    name: {
      en: "Distribution",
      ar: "التوزيع",
    },
    icon: Truck,
  },
  {
    name: {
      en: "UBH Store",
      ar: "متجر UBH",
    },
    icon: ShoppingBag,
  },
  {
    name: {
      en: "Digital Learning",
      ar: "التعلّم الرقمي",
    },
    icon: Laptop,
  },
  {
    name: {
      en: "Institutional Solutions",
      ar: "الحلول المؤسسية",
    },
    icon: Building2,
  },
  {
    name: {
      en: "AlAini",
      ar: "العيني",
    },
    icon: Sparkles,
  },
  {
    name: {
      en: "Future Digital Platforms",
      ar: "المنصات الرقمية المستقبلية",
    },
    icon: Cpu,
  },
];
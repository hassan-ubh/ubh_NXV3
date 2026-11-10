
// import type { CarouselItem } from "@/components/store/Bannner/BannerCarousel";

// export const bannersByLocale: Record<"en" | "ar", CarouselItem[]> = {
//   en: [
//     {
//       id: "ubh-publications",
//       title: "Discover Knowledge. Explore Our Publications.",
//       description:
//         "Explore academic publications from University Book House, bringing valuable knowledge and learning resources to students, educators and institutions.",
//       buttonText: "Explore Our Publications",
//       buttonLink: "/en/shop",
//       imageUrl: "/images/banners/ubh-publications.png",
//       backgroundColor: "#f5f1e9",
//     },
//     {
//       id: "world-history",
//       title: "Explore the Stories That Shaped Our World.",
//       description:
//         "Discover A Little History of the World by E. H. Gombrich, an engaging journey through the people, ideas and events that shaped human civilization.",
//       buttonText: "Discover the Book",
//       buttonLink: "/en/shop/a-little-history-of-the-world",
//       imageUrl: "https://covers.openlibrary.org/b/isbn/9780300143324-L.jpg",
//       backgroundColor: "#eef2f5",
//     },
//     {
//       id: "arabic-learning",
//       title: "Build Strong Foundations in Arabic.",
//       description:
//         "Explore Arabic learning resources designed to support language development, reading skills and a lifelong love of learning.",
//       buttonText: "Explore Arabic Books",
//       buttonLink: "/en/shop",
//       imageUrl: "/images/banners/arabic-learning.png",
//       backgroundColor: "#f4eee8",
//     },
//     {
//       id: "sociology",
//       title: "Understand Society. Discover New Perspectives.",
//       description:
//         "Explore the fundamentals of sociology and gain insights into social institutions, human relationships and the world around us.",
//       buttonText: "Explore the Book",
//       buttonLink: "/en/shop/demo-arabic-book-002",
//       imageUrl: "/images/banners/sociology.png",
//       backgroundColor: "#edf1f0",
//     },
//     {
//       id: "management",
//       title: "Develop the Knowledge to Lead Tomorrow.",
//       description:
//         "Discover modern management principles, leadership approaches and essential knowledge for tomorrow's business professionals.",
//       buttonText: "Explore Management Books",
//       buttonLink: "/en/shop/demo-arabic-book-003",
//       imageUrl: "/images/banners/management.png",
//       backgroundColor: "#f3f0e9",
//     },
//   ],

//   ar: [
//     {
//       id: "ubh-publications",
//       title: "اكتشف المعرفة واستكشف إصداراتنا",
//       description:
//         "استكشف إصدارات دار الكتب الجامعية الأكاديمية التي تقدم مصادر قيّمة للمعرفة والتعلم للطلاب والمعلمين والمؤسسات التعليمية.",
//       buttonText: "استكشف إصداراتنا",
//       buttonLink: "/ar/shop",
//       imageUrl: "/images/banners/ubh-publications.png",
//       backgroundColor: "#f5f1e9",
//     },
//     {
//       id: "world-history",
//       title: "استكشف القصص التي شكّلت عالمنا",
//       description:
//         "اكتشف كتاب لمحة موجزة عن تاريخ العالم للكاتب إرنست غومبريتش، في رحلة ممتعة عبر الشخصيات والأفكار والأحداث التي شكّلت الحضارة الإنسانية.",
//       buttonText: "اكتشف الكتاب",
//       buttonLink: "/ar/shop/a-little-history-of-the-world",
//       imageUrl: "https://covers.openlibrary.org/b/isbn/9780300143324-L.jpg",
//       backgroundColor: "#eef2f5",
//     },
//     {
//       id: "arabic-learning",
//       title: "أسّس معرفة راسخة باللغة العربية",
//       description:
//         "اكتشف مصادر تعليم اللغة العربية التي تدعم تطوير المهارات اللغوية والقراءة وتعزز حب التعلم مدى الحياة.",
//       buttonText: "استكشف الكتب العربية",
//       buttonLink: "/ar/shop",
//       imageUrl: "/images/banners/arabic-learning.png",
//       backgroundColor: "#f4eee8",
//     },
//     {
//       id: "sociology",
//       title: "افهم المجتمع واكتشف آفاقاً جديدة",
//       description:
//         "تعرّف على أساسيات علم الاجتماع واكتسب رؤى حول المؤسسات الاجتماعية والعلاقات الإنسانية والعالم من حولك.",
//       buttonText: "استكشف الكتاب",
//       buttonLink: "/ar/shop/demo-arabic-book-002",
//       imageUrl: "/images/banners/sociology.png",
//       backgroundColor: "#edf1f0",
//     },
//     {
//       id: "management",
//       title: "اكتسب المعرفة لقيادة المستقبل",
//       description:
//         "اكتشف مبادئ الإدارة الحديثة وأساليب القيادة والمعارف الأساسية لإعداد قادة الأعمال في المستقبل.",
//       buttonText: "استكشف كتب الإدارة",
//       buttonLink: "/ar/shop/demo-arabic-book-003",
//       imageUrl: "/images/banners/management.png",
//       backgroundColor: "#f3f0e9",
//     },
//   ],
// };

import type { CarouselItem } from "@/components/store/Bannner/BannerCarousel";


import { products } from "@/data/products";

const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug);

const getCover = (slug: string, fallback: string) =>
  getProduct(slug)?.cover || fallback;

const getCovers = (slugs: string[]) =>
  slugs
    .map((slug) => getProduct(slug)?.cover)
    .filter((cover): cover is string => Boolean(cover));

export const bannersByLocale: Record<"en" | "ar", CarouselItem[]> = {
  en: [
    {
      id: "ubh-publisher",
      variant: "publisher",
      eyebrow: "ADVANCING KNOWLEDGE SINCE 1986",
      title: "Discover a World of Knowledge.",
      subtitle: "University Book House Publications",
      description:
        "Explore academic publishing, educational resources and books that inspire students, educators and institutions.",
      buttonText: "Explore Our Books",
      buttonLink: "/en/shop/products?collection=ubh",
      imageUrl: "/images/main_images/aboutus-hero.webp",
      extraImages: getCovers([
  "ubh00007",
  "9786144523056",
  "9786144520246",
]),
    },
    {
      id: "world-history",
      variant: "editorial",
      eyebrow: "A BOOK FOR CURIOUS MINDS",
      title: "The Story of Our World.",
      subtitle: "A Little History of the World · E. H. Gombrich",
      description:
        "Discover an engaging introduction to world history through the people, ideas and events that shaped civilization.",
      buttonText: "Discover the Book",
      buttonLink: "/en/shop/a-little-history-of-the-world",
      imageUrl: getCover(
  "a-little-history-of-the-world",
  "/images/banners/world-history.png"
),
      price: 79,
      currency: "AED",
      badge: "Bestseller",
    },
    {
      id: "arabic-books",
      variant: "arabic",
      eyebrow: "LEARN • READ • GROW",
      title: "Discover the Beauty of Arabic.",
      titleAr: "اكتشف جمال اللغة العربية",
      description:
        "Explore Arabic learning resources that help young learners develop language skills and confidence.",
      descriptionAr:
        "اكتشف مصادر تعليم اللغة العربية التي تساعد الناشئين على تطوير مهاراتهم اللغوية وتعزيز ثقتهم بأنفسهم.",
      buttonText: "Explore Arabic Books",
      buttonTextAr: "استكشف الكتب العربية",
      buttonLink: "/en/shop/demo-arabic-book-001",
      imageUrl: "/images/banners/arabic-learning.png",
      extraImages: [
        "https://www.ubh.ae/web/image/product.product/49552/image_1024/%5BUBH00007%5D%20%D8%A7%D9%84%D9%85%D8%B1%D8%AC%D8%B9%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D8%AF%D8%A7%D9%88%D9%8A%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B9%D8%B4%D8%A7%D8%A8%20%D9%88%D8%A7%D9%84%D9%86%D8%A8%D8%A7%D8%AA%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9%20?unique=93f2ecf",
            "https://www.ubh.ae/web/image/product.product/28308/image_1024/%5B9786144523056%5D%20%D9%82%D8%B6%D8%A7%D9%8A%D8%A7%20%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%D8%A9%20%D9%81%D9%89%20%D8%A7%D8%AF%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82?unique=1fa3575",

             "https://www.ubh.ae/web/image/product.product/28278/image_1024/%5B9786144520246%5D%20%D8%A7%D9%84%D9%83%D9%87%D8%B1%D8%A8%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B3%D8%A7%D9%83%D9%86%D8%A9%20%D9%88%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%D8%A7%D8%AA%D9%87%D8%A7?unique=714f406",

      ],
      price: 65,
      oldPrice: 75,
      currency: "AED",
    },
    {
      id: "sociology",
      variant: "academic",
      eyebrow: "EXPLORE ACADEMIC KNOWLEDGE",
      title: "See Society from a New Perspective.",
      subtitle: "Introduction to Sociology",
      description:
        "Explore the ideas, institutions and relationships that shape human society with this introductory sociology title.",
      buttonText: "Explore This Book",
      buttonLink: "/en/shop/demo-arabic-book-002",
      imageUrl: getCover(
  "9789948389415",
  "/images/banners/sociology.png"
),
      price: 85,
      currency: "AED",
    },
    {
      id: "management",
      variant: "corporate",
      eyebrow: "FOR TOMORROW'S LEADERS",
      title: "Build Knowledge. Lead with Confidence.",
      subtitle: "Fundamentals of Modern Management",
      description:
        "Discover the foundations of planning, leadership and decision-making for today's changing organizations.",
      buttonText: "Explore Management",
      buttonLink: "/en/shop/demo-arabic-book-003",
      imageUrl: getCover(
  "marketing-management",
  "/images/banners/management.png"
),
      price: 95,
      oldPrice: 110,
      currency: "AED",
    },
  ],

  ar: [
    {
      id: "ubh-publisher",
      variant: "publisher",
      eyebrow: "نرتقي بالمعرفة منذ عام 1986",
      title: "اكتشف عالماً من المعرفة",
      subtitle: "إصدارات دار الكتب الجامعية",
      description:
        "اكتشف الكتب الأكاديمية والمصادر التعليمية التي تلهم الطلاب والمعلمين والمؤسسات التعليمية.",
      buttonText: "استكشف كتبنا",
      buttonLink: "/ar/shop",
      imageUrl: "/images/banners/ubh-publications.png",
      extraImages: [
        "https://www.ubh.ae/web/image/product.product/49552/image_1024/%5BUBH00007%5D%20%D8%A7%D9%84%D9%85%D8%B1%D8%AC%D8%B9%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D8%AF%D8%A7%D9%88%D9%8A%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B9%D8%B4%D8%A7%D8%A8%20%D9%88%D8%A7%D9%84%D9%86%D8%A8%D8%A7%D8%AA%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9%20?unique=93f2ecf",
            "https://www.ubh.ae/web/image/product.product/28308/image_1024/%5B9786144523056%5D%20%D9%82%D8%B6%D8%A7%D9%8A%D8%A7%20%D9%85%D8%B9%D8%A7%D8%B5%D8%B1%D8%A9%20%D9%81%D9%89%20%D8%A7%D8%AF%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82?unique=1fa3575",

             "https://www.ubh.ae/web/image/product.product/28278/image_1024/%5B9786144520246%5D%20%D8%A7%D9%84%D9%83%D9%87%D8%B1%D8%A8%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B3%D8%A7%D9%83%D9%86%D8%A9%20%D9%88%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%D8%A7%D8%AA%D9%87%D8%A7?unique=714f406",

      ],
    },
    {
      id: "world-history",
      variant: "editorial",
      eyebrow: "كتاب للعقول الفضولية",
      title: "حكاية عالمنا عبر التاريخ",
      subtitle: "A Little History of the World · E. H. Gombrich",
      description:
        "اكتشف مدخلاً ممتعاً إلى تاريخ العالم من خلال الشخصيات والأفكار والأحداث التي ساهمت في تشكيل الحضارات.",
      buttonText: "اكتشف الكتاب",
      buttonLink: "/ar/shop/a-little-history-of-the-world",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9780300143324-L.jpg",
      price: 79,
      currency: "AED",
    },
    {
      id: "arabic-books",
      variant: "arabic",
      eyebrow: "تعلّم • اقرأ • ارتقِ",
      title: "اكتشف جمال اللغة العربية",
      description:
        "اكتشف مصادر تعليم اللغة العربية التي تساعد الناشئين على تطوير مهاراتهم اللغوية وتعزيز ثقتهم بأنفسهم.",
      buttonText: "استكشف الكتب العربية",
      buttonLink: "/ar/shop/demo-arabic-book-001",
      imageUrl: "/images/banners/arabic-learning.png",
     extraImages: getCovers([
  "ubh00007",
  "9786144523056",
  "9786144520246",
]),
      price: 65,
      oldPrice: 75,
      currency: "AED",
    },
    {
      id: "sociology",
      variant: "academic",
      eyebrow: "اكتشف المعرفة الأكاديمية",
      title: "اكتشف المجتمع من منظور جديد",
      subtitle: "مدخل إلى علم الاجتماع",
      description:
        "تعرّف على الأفكار والمؤسسات والعلاقات التي تسهم في تشكيل المجتمع الإنساني.",
      buttonText: "استكشف الكتاب",
      buttonLink: "/ar/shop/demo-arabic-book-002",
      imageUrl:getCover(
  "9789948389415",
  "/images/banners/sociology.png"
),
      price: 85,
      currency: "AED",
    },
    {
      id: "management",
      variant: "corporate",
      eyebrow: "لقادة المستقبل",
      title: "ابنِ معرفتك وقُد بثقة",
      subtitle: "أساسيات الإدارة الحديثة",
      description:
        "اكتشف أساسيات التخطيط والقيادة واتخاذ القرار في المؤسسات الحديثة والمتغيرة.",
      buttonText: "استكشف كتب الإدارة",
      buttonLink: "/ar/shop/demo-arabic-book-003",
      imageUrl: getCover(
  "marketing-management",
 
   "9789948389415",
),
      price: 95,
      oldPrice: 110,
      currency: "AED",
    },
  ],
};

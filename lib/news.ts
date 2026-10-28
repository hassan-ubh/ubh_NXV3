export type Locale = "en" | "ar";
export const defaultLocale: Locale = "en";
export type LocalizedText = {
  en: string;
  ar: string;
};
export type NewsArticle = {
  slug: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: {
    en: string[];
    ar: string[];
  };
  date: string;
  image: string;
  featured?: boolean;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "ubh-commitment-to-academic-knowledge",

    category: {
      en: "Company",
      ar: "الشركة",
    },

    title: {
      en: "UBH Continues Its Commitment to Academic Knowledge",
      ar: "جامعة بوك هاوس تواصل التزامها بنشر المعرفة الأكاديمية",
    },

    excerpt: {
      en: "University Book House continues to expand access to academic books and educational resources for students, educators, researchers and institutions across the UAE.",
      ar: "تواصل جامعة بوك هاوس توسيع نطاق الوصول إلى الكتب الأكاديمية والمصادر التعليمية للطلاب والمعلمين والباحثين والمؤسسات في دولة الإمارات.",
    },

    content: {
      en: [
        "University Book House continues its commitment to making high-quality academic and educational resources more accessible to readers and institutions across the UAE.",
        "Through its publishing and distribution activities, UBH connects readers with local and international knowledge across a wide range of academic disciplines.",
        "The company continues to develop its publishing, distribution and digital capabilities to support the changing needs of students, educators, researchers and institutions.",
      ],
      ar: [
        "تواصل جامعة بوك هاوس التزامها بجعل المصادر الأكاديمية والتعليمية عالية الجودة أكثر سهولة في الوصول للقراء والمؤسسات في دولة الإمارات.",
        "ومن خلال أنشطة النشر والتوزيع، تربط جامعة بوك هاوس القراء بالمعرفة المحلية والدولية في مجموعة واسعة من التخصصات الأكاديمية.",
        "كما تواصل الشركة تطوير قدراتها في مجالات النشر والتوزيع والحلول الرقمية لتلبية الاحتياجات المتغيرة للطلاب والمعلمين والباحثين والمؤسسات.",
      ],
    },

    date: "2026-10-01",
    image: "/images/news/academic-knowledge.jpg",
    featured: true,
  },

  {
    slug: "building-stronger-publishing-connections",

    category: {
      en: "Publishing",
      ar: "النشر",
    },

    title: {
      en: "Building Stronger Connections Across the Publishing Industry",
      ar: "بناء علاقات أقوى في قطاع النشر",
    },

    excerpt: {
      en: "UBH works with local and international publishers to bring trusted academic and educational resources to readers in the region.",
      ar: "تعمل جامعة بوك هاوس مع دور النشر المحلية والدولية لتوفير المصادر الأكاديمية والتعليمية الموثوقة للقراء في المنطقة.",
    },

    content: {
      en: [
        "University Book House works with publishers and educational partners to make a diverse range of academic and professional resources available to readers in the region.",
        "Our distribution activities span multiple disciplines, supporting universities, institutions, professionals and individual readers.",
        "These relationships form an important part of UBH's role in connecting global knowledge with the local market.",
      ],
      ar: [
        "تعمل جامعة بوك هاوس مع دور النشر والشركاء في قطاع التعليم لتوفير مجموعة متنوعة من المصادر الأكاديمية والمهنية للقراء في المنطقة.",
        "وتغطي أنشطة التوزيع لدينا العديد من التخصصات، بما يدعم الجامعات والمؤسسات والمهنيين والقراء الأفراد.",
        "وتشكل هذه العلاقات جزءاً مهماً من دور جامعة بوك هاوس في ربط المعرفة العالمية بالسوق المحلي.",
      ],
    },

    date: "2026-09-20",
    image: "/images/news/publishing-connections.jpg",
  },

  {
    slug: "supporting-next-generation-of-learners",

    category: {
      en: "Education",
      ar: "التعليم",
    },

    title: {
      en: "Supporting the Next Generation of Readers and Learners",
      ar: "دعم الجيل القادم من القراء والمتعلمين",
    },

    excerpt: {
      en: "From academic textbooks to professional resources, UBH continues to support lifelong learning through books and educational content.",
      ar: "من الكتب الأكاديمية إلى المصادر المهنية، تواصل جامعة بوك هاوس دعم التعلم المستمر من خلال الكتب والمحتوى التعليمي.",
    },

    content: {
      en: [
        "Books remain an essential part of learning, research and professional development.",
        "UBH's catalogue brings together academic, educational and professional resources designed to support learners at different stages of their educational journey.",
        "Our goal is to make quality knowledge easier to discover and access.",
      ],
      ar: [
        "لا تزال الكتب جزءاً أساسياً من التعلم والبحث والتطوير المهني.",
        "وتجمع قائمة جامعة بوك هاوس مجموعة من المصادر الأكاديمية والتعليمية والمهنية المصممة لدعم المتعلمين في مختلف مراحل رحلتهم التعليمية.",
        "ويتمثل هدفنا في جعل المعرفة عالية الجودة أكثر سهولة في الاكتشاف والوصول.",
      ],
    },

    date: "2026-09-10",
    image: "/images/news/education.jpg",
  },

  {
    slug: "digital-future-of-books-and-learning",

    category: {
      en: "Digital",
      ar: "الحلول الرقمية",
    },

    title: {
      en: "The Digital Future of Books and Learning",
      ar: "المستقبل الرقمي للكتب والتعلم",
    },

    excerpt: {
      en: "Digital platforms are changing how readers discover, access and engage with educational resources.",
      ar: "تعمل المنصات الرقمية على تغيير طريقة اكتشاف القراء للمصادر التعليمية والوصول إليها والاستفادة منها.",
    },

    content: {
      en: [
        "The way readers discover and access information continues to evolve as digital technologies become increasingly integrated into education.",
        "UBH is exploring digital approaches that can complement traditional publishing and distribution while improving the customer experience.",
        "Our focus remains on making trusted knowledge easier to discover, access and use.",
      ],
      ar: [
        "تواصل طرق اكتشاف المعلومات والوصول إليها التطور مع ازدياد دمج التقنيات الرقمية في قطاع التعليم.",
        "وتستكشف جامعة بوك هاوس أساليب رقمية يمكنها دعم النشر والتوزيع التقليديين مع تحسين تجربة المستخدم.",
        "ويبقى تركيزنا على جعل المعرفة الموثوقة أكثر سهولة في الاكتشاف والوصول والاستخدام.",
      ],
    },

    date: "2026-08-28",
    image: "/images/news/digital-learning.jpg",
  },
];

export function getNewsBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export function getFeaturedNews() {
  return newsArticles.find((article) => article.featured);
}

export function getNewsByLocale(locale: Locale) {
  return newsArticles.map((article) => ({
    ...article,
    category: article.category[locale],
    title: article.title[locale],
    excerpt: article.excerpt[locale],
    content: article.content[locale],
  }));
}
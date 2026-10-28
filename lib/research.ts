
export type Locale = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type ResearchItem = {
  slug: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText[];
  date: string;
  image: string;
  featured?: boolean;
};

export const researchItems: ResearchItem[] = [
  {
    slug: "academic-publishing-trends-arab-world",

    category: {
      en: "Academic Publishing",
      ar: "النشر الأكاديمي",
    },

    title: {
      en: "Academic Publishing Trends in the Arab World",
      ar: "اتجاهات النشر الأكاديمي في العالم العربي",
    },

    excerpt: {
      en: "Exploring how academic publishing is evolving across universities, researchers, libraries, and knowledge institutions in the Arab world.",
      ar: "استكشاف تطور النشر الأكاديمي بين الجامعات والباحثين والمكتبات ومؤسسات المعرفة في العالم العربي.",
    },

    content: [
      {
        en: "Academic publishing continues to play an important role in supporting research, teaching, and knowledge exchange across the Arab world.",
        ar: "يواصل النشر الأكاديمي أداء دور مهم في دعم البحث العلمي والتعليم وتبادل المعرفة في العالم العربي.",
      },
      {
        en: "Universities and research institutions increasingly require reliable access to scholarly books, journals, digital resources, and specialized academic content.",
        ar: "تحتاج الجامعات والمؤسسات البحثية بشكل متزايد إلى الوصول الموثوق إلى الكتب العلمية والمجلات والمصادر الرقمية والمحتوى الأكاديمي المتخصص.",
      },
      {
        en: "For academic distributors and publishers, this creates opportunities to connect high-quality international and regional content with researchers and students.",
        ar: "يوفر ذلك للناشرين والموزعين الأكاديميين فرصاً لربط المحتوى الدولي والإقليمي عالي الجودة بالباحثين والطلاب.",
      },
    ],

    date: "2026-09-20",
    image: "/images/research/academic-publishing.jpg",
    featured: true,
  },

  {
    slug: "future-of-digital-learning",

    category: {
      en: "Digital Learning",
      ar: "التعلم الرقمي",
    },

    title: {
      en: "The Future of Digital Learning",
      ar: "مستقبل التعلم الرقمي",
    },

    excerpt: {
      en: "How digital resources and technology are changing the way students access academic knowledge.",
      ar: "كيف تغير الموارد الرقمية والتكنولوجيا طريقة وصول الطلاب إلى المعرفة الأكاديمية.",
    },

    content: [
      {
        en: "Digital learning has become an important part of modern education, giving students access to knowledge beyond the traditional printed book.",
        ar: "أصبح التعلم الرقمي جزءاً مهماً من التعليم الحديث، حيث يتيح للطلاب الوصول إلى المعرفة بما يتجاوز الكتاب المطبوع التقليدي.",
      },
      {
        en: "Universities are increasingly combining physical resources with digital platforms, electronic publications, online databases, and interactive learning materials.",
        ar: "تجمع الجامعات بشكل متزايد بين المصادر المطبوعة والمنصات الرقمية والمنشورات الإلكترونية وقواعد البيانات والمواد التعليمية التفاعلية.",
      },
      {
        en: "The future of academic distribution will increasingly depend on connecting trusted content with convenient digital experiences.",
        ar: "سيعتمد مستقبل توزيع المحتوى الأكاديمي بشكل متزايد على ربط المحتوى الموثوق بتجارب رقمية سهلة الاستخدام.",
      },
    ],

    date: "2026-08-15",
    image: "/images/research/digital-learning.jpg",
  },

  {
    slug: "role-of-academic-bookstores",

    category: {
      en: "Academic Institutions",
      ar: "المؤسسات الأكاديمية",
    },

    title: {
      en: "The Role of Academic Bookstores in Higher Education",
      ar: "دور المكتبات الأكاديمية في التعليم العالي",
    },

    excerpt: {
      en: "Academic bookstores remain an important connection between students, universities, publishers, and educational resources.",
      ar: "لا تزال المكتبات الأكاديمية حلقة مهمة بين الطلاب والجامعات والناشرين والمصادر التعليمية.",
    },

    content: [
      {
        en: "Academic bookstores provide students and faculty with direct access to textbooks, reference materials, academic publications, and other learning resources.",
        ar: "توفر المكتبات الأكاديمية للطلاب وأعضاء هيئة التدريس وصولاً مباشراً إلى الكتب الدراسية والمراجع والمنشورات الأكاديمية وغيرها من مصادر التعلم.",
      },
      {
        en: "Modern academic bookstores increasingly combine physical retail with digital services and institutional support.",
        ar: "تجمع المكتبات الأكاديمية الحديثة بشكل متزايد بين البيع بالتجزئة والخدمات الرقمية والدعم المؤسسي.",
      },
      {
        en: "This creates a more connected ecosystem around teaching, learning, research, and knowledge distribution.",
        ar: "يساهم ذلك في إنشاء منظومة أكثر ترابطاً حول التعليم والتعلم والبحث وتوزيع المعرفة.",
      },
    ],

    date: "2026-07-10",
    image: "/images/research/academic-bookstore.jpg",
  },

  {
    slug: "connecting-publishers-and-universities",

    category: {
      en: "Knowledge Distribution",
      ar: "توزيع المعرفة",
    },

    title: {
      en: "Connecting Publishers with Universities",
      ar: "ربط الناشرين بالجامعات",
    },

    excerpt: {
      en: "Why strong relationships between publishers, distributors, and academic institutions matter for knowledge access.",
      ar: "أهمية العلاقات القوية بين الناشرين والموزعين والمؤسسات الأكاديمية في توفير الوصول إلى المعرفة.",
    },

    content: [
      {
        en: "Universities require access to diverse academic content across disciplines, languages, and formats.",
        ar: "تحتاج الجامعات إلى الوصول إلى محتوى أكاديمي متنوع عبر مختلف التخصصات واللغات والصيغ.",
      },
      {
        en: "Publishers and distributors help bridge this gap by making specialized academic resources available to institutions and their communities.",
        ar: "يساهم الناشرون والموزعون في سد هذه الفجوة من خلال توفير المصادر الأكاديمية المتخصصة للمؤسسات ومجتمعاتها.",
      },
      {
        en: "Effective distribution depends on understanding institutional requirements and delivering reliable access to the right resources.",
        ar: "يعتمد التوزيع الفعال على فهم احتياجات المؤسسات وتوفير وصول موثوق إلى المصادر المناسبة.",
      },
    ],

    date: "2026-06-05",
    image: "/images/research/publishers-universities.jpg",
  },
];

/**
 * Get a research article by its slug.
 */
export function getResearchBySlug(
  slug: string,
): ResearchItem | undefined {
  return researchItems.find((item) => item.slug === slug);
}

/**
 * Get all featured research articles.
 */
export function getFeaturedResearch(): ResearchItem[] {
  return researchItems.filter((item) => item.featured);
}

/**
 * Get all research articles.
 *
 * The original LocalizedText structure is preserved so that
 * components can safely use:
 *
 * item.title[locale]
 * item.category[locale]
 * item.excerpt[locale]
 */
export function getResearchByLocale(
  _locale: Locale,
): ResearchItem[] {
  return researchItems;
}


export const publishers = [
  {
    name: "Cambridge University Press",
    slug: "cambridge-university-press",
    logo: "/images/publishers/cambridge-university-press-logo-vector.png",
    description:
      "A global leader in academic publishing, advancing knowledge and shaping a better tomorrow.",
    country: "United Kingdom",
    subjects: ["Education", "Science"],
    extra: 3,
  },
  {
    name: "Oxford University Press",
    slug: "oxford-university-press",
    logo: "/images/publishers/oxford.svg",
    description:
      "Trusted for over 450 years, Oxford University Press publishes world-leading research and academic resources.",
    country: "United Kingdom",
    subjects: ["Humanities", "Science"],
    extra: 4,
  },
  {
    name: "Springer Nature",
    slug: "springer",
    logo: "/images/publishers/springer.png",
    description:
      "Publishing high-quality research and innovative solutions for a better tomorrow.",
    country: "Germany",
    subjects: ["Science", "Technology"],
    extra: 2,
  },
  {
    name: "McGraw Hill",
    slug: "mcgraw-hill",
    logo: "/images/publishers/mgh-logo.svg",
    description:
      "Empowering learners with trusted educational content and digital tools.",
    country: "United States",
    subjects: ["Engineering", "Business"],
    extra: 3,
  },
  {
    name: "Pearson",
    slug: "pearson",
    logo: "/images/publishers/pearson.png",
    description: "World-class learning solutions for every stage of life.",
    country: "United Kingdom",
    subjects: ["Education", "Business"],
    extra: 3,
  },
  {
    name: "Wiley",
    slug: "wiley",
    logo: "/images/publishers/wiley_logo.svg",
    description:
      "Advancing knowledge and innovation through research, books and digital learning.",
    country: "United States",
    subjects: ["Science", "Medicine"],
    extra: 4,
  },
  {
    name: "Elsevier",
    slug: "elsevier",
    logo: "/images/publishers/elsevier-logo-orange.svg",
    description:
      "Providing trusted information and tools to drive progress in science and healthcare.",
    country: "Netherlands",
    subjects: ["Medicine", "Science"],
    extra: 3,
  },
  {
    name: "Taylor & Francis",
    slug: "taylor-francis",
    logo: "/images/publishers/taylor-francis-group-seeklogo.svg",
    description:
      "Supporting research and learning with quality content and innovative solutions.",
    country: "United Kingdom",
    subjects: ["Social Sciences", "Education"],
    extra: 2,
  },
  {
    name: "Cengage",
    slug: "cengage",
    logo: "/images/publishers/cengage.png",
    description:
      "Creating technology-driven solutions for better learning outcomes.",
    country: "United States",
    subjects: ["Education", "Business"],
    extra: 2,
  },
  {
    name: "Brill",
    slug: "brill",
    logo: "/images/publishers/brill.png",
    description:
      "Bridging the past and future through exceptional research and academic publishing.",
    country: "Netherlands",
    subjects: ["Law", "Humanities"],
    extra: 3,
  },
  {
    name: "Bloomsbury",
    slug: "bloomsbury",
    logo: "/images/publishers/bloomsbury.png",
    description: "Publishing for a creative, connected and curious world.",
    country: "United Kingdom",
    subjects: ["Literature", "Arts"],
    extra: 2,
  },
  {
    name: "IEEE",
    slug: "ieee",
    logo: "/images/publishers/ieee.png",
    description: "Advancing technology for a better tomorrow.",
    country: "United States",
    subjects: ["Engineering", "Technology"],
    extra: 2,
  },
  {
    name: "Routledge",
    slug: "routledge",
    logo: "/images/publishers/routledge.png",
    description:
      "World-leading books, journals and resources for the social sciences and humanities.",
    country: "United Kingdom",
    subjects: ["Social Sciences", "Humanities"],
    extra: 3,
  },
  {
    name: "SAGE Publications",
    slug: "sage-publications",
    logo: "/images/publishers/sage.png",
    description: "Quality research, teaching and learning for a better future.",
    country: "United States",
    subjects: ["Social Sciences", "Education"],
    extra: 2,
  },
  {
    name: "Pan Macmillan",
    slug: "pan-macmillan",
    logo: "/images/publishers/pan-macmillan.png",
    description:
      "Inspiring readers and supporting lifelong learning through extraordinary books.",
    country: "United Kingdom",
    subjects: ["Literature", "Education"],
    extra: 2,
  },
  {
    name: "Hogrefe",
    slug: "hogrefe",
    logo: "/images/publishers/hogrefe.png",
    description:
      "Evidence-based knowledge for better mental health and well-being.",
    country: "Germany",
    subjects: ["Psychology", "Medicine"],
    extra: 1,
  },
] as const;

export type Publisher = (typeof publishers)[number];

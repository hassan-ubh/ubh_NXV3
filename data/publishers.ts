
// export const publishers = [
//   {
//     name: "Cambridge University Press",
//     slug: "cambridge-university-press",
//     logo: "/images/publishers/cambridge-university-press-logo-vector.png",
//     description:
//       "A global leader in academic publishing, advancing knowledge and shaping a better tomorrow.",
//     country: "United Kingdom",
//     subjects: ["Education", "Science"],
//     extra: 3,
//   },
//   {
//     name: "Oxford University Press",
//     slug: "oxford-university-press",
//     logo: "/images/publishers/oxford.svg",
//     description:
//       "Trusted for over 450 years, Oxford University Press publishes world-leading research and academic resources.",
//     country: "United Kingdom",
//     subjects: ["Humanities", "Science"],
//     extra: 4,
//   },
//   {
//     name: "Springer Nature",
//     slug: "springer",
//     logo: "/images/publishers/springer.png",
//     description:
//       "Publishing high-quality research and innovative solutions for a better tomorrow.",
//     country: "Germany",
//     subjects: ["Science", "Technology"],
//     extra: 2,
//   },
//   {
//     name: "McGraw Hill",
//     slug: "mcgraw-hill",
//     logo: "/images/publishers/mgh-logo.svg",
//     description:
//       "Empowering learners with trusted educational content and digital tools.",
//     country: "United States",
//     subjects: ["Engineering", "Business"],
//     extra: 3,
//   },
//   {
//     name: "Pearson",
//     slug: "pearson",
//     logo: "/images/publishers/pearson.png",
//     description: "World-class learning solutions for every stage of life.",
//     country: "United Kingdom",
//     subjects: ["Education", "Business"],
//     extra: 3,
//   },
//   {
//     name: "Wiley",
//     slug: "wiley",
//     logo: "/images/publishers/wiley_logo.svg",
//     description:
//       "Advancing knowledge and innovation through research, books and digital learning.",
//     country: "United States",
//     subjects: ["Science", "Medicine"],
//     extra: 4,
//   },
//   {
//     name: "Elsevier",
//     slug: "elsevier",
//     logo: "/images/publishers/elsevier-logo-orange.svg",
//     description:
//       "Providing trusted information and tools to drive progress in science and healthcare.",
//     country: "Netherlands",
//     subjects: ["Medicine", "Science"],
//     extra: 3,
//   },
//   {
//     name: "Taylor & Francis",
//     slug: "taylor-francis",
//     logo: "/images/publishers/taylor-francis-group-seeklogo.svg",
//     description:
//       "Supporting research and learning with quality content and innovative solutions.",
//     country: "United Kingdom",
//     subjects: ["Social Sciences", "Education"],
//     extra: 2,
//   },
//   {
//     name: "Cengage",
//     slug: "cengage",
//     logo: "/images/publishers/cengage.png",
//     description:
//       "Creating technology-driven solutions for better learning outcomes.",
//     country: "United States",
//     subjects: ["Education", "Business"],
//     extra: 2,
//   },
//   {
//     name: "Brill",
//     slug: "brill",
//     logo: "/images/publishers/brill.png",
//     description:
//       "Bridging the past and future through exceptional research and academic publishing.",
//     country: "Netherlands",
//     subjects: ["Law", "Humanities"],
//     extra: 3,
//   },
//   {
//     name: "Bloomsbury",
//     slug: "bloomsbury",
//     logo: "/images/publishers/bloomsbury.png",
//     description: "Publishing for a creative, connected and curious world.",
//     country: "United Kingdom",
//     subjects: ["Literature", "Arts"],
//     extra: 2,
//   },
//   {
//     name: "IEEE",
//     slug: "ieee",
//     logo: "/images/publishers/ieee.png",
//     description: "Advancing technology for a better tomorrow.",
//     country: "United States",
//     subjects: ["Engineering", "Technology"],
//     extra: 2,
//   },
//   {
//     name: "Routledge",
//     slug: "routledge",
//     logo: "/images/publishers/routledge.png",
//     description:
//       "World-leading books, journals and resources for the social sciences and humanities.",
//     country: "United Kingdom",
//     subjects: ["Social Sciences", "Humanities"],
//     extra: 3,
//   },
//   {
//     name: "SAGE Publications",
//     slug: "sage-publications",
//     logo: "/images/publishers/sage.png",
//     description: "Quality research, teaching and learning for a better future.",
//     country: "United States",
//     subjects: ["Social Sciences", "Education"],
//     extra: 2,
//   },
//   {
//     name: "Pan Macmillan",
//     slug: "pan-macmillan",
//     logo: "/images/publishers/pan-macmillan.png",
//     description:
//       "Inspiring readers and supporting lifelong learning through extraordinary books.",
//     country: "United Kingdom",
//     subjects: ["Literature", "Education"],
//     extra: 2,
//   },
//   {
//     name: "Hogrefe",
//     slug: "hogrefe",
//     logo: "/images/publishers/hogrefe.png",
//     description:
//       "Evidence-based knowledge for better mental health and well-being.",
//     country: "Germany",
//     subjects: ["Psychology", "Medicine"],
//     extra: 1,
//   },
// ] as const;

// export type Publisher = (typeof publishers)[number];


export type PublisherMarket = "local" | "international";
export type PublisherLanguage = "ar" | "en";

export type Publisher = {
  name: string;
  slug: string;
  logo: string;
  description: string;
  country: string;
  subjects: string[];
  extra: number;
  market: PublisherMarket;
  languages: PublisherLanguage[];
};

export const publishers: Publisher[] = [
  // ─────────────────────────────────────────────
  // LOCAL PUBLISHERS
  // ─────────────────────────────────────────────
  {
    name: "Kalimat Group",
    slug: "kalimat-group",
    logo: "/images/publishers/kalimat-group.png",
    description:
      "A UAE-based publishing group known for Arabic literature, children's books, young adult titles, and cultural storytelling.",
    country: "United Arab Emirates",
    subjects: ["Literature", "Children's Books", "Education", "Arts"],
    extra: 3,
    market: "local",
    languages: ["ar", "en"],
  },
  {
    name: "Motivate Media Group",
    slug: "motivate-media-group",
    logo: "/images/publishers/motivate-media-group.png",
    description:
      "A UAE-based publisher producing books on regional history, culture, business, biographies, lifestyle, and photography.",
    country: "United Arab Emirates",
    subjects: ["History", "Business", "Literature", "Arts"],
    extra: 2,
    market: "local",
    languages: ["en"],
  },

  // ─────────────────────────────────────────────
  // INTERNATIONAL PUBLISHERS
  // ─────────────────────────────────────────────
  {
    name: "Cambridge University Press",
    slug: "cambridge-university-press",
    logo: "/images/publishers/cambridge.png",
    description:
      "Academic and educational publishing supporting research, teaching, and learning across a wide range of disciplines.",
    country: "United Kingdom",
    subjects: ["Education", "Science", "Humanities", "Social Sciences"],
    extra: 4,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Oxford University Press",
    slug: "oxford-university-press",
    logo: "/images/publishers/oxford.svg",
    description:
      "Academic, professional, and educational publications covering research, reference, language learning, and teaching.",
    country: "United Kingdom",
    subjects: ["Education", "Language", "Medicine", "Humanities"],
    extra: 4,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Springer",
    slug: "springer",
    logo: "/images/publishers/springer.png",
    description:
      "Scientific, technical, and medical publications serving researchers, students, and academic institutions.",
    country: "International",
    subjects: ["Science", "Engineering", "Medicine", "Technology"],
    extra: 4,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "McGraw Hill",
    slug: "mcgraw-hill",
    logo: "/images/publishers/mgh-logo.svg",
    description:
      "Educational resources and learning materials for schools, universities, professionals, and lifelong learners.",
    country: "United States",
    subjects: ["Business", "Education", "Engineering", "Science"],
    extra: 4,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Pearson",
    slug: "pearson",
    logo: "/images/publishers/pearson.png",
    description:
      "Education and learning resources for students, educators, and professionals across academic disciplines.",
    country: "United Kingdom",
    subjects: ["Education", "Business", "Computing", "Languages"],
    extra: 4,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Wiley",
    slug: "wiley",
    logo: "/images/publishers/Wiley_logo.svg",
    description:
      "Academic, scientific, and professional publishing supporting research, higher education, and career development.",
    country: "United States",
    subjects: ["Science", "Engineering", "Business", "Medicine"],
    extra: 4,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Elsevier",
    slug: "elsevier",
    logo: "/images/publishers/elsevier-logo-orange.svg",
    description:
      "Scientific and medical information resources for researchers, healthcare professionals, and academic institutions.",
    country: "International",
    subjects: ["Medicine", "Science", "Engineering", "Health"],
    extra: 4,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Taylor & Francis",
    slug: "taylor-and-francis",
    logo: "/images/publishers/taylor-francis-group-seeklogo.svg",
    description:
      "Scholarly books and journals across humanities, social sciences, science, technology, and medicine.",
    country: "United Kingdom",
    subjects: ["Social Sciences", "Humanities", "Science", "Medicine"],
    extra: 4,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Cengage",
    slug: "cengage",
    logo: "/images/publishers/cengage.png",
    description:
      "Higher education textbooks, digital learning resources, and professional learning materials.",
    country: "United States",
    subjects: ["Education", "Business", "Computing", "Science"],
    extra: 3,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Brill",
    slug: "brill",
    logo: "/images/publishers/brill.png",
    description:
      "Scholarly publishing with a focus on humanities, social sciences, international law, and selected sciences.",
    country: "Netherlands",
    subjects: ["Humanities", "History", "Law", "Social Sciences"],
    extra: 3,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Bloomsbury",
    slug: "bloomsbury",
    logo: "/images/publishers/bloomsbury.png",
    description:
      "Books and academic resources spanning humanities, education, professional subjects, and general interest.",
    country: "United Kingdom",
    subjects: ["Literature", "Education", "Humanities", "Arts"],
    extra: 3,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "IEEE",
    slug: "ieee",
    logo: "/images/publishers/ieee.png",
    description:
      "Technical publications and research resources in electrical engineering, computing, electronics, and technology.",
    country: "United States",
    subjects: ["Engineering", "Computer Science", "Electronics", "Technology"],
    extra: 3,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Routledge",
    slug: "routledge",
    logo: "/images/publishers/routledge.png",
    description:
      "Academic books and reference works across the humanities, social sciences, education, and professional fields.",
    country: "United Kingdom",
    subjects: ["Humanities", "Social Sciences", "Education", "Psychology"],
    extra: 3,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "SAGE",
    slug: "sage",
    logo: "/images/publishers/sage.png",
    description:
      "Academic and research publications supporting social sciences, education, health, and research methods.",
    country: "International",
    subjects: ["Social Sciences", "Education", "Psychology", "Research"],
    extra: 3,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Pan Macmillan",
    slug: "pan-macmillan",
    logo: "/images/publishers/pan-macmillan.png",
    description:
      "Book publishing across fiction, non-fiction, literature, biographies, and selected educational subjects.",
    country: "United Kingdom",
    subjects: ["Literature", "Fiction", "Biography", "Arts"],
    extra: 3,
    market: "international",
    languages: ["en", "ar"],
  },
  {
    name: "Hogrefe",
    slug: "hogrefe",
    logo: "/images/publishers/hogrefe.png",
    description:
      "Specialist publishing in psychology, mental health, assessment, and clinical and professional practice.",
    country: "Germany",
    subjects: ["Psychology", "Mental Health", "Medicine", "Education"],
    extra: 3,
    market: "international",
    languages: ["en", "ar"],
  },
];


export type PublisherTab =
  | "local-ar"
  | "local-en"
  | "international-ar"
  | "international-en";

export function filterPublishers(tab: PublisherTab): Publisher[] {
  const [market, language] = tab.split("-") as [
    PublisherMarket,
    PublisherLanguage,
  ];

  return publishers.filter(
    (publisher) =>
      publisher.market === market &&
      publisher.languages.includes(language),
  );
}

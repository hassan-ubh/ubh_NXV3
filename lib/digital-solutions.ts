// // lib/digital-solutions.ts

// export type Locale = "en" | "ar";

// export type LocalizedText = {
//   en: string;
//   ar: string;
// };

// export type DigitalSolution = {
//   slug: string;
//   icon: string;
//   title: LocalizedText;
//   shortDescription: LocalizedText;
//   description: LocalizedText;
//   features: LocalizedText[];
// };

// export const digitalSolutions: DigitalSolution[] = [
//   {
//     slug: "digital-publishing",
//     icon: "book-open",
//     title: {
//       en: "Digital Publishing",
//       ar: "النشر الرقمي",
//     },
//     shortDescription: {
//       en: "Bring academic and professional content to modern digital formats.",
//       ar: "تحويل المحتوى الأكاديمي والمهني إلى صيغ رقمية حديثة.",
//     },
//     description: {
//       en: "Digital publishing enables academic and professional content to reach readers through modern digital channels while maintaining quality, discoverability, and accessibility.",
//       ar: "يتيح النشر الرقمي تقديم المحتوى الأكاديمي والمهني للقراء من خلال قنوات رقمية حديثة مع الحفاظ على الجودة وسهولة الوصول والاكتشاف.",
//     },
//     features: [
//       {
//         en: "Digital content preparation",
//         ar: "إعداد المحتوى الرقمي",
//       },
//       {
//         en: "Electronic publication distribution",
//         ar: "توزيع المنشورات الإلكترونية",
//       },
//       {
//         en: "Academic content accessibility",
//         ar: "سهولة الوصول إلى المحتوى الأكاديمي",
//       },
//     ],
//   },

//   {
//     slug: "institutional-solutions",
//     icon: "building",
//     title: {
//       en: "Institutional Solutions",
//       ar: "الحلول المؤسسية",
//     },
//     shortDescription: {
//       en: "Support universities and institutions with tailored academic resource solutions.",
//       ar: "دعم الجامعات والمؤسسات بحلول مخصصة للمصادر الأكاديمية.",
//     },
//     description: {
//       en: "We help academic institutions connect their students, faculty, libraries, and departments with the academic resources they need.",
//       ar: "نساعد المؤسسات الأكاديمية على ربط الطلاب وأعضاء هيئة التدريس والمكتبات والأقسام بالمصادر الأكاديمية التي يحتاجون إليها.",
//     },
//     features: [
//       {
//         en: "Academic resource distribution",
//         ar: "توزيع المصادر الأكاديمية",
//       },
//       {
//         en: "Institutional procurement support",
//         ar: "دعم المشتريات المؤسسية",
//       },
//       {
//         en: "Customized academic programs",
//         ar: "برامج أكاديمية مخصصة",
//       },
//     ],
//   },

//   {
//     slug: "digital-content",
//     icon: "layers",
//     title: {
//       en: "Digital Content",
//       ar: "المحتوى الرقمي",
//     },
//     shortDescription: {
//       en: "Connect learners and institutions with trusted digital academic resources.",
//       ar: "ربط المتعلمين والمؤسسات بالمصادر الأكاديمية الرقمية الموثوقة.",
//     },
//     description: {
//       en: "Digital academic resources provide flexible access to books, reference materials, research content, and learning resources across devices.",
//       ar: "توفر المصادر الأكاديمية الرقمية وصولاً مرناً إلى الكتب والمراجع والمحتوى البحثي والموارد التعليمية عبر مختلف الأجهزة.",
//     },
//     features: [
//       {
//         en: "Electronic books and resources",
//         ar: "الكتب والمصادر الإلكترونية",
//       },
//       {
//         en: "Research and reference content",
//         ar: "المحتوى البحثي والمرجعي",
//       },
//       {
//         en: "Multi-device accessibility",
//         ar: "الوصول عبر مختلف الأجهزة",
//       },
//     ],
//   },

//   {
//     slug: "academic-distribution",
//     icon: "globe",
//     title: {
//       en: "Academic Distribution",
//       ar: "التوزيع الأكاديمي",
//     },
//     shortDescription: {
//       en: "Connect international and regional publishers with academic communities.",
//       ar: "ربط الناشرين الدوليين والإقليميين بالمجتمعات الأكاديمية.",
//     },
//     description: {
//       en: "Our distribution network helps make academic publications available to universities, libraries, researchers, students, and professional communities.",
//       ar: "تساعد شبكة التوزيع لدينا في توفير المنشورات الأكاديمية للجامعات والمكتبات والباحثين والطلاب والمجتمعات المهنية.",
//     },
//     features: [
//       {
//         en: "Publisher relationships",
//         ar: "علاقات الناشرين",
//       },
//       {
//         en: "Academic book distribution",
//         ar: "توزيع الكتب الأكاديمية",
//       },
//       {
//         en: "Institutional fulfillment",
//         ar: "تلبية احتياجات المؤسسات",
//       },
//     ],
//   },

//   {
//     slug: "learning-resources",
//     icon: "graduation-cap",
//     title: {
//       en: "Learning Resources",
//       ar: "مصادر التعلم",
//     },
//     shortDescription: {
//       en: "Help educational institutions provide students with the right learning materials.",
//       ar: "مساعدة المؤسسات التعليمية على توفير مواد التعلم المناسبة للطلاب.",
//     },
//     description: {
//       en: "From textbooks and reference materials to digital resources, we support institutions in creating reliable learning-resource ecosystems.",
//       ar: "من الكتب الدراسية والمراجع إلى المصادر الرقمية، ندعم المؤسسات في بناء منظومات موثوقة لمصادر التعلم.",
//     },
//     features: [
//       {
//         en: "Textbooks and course materials",
//         ar: "الكتب الدراسية ومواد المقررات",
//       },
//       {
//         en: "Reference resources",
//         ar: "المراجع والمصادر",
//       },
//       {
//         en: "Digital learning resources",
//         ar: "مصادر التعلم الرقمية",
//       },
//     ],
//   },

//   {
//     slug: "knowledge-solutions",
//     icon: "lightbulb",
//     title: {
//       en: "Knowledge Solutions",
//       ar: "حلول المعرفة",
//     },
//     shortDescription: {
//       en: "Build better connections between content, institutions, and knowledge communities.",
//       ar: "بناء روابط أفضل بين المحتوى والمؤسسات ومجتمعات المعرفة.",
//     },
//     description: {
//       en: "Knowledge solutions bring together trusted content, technology, distribution, and institutional requirements to create more connected academic ecosystems.",
//       ar: "تجمع حلول المعرفة بين المحتوى الموثوق والتكنولوجيا والتوزيع واحتياجات المؤسسات لإنشاء منظومات أكاديمية أكثر ترابطاً.",
//     },
//     features: [
//       {
//         en: "Knowledge access",
//         ar: "الوصول إلى المعرفة",
//       },
//       {
//         en: "Content discovery",
//         ar: "اكتشاف المحتوى",
//       },
//       {
//         en: "Institutional knowledge support",
//         ar: "دعم المعرفة المؤسسية",
//       },
//     ],
//   },
// ];

// export function getDigitalSolutionBySlug(slug: string) {
//   return digitalSolutions.find(
//     (solution) => solution.slug === slug,
//   );
// }
export type Locale = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type DigitalSolution = {
  slug: string;
  icon: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
};

export const digitalSolutions: DigitalSolution[] = [
  {
    slug: "digital-publishing",

    icon: "book-open",

    title: {
      en: "Digital Publishing",
      ar: "النشر الرقمي",
    },

    shortDescription: {
      en: "Bringing academic and professional content to modern digital formats.",
      ar: "تقديم المحتوى الأكاديمي والمهني بصيغ رقمية حديثة.",
    },

    description: {
      en: "Digital publishing provides new ways for academic and professional content to reach students, researchers, educators, and institutions through modern digital channels.",
      ar: "يوفر النشر الرقمي طرقاً جديدة للوصول إلى المحتوى الأكاديمي والمهني للطلاب والباحثين والمعلمين والمؤسسات من خلال القنوات الرقمية الحديثة.",
    },

    features: [
      {
        en: "Digital publication preparation",
        ar: "إعداد المنشورات الرقمية",
      },
      {
        en: "Electronic content distribution",
        ar: "توزيع المحتوى الإلكتروني",
      },
      {
        en: "Accessible academic resources",
        ar: "مصادر أكاديمية سهلة الوصول",
      },
      {
        en: "Digital-first content experiences",
        ar: "تجارب محتوى رقمية متقدمة",
      },
    ],
  },

  {
    slug: "institutional-solutions",

    icon: "building",

    title: {
      en: "Institutional Solutions",
      ar: "الحلول المؤسسية",
    },

    shortDescription: {
      en: "Supporting universities and academic institutions with tailored resource solutions.",
      ar: "دعم الجامعات والمؤسسات الأكاديمية بحلول مخصصة للمصادر التعليمية.",
    },

    description: {
      en: "We support universities and academic institutions with solutions that connect students, faculty, libraries, and departments with the academic resources they need.",
      ar: "ندعم الجامعات والمؤسسات الأكاديمية بحلول تربط الطلاب وأعضاء هيئة التدريس والمكتبات والأقسام بالمصادر الأكاديمية التي يحتاجون إليها.",
    },

    features: [
      {
        en: "Institutional procurement support",
        ar: "دعم المشتريات المؤسسية",
      },
      {
        en: "Academic resource distribution",
        ar: "توزيع المصادر الأكاديمية",
      },
      {
        en: "Course and learning resource support",
        ar: "دعم المقررات ومصادر التعلم",
      },
      {
        en: "Customized institutional programs",
        ar: "برامج مؤسسية مخصصة",
      },
    ],
  },

  {
    slug: "digital-content",

    icon: "layers",

    title: {
      en: "Digital Content",
      ar: "المحتوى الرقمي",
    },

    shortDescription: {
      en: "Connecting learners and institutions with trusted digital academic resources.",
      ar: "ربط المتعلمين والمؤسسات بالمصادر الأكاديمية الرقمية الموثوقة.",
    },

    description: {
      en: "We help make trusted academic content available through digital formats, supporting flexible access to books, reference materials, research content, and learning resources.",
      ar: "نساعد في توفير المحتوى الأكاديمي الموثوق من خلال الصيغ الرقمية، بما يدعم الوصول المرن إلى الكتب والمراجع والمحتوى البحثي ومصادر التعلم.",
    },

    features: [
      {
        en: "Electronic books and publications",
        ar: "الكتب والمنشورات الإلكترونية",
      },
      {
        en: "Research and reference resources",
        ar: "المصادر البحثية والمرجعية",
      },
      {
        en: "Digital academic collections",
        ar: "المجموعات الأكاديمية الرقمية",
      },
      {
        en: "Multi-device access",
        ar: "الوصول عبر مختلف الأجهزة",
      },
    ],
  },

  {
    slug: "academic-distribution",

    icon: "globe",

    title: {
      en: "Academic Distribution",
      ar: "التوزيع الأكاديمي",
    },

    shortDescription: {
      en: "Connecting international and regional publishers with academic communities.",
      ar: "ربط الناشرين الدوليين والإقليميين بالمجتمعات الأكاديمية.",
    },

    description: {
      en: "Our academic distribution services help connect publishers and their content with universities, libraries, researchers, students, and professional communities across the region.",
      ar: "تساعد خدمات التوزيع الأكاديمي لدينا في ربط الناشرين ومحتواهم بالجامعات والمكتبات والباحثين والطلاب والمجتمعات المهنية في المنطقة.",
    },

    features: [
      {
        en: "Publisher relationships",
        ar: "علاقات الناشرين",
      },
      {
        en: "Academic book distribution",
        ar: "توزيع الكتب الأكاديمية",
      },
      {
        en: "Institutional fulfillment",
        ar: "تلبية احتياجات المؤسسات",
      },
      {
        en: "Regional academic reach",
        ar: "الوصول الأكاديمي الإقليمي",
      },
    ],
  },

  {
    slug: "learning-resources",

    icon: "graduation-cap",

    title: {
      en: "Learning Resources",
      ar: "مصادر التعلم",
    },

    shortDescription: {
      en: "Helping educational institutions provide students with the right learning materials.",
      ar: "مساعدة المؤسسات التعليمية على توفير مواد التعلم المناسبة للطلاب.",
    },

    description: {
      en: "From textbooks and reference materials to digital resources, we help institutions provide students and educators with reliable learning materials that support their academic journey.",
      ar: "من الكتب الدراسية والمراجع إلى المصادر الرقمية، نساعد المؤسسات على توفير مواد تعلم موثوقة للطلاب والمعلمين لدعم رحلتهم الأكاديمية.",
    },

    features: [
      {
        en: "Textbooks and course materials",
        ar: "الكتب الدراسية ومواد المقررات",
      },
      {
        en: "Academic reference materials",
        ar: "المراجع الأكاديمية",
      },
      {
        en: "Digital learning resources",
        ar: "مصادر التعلم الرقمية",
      },
      {
        en: "Institutional resource planning",
        ar: "تخطيط مصادر المؤسسات",
      },
    ],
  },

  {
    slug: "knowledge-solutions",

    icon: "lightbulb",

    title: {
      en: "Knowledge Solutions",
      ar: "حلول المعرفة",
    },

    shortDescription: {
      en: "Building stronger connections between content, institutions, technology, and knowledge communities.",
      ar: "بناء روابط أقوى بين المحتوى والمؤسسات والتكنولوجيا ومجتمعات المعرفة.",
    },

    description: {
      en: "Knowledge solutions bring together trusted academic content, technology, distribution, and institutional requirements to create more connected knowledge ecosystems.",
      ar: "تجمع حلول المعرفة بين المحتوى الأكاديمي الموثوق والتكنولوجيا والتوزيع واحتياجات المؤسسات لإنشاء منظومات معرفية أكثر ترابطاً.",
    },

    features: [
      {
        en: "Knowledge access",
        ar: "الوصول إلى المعرفة",
      },
      {
        en: "Content discovery",
        ar: "اكتشاف المحتوى",
      },
      {
        en: "Academic resource connectivity",
        ar: "ربط المصادر الأكاديمية",
      },
      {
        en: "Institutional knowledge support",
        ar: "دعم المعرفة المؤسسية",
      },
    ],
  },
];

export function getDigitalSolutionBySlug(slug: string) {
  return digitalSolutions.find(
    (solution) => solution.slug === slug
  );
}
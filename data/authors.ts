
// export type AuthorProfile = {
//   name: string;
//   role: string;
//   roleAr: string;
//   bio: string;
//   bioAr: string;
//   expertise: string[];
//   expertiseAr: string[];
//   imageUrl?: string;
//   imageAlt: string;
//   imageCredit?: string;
//   imageLicense?: string;
//   website?: string;
//   bookSlugs: string[];
// };

// export const authorProfiles: Record<string, AuthorProfile> = {
//   "thomas-h-cormen": {
//     name: "Thomas H. Cormen",
//     role: "Computer Scientist and Author",
//     roleAr: "عالم حاسوب ومؤلف",
//     bio: "A computer scientist known for co-authoring Introduction to Algorithms, a comprehensive textbook covering algorithm design, analysis, and implementation.",
//     bioAr: "عالم حاسوب شارك في تأليف كتاب Introduction to Algorithms، وهو مرجع شامل لتصميم الخوارزميات وتحليلها وتنفيذها.",
//     expertise: ["Algorithms", "Computer Science", "Programming"],
//     expertiseAr: ["الخوارزميات", "علوم الحاسوب", "البرمجة"],
//     imageAlt: "Thomas H. Cormen",
//     website: "https://www.cs.dartmouth.edu/~thc/",
//     bookSlugs: ["introduction-to-algorithms"],
//   },

//   "charles-e-leiserson": {
//     name: "Charles E. Leiserson",
//     role: "Professor of Computer Science and Engineering",
//     roleAr: "أستاذ علوم الحاسوب والهندسة",
//     bio: "An MIT professor whose research focuses on algorithms, parallel computing, and performance engineering. He co-authored Introduction to Algorithms.",
//     bioAr: "أستاذ في معهد ماساتشوستس للتكنولوجيا، تركز أبحاثه على الخوارزميات والحوسبة المتوازية وتحسين أداء الأنظمة. شارك في تأليف كتاب Introduction to Algorithms.",
//     expertise: [
//       "Algorithms",
//       "Parallel Computing",
//       "Performance Engineering",
//     ],
//     expertiseAr: [
//       "الخوارزميات",
//       "الحوسبة المتوازية",
//       "تحسين الأداء",
//     ],
//     imageAlt: "Charles E. Leiserson",
//     website: "https://people.csail.mit.edu/cel/",
//     bookSlugs: ["introduction-to-algorithms"],
//   },

//   "ronald-l-rivest": {
//     name: "Ronald L. Rivest",
//     role: "Computer Scientist and Cryptography Researcher",
//     roleAr: "عالم حاسوب وباحث في التشفير",
//     bio: "An MIT Institute Professor known for contributions to algorithms and cryptography, including co-inventing the RSA public-key cryptosystem. He co-authored Introduction to Algorithms.",
//     bioAr: "أستاذ في معهد ماساتشوستس للتكنولوجيا، معروف بإسهاماته في الخوارزميات والتشفير، ومنها المشاركة في ابتكار نظام التشفير RSA. شارك في تأليف كتاب Introduction to Algorithms.",
//     expertise: [
//       "Algorithms",
//       "Cryptography",
//       "Computer Security",
//     ],
//     expertiseAr: [
//       "الخوارزميات",
//       "التشفير",
//       "أمن الحاسوب",
//     ],
//     imageAlt: "Ronald L. Rivest",
//     website: "https://people.csail.mit.edu/rivest/",
//     bookSlugs: ["introduction-to-algorithms"],
//   },

//   "clifford-stein": {
//     name: "Clifford Stein",
//     role: "Computer Scientist and Professor",
//     roleAr: "عالم حاسوب وأستاذ جامعي",
//     bio: "A computer scientist whose academic interests include algorithms and optimization. He co-authored Introduction to Algorithms.",
//     bioAr: "عالم حاسوب تشمل اهتماماته الأكاديمية الخوارزميات والتحسين الرياضي. شارك في تأليف كتاب Introduction to Algorithms.",
//     expertise: [
//       "Algorithms",
//       "Optimization",
//       "Computer Science",
//     ],
//     expertiseAr: [
//       "الخوارزميات",
//       "التحسين الرياضي",
//       "علوم الحاسوب",
//     ],
//     imageAlt: "Clifford Stein",
//     website: "https://www.ieor.columbia.edu/",
//     bookSlugs: ["introduction-to-algorithms"],
//   },

//   "robert-c-martin": {
//     name: "Robert C. Martin",
//     role: "Software Engineer and Author",
//     roleAr: "مهندس برمجيات ومؤلف",
//     bio: "Known for writing about clean code, software craftsmanship, object-oriented design, and maintainable software development.",
//     bioAr: "معروف بكتاباته حول الكود النظيف وحرفية تطوير البرمجيات والتصميم كائني التوجه وبناء البرمجيات القابلة للصيانة.",
//     expertise: [
//       "Software Engineering",
//       "Clean Code",
//       "Object-Oriented Design",
//       "Agile Development",
//     ],
//     expertiseAr: [
//       "هندسة البرمجيات",
//       "الكود النظيف",
//       "التصميم كائني التوجه",
//       "التطوير الرشيق",
//     ],
//     imageUrl:
//       "https://commons.wikimedia.org/wiki/Special:FilePath/Robert%20C.%20Martin%20surrounded%20by%20computers%20(cropped).jpg",
//     imageAlt: "Robert C. Martin",
//     imageCredit: "Wikimedia Commons",
//     imageLicense: "Verify attribution and license on the source file page",
//     bookSlugs: ["clean-code"],
//   },

//   "martin-kleppmann": {
//     name: "Martin Kleppmann",
//     role: "Computer Scientist and Author",
//     roleAr: "عالم حاسوب ومؤلف",
//     bio: "A computer scientist and researcher whose work focuses on distributed systems, data-intensive applications, and collaborative software. He wrote Designing Data-Intensive Applications.",
//     bioAr: "عالم حاسوب وباحث تركز أعماله على الأنظمة الموزعة والتطبيقات كثيفة البيانات والبرمجيات التعاونية. ألّف كتاب Designing Data-Intensive Applications.",
//     expertise: [
//       "Distributed Systems",
//       "Databases",
//       "Data Engineering",
//       "Collaborative Software",
//     ],
//     expertiseAr: [
//       "الأنظمة الموزعة",
//       "قواعد البيانات",
//       "هندسة البيانات",
//       "البرمجيات التعاونية",
//     ],
//     imageAlt: "Martin Kleppmann",
//     website: "https://martin.kleppmann.com/",
//     bookSlugs: ["designing-data-intensive-applications"],
//   },

//   "david-thomas": {
//     name: "David Thomas",
//     role: "Software Developer and Author",
//     roleAr: "مطور برمجيات ومؤلف",
//     bio: "A software developer and author who co-wrote The Pragmatic Programmer, a practical guide to improving programming skills and professional software development.",
//     bioAr: "مطور برمجيات ومؤلف شارك في كتابة The Pragmatic Programmer، وهو دليل عملي لتطوير مهارات البرمجة والممارسة المهنية لتطوير البرمجيات.",
//     expertise: [
//       "Programming",
//       "Software Craftsmanship",
//       "Developer Productivity",
//     ],
//     expertiseAr: [
//       "البرمجة",
//       "حرفية تطوير البرمجيات",
//       "إنتاجية المطورين",
//     ],
//     imageAlt: "David Thomas",
//     bookSlugs: ["the-pragmatic-programmer"],
//   },

//   "andrew-hunt": {
//     name: "Andrew Hunt",
//     role: "Software Developer and Author",
//     roleAr: "مطور برمجيات ومؤلف",
//     bio: "A software developer and author who co-wrote The Pragmatic Programmer, emphasizing practical techniques, adaptability, and continuous learning.",
//     bioAr: "مطور برمجيات ومؤلف شارك في كتابة The Pragmatic Programmer، الذي يركز على التقنيات العملية والمرونة والتعلم المستمر.",
//     expertise: [
//       "Programming",
//       "Software Development",
//       "Professional Practice",
//     ],
//     expertiseAr: [
//       "البرمجة",
//       "تطوير البرمجيات",
//       "الممارسة المهنية",
//     ],
//     imageAlt: "Andrew Hunt",
//     bookSlugs: ["the-pragmatic-programmer"],
//   },

//   "andrew-s-tanenbaum": {
//     name: "Andrew S. Tanenbaum",
//     role: "Computer Scientist and Educator",
//     roleAr: "عالم حاسوب وأكاديمي",
//     bio: "A computer scientist and educator known for textbooks on computer networks, operating systems, and distributed systems.",
//     bioAr: "عالم حاسوب وأكاديمي معروف بكتبه التعليمية حول شبكات الحاسوب وأنظمة التشغيل والأنظمة الموزعة.",
//     expertise: [
//       "Computer Networks",
//       "Operating Systems",
//       "Distributed Systems",
//     ],
//     expertiseAr: [
//       "شبكات الحاسوب",
//       "أنظمة التشغيل",
//       "الأنظمة الموزعة",
//     ],
//     imageUrl:
//       "https://commons.wikimedia.org/wiki/Special:FilePath/AndrewTanenbaum2.png",
//     imageAlt: "Andrew S. Tanenbaum",
//     imageCredit: "Wikimedia Commons",
//     imageLicense: "CC BY 2.5; retain attribution and license information",
//     bookSlugs: ["computer-networks"],
//   },

//   "david-j-wetherall": {
//     name: "David J. Wetherall",
//     role: "Computer Scientist and Researcher",
//     roleAr: "عالم حاسوب وباحث",
//     bio: "A computer scientist known for research and teaching in computer networking and networked systems. He co-authored Computer Networks.",
//     bioAr: "عالم حاسوب معروف بأبحاثه وتعليمه في مجال شبكات الحاسوب والأنظمة المتصلة بالشبكات. شارك في تأليف كتاب Computer Networks.",
//     expertise: [
//       "Computer Networks",
//       "Network Protocols",
//       "Internet Systems",
//     ],
//     expertiseAr: [
//       "شبكات الحاسوب",
//       "بروتوكولات الشبكات",
//       "أنظمة الإنترنت",
//     ],
//     imageAlt: "David J. Wetherall",
//     bookSlugs: ["computer-networks"],
//   },
// };



export type AuthorProfile = {
  name: string;
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
  expertise: string[];
  expertiseAr: string[];
  imageUrl?: string;
  imageAlt: string;
  imageCredit?: string;
  imageLicense?: string;
  website?: string;
  bookSlugs: string[];
};

export const authorProfiles: Record<string, AuthorProfile> = {
  "thomas-h-cormen": {
    name: "Thomas H. Cormen",
    role: "Computer Scientist and Author",
    roleAr: "عالم حاسوب ومؤلف",
    bio: "A computer scientist known for co-authoring Introduction to Algorithms, a comprehensive textbook covering algorithm design, analysis, and implementation.",
    bioAr: "عالم حاسوب شارك في تأليف كتاب Introduction to Algorithms، وهو مرجع شامل لتصميم الخوارزميات وتحليلها وتنفيذها.",
    expertise: ["Algorithms", "Computer Science", "Programming"],
    expertiseAr: ["الخوارزميات", "علوم الحاسوب", "البرمجة"],
    imageAlt: "Thomas H. Cormen",
    website: "https://www.cs.dartmouth.edu/~thc/",
    bookSlugs: ["introduction-to-algorithms"],
  },

  "charles-e-leiserson": {
    name: "Charles E. Leiserson",
    role: "Professor of Computer Science and Engineering",
    roleAr: "أستاذ علوم الحاسوب والهندسة",
    bio: "An MIT professor whose research focuses on algorithms, parallel computing, and performance engineering. He co-authored Introduction to Algorithms.",
    bioAr: "أستاذ في معهد ماساتشوستس للتكنولوجيا، تركز أبحاثه على الخوارزميات والحوسبة المتوازية وتحسين أداء الأنظمة. شارك في تأليف كتاب Introduction to Algorithms.",
    expertise: [
      "Algorithms",
      "Parallel Computing",
      "Performance Engineering",
    ],
    expertiseAr: [
      "الخوارزميات",
      "الحوسبة المتوازية",
      "تحسين الأداء",
    ],
    imageAlt: "Charles E. Leiserson",
    website: "https://people.csail.mit.edu/cel/",
    bookSlugs: ["introduction-to-algorithms"],
  },

  "ronald-l-rivest": {
    name: "Ronald L. Rivest",
    role: "Computer Scientist and Cryptography Researcher",
    roleAr: "عالم حاسوب وباحث في التشفير",
    bio: "An MIT Institute Professor known for contributions to algorithms and cryptography, including co-inventing the RSA public-key cryptosystem. He co-authored Introduction to Algorithms.",
    bioAr: "أستاذ في معهد ماساتشوستس للتكنولوجيا، معروف بإسهاماته في الخوارزميات والتشفير، ومنها المشاركة في ابتكار نظام التشفير RSA. شارك في تأليف كتاب Introduction to Algorithms.",
    expertise: [
      "Algorithms",
      "Cryptography",
      "Computer Security",
    ],
    expertiseAr: [
      "الخوارزميات",
      "التشفير",
      "أمن الحاسوب",
    ],
    imageAlt: "Ronald L. Rivest",
    website: "https://people.csail.mit.edu/rivest/",
    bookSlugs: ["introduction-to-algorithms"],
  },

  "clifford-stein": {
    name: "Clifford Stein",
    role: "Computer Scientist and Professor",
    roleAr: "عالم حاسوب وأستاذ جامعي",
    bio: "A computer scientist whose academic interests include algorithms and optimization. He co-authored Introduction to Algorithms.",
    bioAr: "عالم حاسوب تشمل اهتماماته الأكاديمية الخوارزميات والتحسين الرياضي. شارك في تأليف كتاب Introduction to Algorithms.",
    expertise: [
      "Algorithms",
      "Optimization",
      "Computer Science",
    ],
    expertiseAr: [
      "الخوارزميات",
      "التحسين الرياضي",
      "علوم الحاسوب",
    ],
    imageAlt: "Clifford Stein",
    website: "https://www.ieor.columbia.edu/",
    bookSlugs: ["introduction-to-algorithms"],
  },

  "robert-c-martin": {
    name: "Robert C. Martin",
    role: "Software Engineer and Author",
    roleAr: "مهندس برمجيات ومؤلف",
    bio: "Known for writing about clean code, software craftsmanship, object-oriented design, and maintainable software development.",
    bioAr: "معروف بكتاباته حول الكود النظيف وحرفية تطوير البرمجيات والتصميم كائني التوجه وبناء البرمجيات القابلة للصيانة.",
    expertise: [
      "Software Engineering",
      "Clean Code",
      "Object-Oriented Design",
      "Agile Development",
    ],
    expertiseAr: [
      "هندسة البرمجيات",
      "الكود النظيف",
      "التصميم كائني التوجه",
      "التطوير الرشيق",
    ],
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Robert%20C.%20Martin%20surrounded%20by%20computers%20(cropped).jpg",
    imageAlt: "Robert C. Martin",
    imageCredit: "Wikimedia Commons",
    imageLicense: "Verify attribution and license on the source file page",
    bookSlugs: ["clean-code"],
  },

  "martin-kleppmann": {
    name: "Martin Kleppmann",
    role: "Computer Scientist and Author",
    roleAr: "عالم حاسوب ومؤلف",
    bio: "A computer scientist and researcher whose work focuses on distributed systems, data-intensive applications, and collaborative software. He wrote Designing Data-Intensive Applications.",
    bioAr: "عالم حاسوب وباحث تركز أعماله على الأنظمة الموزعة والتطبيقات كثيفة البيانات والبرمجيات التعاونية. ألّف كتاب Designing Data-Intensive Applications.",
    expertise: [
      "Distributed Systems",
      "Databases",
      "Data Engineering",
      "Collaborative Software",
    ],
    expertiseAr: [
      "الأنظمة الموزعة",
      "قواعد البيانات",
      "هندسة البيانات",
      "البرمجيات التعاونية",
    ],
    imageAlt: "Martin Kleppmann",
    website: "https://martin.kleppmann.com/",
    bookSlugs: ["designing-data-intensive-applications"],
  },

  "david-thomas": {
    name: "David Thomas",
    role: "Software Developer and Author",
    roleAr: "مطور برمجيات ومؤلف",
    bio: "A software developer and author who co-wrote The Pragmatic Programmer, a practical guide to improving programming skills and professional software development.",
    bioAr: "مطور برمجيات ومؤلف شارك في كتابة The Pragmatic Programmer، وهو دليل عملي لتطوير مهارات البرمجة والممارسة المهنية لتطوير البرمجيات.",
    expertise: [
      "Programming",
      "Software Craftsmanship",
      "Developer Productivity",
    ],
    expertiseAr: [
      "البرمجة",
      "حرفية تطوير البرمجيات",
      "إنتاجية المطورين",
    ],
    imageAlt: "David Thomas",
    bookSlugs: ["the-pragmatic-programmer"],
  },

  "andrew-hunt": {
    name: "Andrew Hunt",
    role: "Software Developer and Author",
    roleAr: "مطور برمجيات ومؤلف",
    bio: "A software developer and author who co-wrote The Pragmatic Programmer, emphasizing practical techniques, adaptability, and continuous learning.",
    bioAr: "مطور برمجيات ومؤلف شارك في كتابة The Pragmatic Programmer، الذي يركز على التقنيات العملية والمرونة والتعلم المستمر.",
    expertise: [
      "Programming",
      "Software Development",
      "Professional Practice",
    ],
    expertiseAr: [
      "البرمجة",
      "تطوير البرمجيات",
      "الممارسة المهنية",
    ],
    imageAlt: "Andrew Hunt",
    bookSlugs: ["the-pragmatic-programmer"],
  },

  "andrew-s-tanenbaum": {
    name: "Andrew S. Tanenbaum",
    role: "Computer Scientist and Educator",
    roleAr: "عالم حاسوب وأكاديمي",
    bio: "A computer scientist and educator known for textbooks on computer networks, operating systems, and distributed systems.",
    bioAr: "عالم حاسوب وأكاديمي معروف بكتبه التعليمية حول شبكات الحاسوب وأنظمة التشغيل والأنظمة الموزعة.",
    expertise: [
      "Computer Networks",
      "Operating Systems",
      "Distributed Systems",
    ],
    expertiseAr: [
      "شبكات الحاسوب",
      "أنظمة التشغيل",
      "الأنظمة الموزعة",
    ],
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/AndrewTanenbaum2.png",
    imageAlt: "Andrew S. Tanenbaum",
    imageCredit: "Wikimedia Commons",
    imageLicense: "CC BY 2.5; retain attribution and license information",
    bookSlugs: ["computer-networks"],
  },

  "david-j-wetherall": {
    name: "David J. Wetherall",
    role: "Computer Scientist and Researcher",
    roleAr: "عالم حاسوب وباحث",
    bio: "A computer scientist known for research and teaching in computer networking and networked systems. He co-authored Computer Networks.",
    bioAr: "عالم حاسوب معروف بأبحاثه وتعليمه في مجال شبكات الحاسوب والأنظمة المتصلة بالشبكات. شارك في تأليف كتاب Computer Networks.",
    expertise: [
      "Computer Networks",
      "Network Protocols",
      "Internet Systems",
    ],
    expertiseAr: [
      "شبكات الحاسوب",
      "بروتوكولات الشبكات",
      "أنظمة الإنترنت",
    ],
    imageAlt: "David J. Wetherall",
    bookSlugs: ["computer-networks"],
  },
};

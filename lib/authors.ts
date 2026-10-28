export type Author = {
  slug: string;
  name: string;
  bio?: string;
  image?: string;
};

export const authors: Author[] = [
  {
    slug: "robert-c-martin",
    name: "Robert C. Martin",
    bio: "Author known for books on software craftsmanship and software design.",
  },
];

export function getAuthorBySlug(slug: string) {
  return authors.find((author) => author.slug === slug);
}
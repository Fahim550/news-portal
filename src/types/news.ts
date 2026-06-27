export type Author = {
  name: string;
  slug: string;
  avatar: string;
};

export type Category = {
  name: string;
  slug: string;
  color?: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string;
  category: Category;
  author: Author;
  publishedAt: string; // ISO date string
  readingTime: number; // in minutes
  isBreaking?: boolean;
  isFeatured?: boolean;
  views?: number;
};

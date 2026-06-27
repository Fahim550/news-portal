export const CATEGORIES = [
  {
    name: "Politics",
    slug: "politics",
    description: "Latest political news and analysis from around the world.",
  },
  {
    name: "Business",
    slug: "business",
    subcategories: [
      { name: "Economy", slug: "economy" },
      { name: "Stock Market", slug: "stock-market" },
      { name: "Startups", slug: "startups" },
    ],
  },
  {
    name: "Technology",
    slug: "technology",
    description: "Gadgets, software, AI, and the future of tech.",
  },
  {
    name: "Sports",
    slug: "sports",
    subcategories: [
      { name: "Cricket", slug: "cricket" },
      { name: "Football", slug: "football" },
      { name: "Tennis", slug: "tennis" },
    ],
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    description: "Movies, music, celebrity news, and pop culture.",
  },
];

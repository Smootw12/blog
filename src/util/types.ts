import type { Image, Slug } from "sanity";

export interface Post {
  title: string;
  slug: Slug;
  description: string;
  author: Author;
  mainImage: Image;
  categories: Category[];
  publishedAt: any;
  body: any;
}

export interface Author {
  name: string;
  slug: Slug;
  image: Image;
  bio: string;
}

export interface Category {
  name: string;
  description: string;
}

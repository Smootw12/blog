import type { Image, Slug } from "sanity";

export interface Post {
  _id: string;
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

export type Category = {
  name: string;
  description: string;
};

export interface Comment {
  rating: 1 | 2 | 3 | 4 | 5;
  name: string;
  email: string;
  body: string;
}

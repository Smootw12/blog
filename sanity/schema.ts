import { type SchemaTypeDefinition } from "sanity";
import post from "./post";
import author from "./author";
import category from "./category";
import blockContent from "./blockContent";
import comment from "./comment";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, comment],
};

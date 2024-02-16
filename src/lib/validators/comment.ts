import { z } from "zod";

export const CommentValidator = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(21, {
      message: "Name must be less than 128 characters long",
    }),
  email: z.string().email(),
  comment: z
    .string()
    .min(3, {
      message: "The comment must be at least 3 characters long",
    })
    .max(500, {
      message: "The comment must be less than 500 characters long",
    }),
  rating: z
    .number()
    .gte(1, { message: "Invalid rating" })
    .lte(5, { message: "Invalid rating" }),
  postId: z.string(),
});

export const CommentFormValidator = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(21, {
      message: "Name must be less than 128 characters long",
    }),
  email: z.string().email(),
  comment: z
    .string()
    .min(3, {
      message: "The comment must be at least 3 characters long",
    })
    .max(500, {
      message: "The comment must be less than 500 characters long",
    }),
});

export type CommentPayload = z.infer<typeof CommentValidator>;

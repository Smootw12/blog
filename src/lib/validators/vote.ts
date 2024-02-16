import { z } from "zod";

export const VoteValidator = z.object({
  postId: z.string(),
});

export type VotePayload = z.infer<typeof VoteValidator>;

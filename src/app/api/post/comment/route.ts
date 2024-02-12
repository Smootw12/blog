import { CommentValidator } from "@/lib/validators/comment";
import { client } from "../../../../../sanity/lib/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { comment, email, name, postId, rating } =
      CommentValidator.parse(body);

    await client.create({
      _type: "comment",
      comment,
      email,
      name,
      rating,
      post: {
        _type: "post",
        _ref: postId,
      },
    });

    return new Response("Ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not create comment. Please try again later", {
      status: 500,
    });
  }
}

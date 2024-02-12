import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { VoteValidator } from "@/lib/validators/vote";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { postId } = VoteValidator.parse(body);

    const voteExists = await db.vote.findFirst({
      where: {
        postId,
        userId: session.user.id,
      },
    });

    if (voteExists) {
      await db.vote.delete({
        where: {
          id: voteExists.id,
        },
      });
    } else {
      await db.vote.create({
        data: {
          postId,
          userId: session.user.id,
        },
      });
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Bad Request", { status: 400 });
    }

    return new Response("Colud not vote, please try again", { status: 500 });
  }
}

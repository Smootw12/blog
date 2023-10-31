import type { NextRequest } from "next/server";
import { Comment } from "@/util/types";

import { createClient } from "next-sanity";

const client = createClient({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-12",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
});

interface request extends Comment {
  _id: string;
}

export async function POST(req: NextRequest) {
  const { _id, body, email, name, rating } = (await req.json()) as request;
  try {
    await client.create({
      _type: "comment",
      body,
      email,
      name,
      rating,
      post: {
        _type: "post",
        _ref: _id,
      },
    });
  } catch (error: any) {
    return Response.json({
      body: {
        error: error.message,
        status: 500,
      },
    });
  }
  return Response.json({
    _type: "comment",
    body,
    email,
    name,
    rating,
    post: {
      _type: "post",
      _ref: _id,
    },
  });
}

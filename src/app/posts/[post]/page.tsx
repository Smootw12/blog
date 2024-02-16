import moment from "moment";
import Image from "next/image";
import { client } from "../../../../sanity/lib/client";
import { urlForImage } from "../../../../sanity/lib/image";
import { Post, Comment } from "@/types/types";
import PortableText from "react-portable-text";
import type { Image as sanityImage } from "sanity";
import Comments from "@/components/Comments/Comments";
import { getAuthSession } from "@/lib/auth";
import LikeDislikeToggle from "@/components/LikeDislikeToggle";
import { db } from "@/lib/db";
import { Vote } from "@prisma/client";

type Props = {
  params: { post: string };
};

interface PostQuery extends Post {
  comments: Comment[];
}

export const revalidate = 60;

async function page({ params }: Props) {
  const session = await getAuthSession();

  const query = `*[_type == "post" && slug.current == "${params.post}"]{
    _id,
    title,
    author-> {
      name,
    },
    publishedAt,
    description,
    mainImage,
    slug,
    body,
    categories[]-> {
      name,
    },
    'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
  }[0]`;

  const post = (await client.fetch(query)) as PostQuery;

  if (!post) {
    return (
      <div className="w-full max-w-2xl flex flex-col items-start">
        <div className="alert alert-error w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>404 | Post not found!</span>
        </div>
      </div>
    );
  }

  let userVote: Vote | null = null;

  let votesAmount = await db.vote.count({
    where: {
      postId: post._id,
    },
  });

  if (session) {
    userVote = await db.vote.findFirst({
      where: {
        postId: post._id,
        userId: session.user.id,
      },
    });
  }

  return (
    <>
      <div className="w-full max-w-[95%] md:max-w-2xl flex flex-col items-start space-y-3">
        <Image
          width="1920"
          height="1080"
          className="w-full theme-responsive-img mb-6"
          src={urlForImage(post.mainImage!).url()}
          alt="Main image"
        />
        <p className="text-base-content/60 text-xs italic">
          Published by {post.author.name}{" "}
          {moment(Date.parse(post.publishedAt)).fromNow()}
          {" | " + votesAmount + " likes"}
        </p>

        <div className="flex items-center space-x-3">
          <LikeDislikeToggle postId={post._id} alredyVoted={!!userVote} />
          {post.categories.map((category) => (
            <div
              key={category.name}
              className="badge badge-primary badge-outline"
            >
              {category.name}
            </div>
          ))}
        </div>
        <h1 className="text-4xl font-black">{post.title}</h1>
        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
          content={post.body}
          serializers={{
            normal: ({ children }: any) => (
              <p className="font-light leading-7 my-2">{children}</p>
            ),
            strong: ({ children }: any) => (
              <span className="font-semibold">{children}</span>
            ),
            h2: (props: any) => (
              <h1 className="text-2xl font-extrabold my-5" {...props} />
            ),
            li: ({ children }: any) => (
              <li className="ml-4 list-disc font-light leading-7 my-2">
                {children}
              </li>
            ),
            links: ({ href, children }: any) => (
              <a href={href} className="text-blue-500 hover:underline">
                {children}
              </a>
            ),
            blockquote: (props: any) => (
              <div className="my-5 border-l-[1px]">
                <p
                  className="text-small font-extralight py-2 px-4"
                  {...props}
                />
              </div>
            ),
            image: (image: sanityImage) => (
              <Image
                width="1920"
                height="1080"
                className="w-full theme-responsive-img my-8"
                src={urlForImage(image).url()}
                alt="Main image"
              />
            ),
          }}
        />
        <Comments
          postId={post._id}
          comments={post.comments}
          user={{
            name: session?.user.name || null,
            email: session?.user.email || null,
          }}
        />
      </div>
    </>
  );
}

export default page;

import moment from "moment";

import Image from "next/image";
import { client } from "../../../../sanity/lib/client";
import { urlForImage } from "../../../../sanity/lib/image";
import Menu from "@/components/Menu";
import { Post } from "@/util/types";
import PortableText from "react-portable-text";
import type { Image as sanityImage } from "sanity";


type Props = {
  params: { post: string };
};

async function getPost(slug: string) {
  try {
    const query = `*[_type == "post" && slug.current == "${slug}"][0] {
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
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.log(error);
  }
}

export const revalidate = 60;

async function page({ params }: Props) {
  const post = (await getPost(params.post)) as Post;

  if (!post) {
    return (
      <div className="w-full max-w-[95%] md:max-w-2xl flex flex-col items-start">
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
  return (
    <>
      <Menu />

      <div className="w-full max-w-[95%] md:max-w-2xl flex flex-col items-start space-y-3">
        <Image
          width="1920"
          height="1080"
          className="w-full rounded-2xl"
          src={urlForImage(post.mainImage!).url()}
          alt="Main image"
        />
        <p className="text-base-content/60 mb-2 text-xs">
          Published by {post.author.name}{" "}
          {moment(Date.parse(post.publishedAt)).fromNow()}
        </p>
        <div className="flex space-x-3">
          {post.categories.map((category) => (
            <div
              key={category.name}
              className="badge badge-primary badge-outline"
            >
              {category.name}
            </div>
          ))}
        </div>
        <h1 className="text-4xl font-extrabold">{post.title}</h1>
        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
          content={post.body}
          serializers={{
            h2: (props: any) => (
              <h1 className="text-xl font-extrabold my-5" {...props} />
            ),
            li: ({ children }: any) => (
              <li className="ml-4 list-disc">{children}</li>
            ),
            links: ({ href, children }: any) => (
              <a href={href} className="text-blue-500 hover:underline">
                {children}
              </a>
            ),
            blockquote: (props: any) => (
              <p className="text-small font-extralight my-5" {...props} />
            ),
            image: (image: sanityImage) => (
              <Image
                width="1920"
                height="1080"
                className="w-full rounded-2xl my-8"
                src={urlForImage(image).url()}
                alt="Main image"
              />
            ),
          }}
        />
      </div>
    </>
  );
}

export default page;

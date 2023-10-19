import { Post } from "@/util/types";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import Link from "next/link";

//todo: sanity post implementation

function PostItem({
  title,
  description,
  mainImage,
  slug,
}: Pick<Post, "title" | "slug" | "description" | "mainImage">) {
  return (
    <>
      <Link
        href={`/posts/${slug.current}`}
        className="card sm:card-side hover:bg-base-300 max-w-sm transition-colors sm:max-w-none"
      >
        <figure className="mx-auto w-full object-cover p-6 max-sm:pb-0 sm:max-w-[12rem] sm:pr-0">
          <Image
            width="1920"
            height="1080"
            loading="lazy"
            src={urlForImage(mainImage).url()}
            className="border-base-content bg-base-300 rounded-btn border border-opacity-5"
            alt="How to add a new color to daisyUI themes"
          />
        </figure>{" "}
        <div className="card-body">
          <h2 className="card-title">{title}</h2>{" "}
          <p className="text-xs opacity-60 max-w-xl">{description}</p>
        </div>{" "}
      </Link>
    </>
  );
}

export default PostItem;

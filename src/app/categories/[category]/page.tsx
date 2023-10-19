import { Category, Post } from "@/util/types";
import { client } from "../../../../sanity/lib/client";
import PostItem from "@/components/PostItem";
import Menu from "@/components/Menu";

type Props = {
  params: { category: string };
};

async function getPosts(category: string) {
  try {
    const categoryIdQuery = `*[_type == "category" && name == "${category}"] {
      _id,
    }`;

    const categoryId = await client.fetch(categoryIdQuery);

    if (!categoryId) {
      return [];
    }

    const postQuery = `*[_type == "post" && references("${categoryId[0]._id}")] {
      slug,
      description,
      title,
      mainImage,
    }`;

    return await client.fetch(postQuery);
  } catch (error: any) {
    console.log(error);
  }
}

async function page({ params }: Props) {
  const { category } = params;
  const posts = (await getPosts(category)) as Post[];

  return (
    <>
      <p className="mb-10 z-10 text-6xl font-bold mt-20">
        <span className="inline-grid">
          <span
            className="text-center pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text opacity-70 blur-3xl [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)]"
            aria-hidden="true"
          >
            Scopri i post
          </span>{" "}
          <span className="text-center [&amp;::selection]:text-base-content relative col-start-1 row-start-1 leading-tight motion-reduce:!opacity-100 [&amp;::selection]:bg-blue-700/20 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)]">
            Scopri i post
          </span>
        </span>
      </p>
      <Menu active={category} />
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem
            key={post.slug.current}
            slug={post.slug}
            description={post.description}
            title={post.title}
            mainImage={post.mainImage}
          />
        ))
      ) : (
        <div className="w-full max-w-2xl flex flex-col items-start mt-20">
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
            <span>Invalid Category</span>
          </div>
        </div>
      )}
    </>
  );
}

export default page;

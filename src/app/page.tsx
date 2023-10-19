import Menu from "@/components/Menu";
import PostItem from "@/components/PostItem";
import { client } from "../../sanity/lib/client";
import { Post } from "@/util/types";

async function getPosts() {
  const query = `*[_type == "post"][0...10] {
    slug,
    description,
    title,
    mainImage,
  }`;

  return client.fetch(query);
}

export default async function page() {
  const posts = (await getPosts()) as Post[];
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
      <Menu />

      {posts.map((post) => (
        <PostItem
          key={post.slug.current}
          slug={post.slug}
          description={post.description}
          title={post.title}
          mainImage={post.mainImage}
        />
      ))}
    </>
  );
}

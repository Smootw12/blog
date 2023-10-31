"use client";

import { Comment } from "@/util/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CommentItem from "./CommentItem";

type Props = {
  comments: Comment[];
  postId: string;
};

interface FormValues extends Pick<Comment, "body" | "email" | "name"> {}

function Comments({ comments, postId }: Props) {
  const [rating, setRating] = useState<Comment["rating"]>(5);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          _id: postId,
          email: data.email,
          body: data.body,
          rating,
        }),
      });

      console.log(res);
    } catch (error) {
      console.log("onSubmit error", error);
    }

    for (let key in register) {
      console.log(key);
      resetField(key as "body" | "email" | "name");
    }
  }

  function handleRating(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(errors);
    setRating(
      parseInt(e.currentTarget.getAttribute("name")!) as Comment["rating"]
    );
  }

  return (
    <>
      <div className="card bg-base-200 w-full">
        <div className="card-body flex flex-col gap-4">
          <h2 className="text-4xl font-black">Lascia un commento!</h2>{" "}
          <div>
            <p className="font-bold">
              Lascia un commento, dopo che sarà verificato verrà mostrato qui
              sotto.
            </p>
            <p className="text-base-content/60 text-xs">
              Ovviamente verranno verificati solo i commenti ideonei che non
              contengano frasi offensive o volgari.
            </p>
          </div>
          <div className="rating gap-1">
            <input
              type="radio"
              name="1"
              className="mask mask-heart bg-red-400"
              onChange={handleRating}
              checked={rating === 1}
            />
            <input
              type="radio"
              name="2"
              className="mask mask-heart bg-orange-400"
              onChange={handleRating}
              checked={rating === 2}
            />
            <input
              type="radio"
              name="3"
              className="mask mask-heart bg-yellow-400"
              onChange={handleRating}
              checked={rating === 3}
            />
            <input
              type="radio"
              name="4"
              className="mask mask-heart bg-lime-400"
              onChange={handleRating}
              checked={rating === 4}
            />
            <input
              type="radio"
              name="5"
              className="mask mask-heart bg-green-400"
              onChange={handleRating}
              checked={rating === 5}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-primary">Email</span>
              </label>
              <input
                placeholder="email"
                className="input input-primary input-bordered  w-full"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt">{errors.email.message}</span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-secondary">Name</span>
              </label>
              <input
                placeholder="name"
                className="input input-bordered w-full input-secondary"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt">{errors.name.message}</span>
                </label>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-accent">Content</span>
              </label>
              <textarea
                placeholder="Content"
                className="textarea textarea-accent textarea-bordered h-24"
                {...register("body", { required: true, maxLength: 500 })}
              />
              {errors.body && (
                <label className="label">
                  <span className="label-text-alt">{errors.body.message}</span>
                </label>
              )}
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="btn btn-active btn-accent"
                disabled={!isDirty || !isValid}
              >
                Send comment
              </button>
            </div>
          </form>
        </div>
      </div>
      <h2 className="text-2xl text-center w-full font-black py-5">
        Commenti del post
      </h2>
      {comments.length > 0 ? (
        comments.map((comment, idx) => (
          <CommentItem key={idx} comment={comment} />
        ))
      ) : (
        <p className="text-center w-full">Non ci sono commenti...</p>
      )}
    </>
  );
}

export default Comments;

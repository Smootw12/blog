"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Comment } from "@/types/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CommentItem from "./CommentItem";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CommentFormValidator, CommentPayload } from "@/lib/validators/comment";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import RatingSelector from "./RatingSelector";
import { z } from "zod";

type Props = {
  user?: Pick<User, "name" | "email"> | null;
  comments: Comment[];
  postId: string;
};

function Comments({ comments, postId, user }: Props) {
  const [rating, setRating] = useState<Comment["rating"]>(5);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Pick<CommentPayload, "comment" | "email" | "name">>({
    resolver: zodResolver(CommentFormValidator),
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
    },
  });

  const { mutate: createCommnent, isPending } = useMutation({
    mutationFn: async ({
      comment,
      email,
      name,
    }: Pick<CommentPayload, "comment" | "email" | "name">) => {
      const payload: CommentPayload = {
        comment,
        email,
        name,
        rating,
        postId,
      };
      await axios.post("/api/post/comment", payload);
    },
    onSuccess: () => {
      setCommentSubmitted(true);

      return toast.success("Comment posted successfully");
    },
  });

  function handleRating(e: React.ChangeEvent<HTMLInputElement>) {
    setRating(parseInt(e.target.value) as Comment["rating"]);
  }

  return (
    <>
      <div className="card bg-base-200 w-full">
        <div className="card-body flex flex-col gap-4">
          {!commentSubmitted ? (
            <>
              <h2 className="text-4xl font-black">Lascia un commento!</h2>{" "}
              <div>
                <p className="font-bold">
                  Lascia un commento, dopo che sarà verificato verrà mostrato
                  qui sotto.
                </p>
                <p className="text-base-content/60 text-xs">
                  Ovviamente verranno verificati solo i commenti ideonei che non
                  contengano frasi offensive o volgari.
                </p>
              </div>
              <RatingSelector handleRating={handleRating} rating={rating} />
              <form
                onSubmit={handleSubmit((e) => createCommnent(e))}
                className="space-y-4"
              >
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text text-primary">Email</span>
                  </label>
                  <input
                    placeholder="email"
                    className="input input-primary input-bordered  w-full"
                    {...register("email")}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt">
                        {errors.email.message}
                      </span>
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
                    {...register("name")}
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt">
                        {errors.name.message}
                      </span>
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
                    {...register("comment")}
                  />
                  {errors.comment && (
                    <label className="label">
                      <span className="label-text-alt">
                        {errors.comment.message}
                      </span>
                    </label>
                  )}
                </div>
                <div className="flex w-full justify-end">
                  <button
                    disabled={isPending || !isDirty || !isValid}
                    type="submit"
                    className="btn btn-active btn-accent"
                  >
                    Send comment
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-black">
                Il commento è stato postato!
              </h2>{" "}
              <div>
                <p className="font-bold">
                  Una voltà verificato verrà mostrato qui sotto insieme a tutti
                  gli altri commenti
                </p>
                <p className="text-base-content/60 text-xs">
                  Ovviamente verranno verificati solo i commenti ideonei che non
                  contengano frasi offensive o volgari.
                </p>
              </div>
            </>
          )}
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

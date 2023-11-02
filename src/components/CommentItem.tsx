import { Comment } from "@/util/types";
import React from "react";

type Props = {
  comment: Comment;
};

function CommentItem({ comment }: Props) {
  return (
    <>
      <div className="card bg-base-200 w-full">
        <div className="card-body w-full px-10 py-8">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-start text-xs">
              <div className="flex space-x-3">
                <div className="text-base-content text-lg font-bold">
                  {comment.name}
                </div>{" "}
                <div className="rating gap-1 mb-2">
                  <input
                    type="radio"
                    name="1"
                    className="mask mask-heart mt-[6px] bg-red-400 w-[1rem] h-[1rem]"
                    readOnly
                    checked={comment.rating === 1}
                  />
                  <input
                    type="radio"
                    name="2"
                    className="mask mask-heart mt-[6px] bg-orange-400 w-[1rem] h-[1rem]"
                    readOnly
                    checked={comment.rating === 2}
                  />
                  <input
                    type="radio"
                    name="3"
                    className="mask mask-heart mt-[6px] bg-yellow-400 w-[1rem] h-[1rem]"
                    readOnly
                    checked={comment.rating === 3}
                  />
                  <input
                    type="radio"
                    name="4"
                    className="mask mask-heart mt-[6px] bg-lime-400 w-[1rem] h-[1rem]"
                    readOnly
                    checked={comment.rating === 4}
                  />
                  <input
                    type="radio"
                    name="5"
                    className="mask mask-heart mt-[6px] bg-green-400 w-[1rem] h-[1rem]"
                    readOnly
                    checked={comment.rating === 5}
                  />
                </div>
              </div>

              <div className="text-base-content/60">{comment.email}</div>
            </div>
          </div>{" "}
          <p className="text-base-content">{comment.body}</p>
        </div>
      </div>
    </>
  );
}

export default CommentItem;

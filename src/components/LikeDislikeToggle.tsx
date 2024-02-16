"use client";

import { VotePayload } from "@/lib/validators/vote";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Heart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  alredyVoted: boolean;
  postId: string;
};

function LikeDislikeToggle({ alredyVoted, postId }: Props) {
  const [voteStauts, setVoteStatus] = useState<boolean>(alredyVoted);

  const { mutate: vote } = useMutation({
    mutationFn: async () => {
      const payload: VotePayload = {
        postId,
      };

      await axios.patch("/api/post/vote", payload);
    },
    onError(err) {
      setVoteStatus((prev) => !prev);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast.error("You must be logged in to vote.");
        }
        return toast.error("Could not vote. Please try again later.");
      }
    },
    onMutate: () => {
      setVoteStatus((prev) => !prev);
    },
  });
  return (
    <>
      <button
        onClick={() => vote()}
        className={"btn " + (voteStauts && "btn-primary") + " p-1"}
      >
        <Heart className="w-10" />
      </button>
    </>
  );
}

export default LikeDislikeToggle;

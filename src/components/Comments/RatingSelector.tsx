"use client";

import { ChangeEvent } from "react";

type Props = {
  handleRating: (e: ChangeEvent<HTMLInputElement>) => void;
  rating: number;
};

function RatingSelector({ handleRating, rating }: Props) {
  return (
    <div className="rating gap-1">
      <input
        type="radio"
        name="rate"
        value={1}
        className={
          "mask mask-heart bg-red-400 " + (rating >= 1 ? "heart-animation" : "")
        }
        onChange={handleRating}
        checked={rating === 1}
      />
      <input
        type="radio"
        name="rate"
        value={2}
        className={
          "mask mask-heart bg-orange-400 " +
          (rating >= 2 ? "heart-animation" : "")
        }
        onChange={handleRating}
        checked={rating === 2}
      />
      <input
        type="radio"
        name="rate"
        value={3}
        className={
          "mask mask-heart bg-yellow-400 " +
          (rating >= 3 ? "heart-animation" : "")
        }
        onChange={handleRating}
        checked={rating === 3}
      />
      <input
        type="radio"
        name="rate"
        value={4}
        className={
          "mask mask-heart bg-lime-400 " +
          (rating >= 4 ? "heart-animation" : "")
        }
        onChange={handleRating}
        checked={rating === 4}
      />
      <input
        type="radio"
        name="rate"
        value={5}
        className={
          "mask mask-heart bg-green-400 " +
          (rating >= 5 ? "heart-animation" : "")
        }
        onChange={handleRating}
        checked={rating === 5}
      />
    </div>
  );
}

export default RatingSelector;

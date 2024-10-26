import React, { useEffect, useState } from "react";
import Coin from "../assets/coin-svgrepo-com.svg";
import { StarIcon, CheckIcon } from "@heroicons/react/24/solid";

function Course({ isPurchased, rating, image, title, description, price }) {

  return (
    <div className="relative w-[201px] h-full flex-shrink-0 flex flex-col justify-between snap-center p-1">
      <div className="rounded-2xl transform-gpu transition-all hover:shadow-2xl hover:scale-95">
        <span className="flex flex-row absolute top-3 rounded-2xl p-1 px-3 left-3 text-xs bg-white z-10 items-center gap-x-1">
          <StarIcon className="w-[10px] h-[10px]" />
          {rating}
        </span>
        <img
          className="w-[200px] h-[200px] object-cover rounded-2xl"
          src={image}
          alt={image}
        />
      </div>
      <div className="relative flex flex-row lg:text-base max-sm:text-[3vw] mt-3 items-start justify-between text-[#4B4B4B] h-full">
        <div className="block w-full">
          <h1 className="text-base font-bold">{title}</h1>
          <p className="mt-2">{description}</p>
        </div>
        {isPurchased ? (
          <div className="absolute top-0 right-2 flex flex-row bg-green-400 max-w-full h-[20px] justify-evenly items-center mt-1 transform rounded-2xl p-1">
            <CheckIcon className="w-full h-full" />
          </div>
        ) : (
          <div className="absolute top-0 right-2 flex flex-row max-w-full h-[20px] justify-evenly items-center mt-1 transform">
            <img className="max-w-full max-h-full" src={Coin} alt="" />
            <span className="text-xs ml-2 font-bold">{price}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;

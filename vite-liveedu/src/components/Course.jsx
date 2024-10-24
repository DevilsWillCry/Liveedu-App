import React from "react";
import Coin from "../assets/coin-svgrepo-com.svg";
import { StarIcon } from "@heroicons/react/24/solid";

function Course({ rating, image, title, description, price }) {
  return (
    <div className="relative w-[201px] h-full flex-shrink-0 flex flex-col justify-between snap-center p-1">
      <div className="rounded-2xl transition-all transform-gpu hover:shadow-2xl hover:scale-95">
        <span className="flex flex-row absolute  top-3 rounded-2xl p-1 px-3 left-3 text-xs bg-white z-10 items-center gap-x-1">
          <StarIcon className="w-[10px] h-[10px]" />
          {rating}
        </span>
        <img
          className="w-[200px] h-[200px] object-cover rounded-2xl"
          src={image}
          alt={image}
        />
      </div>
      <div className="flex flex-row text-[3vw] mt-3 justify-between text-[#4B4B4B]">
        <div className="block w-fulL">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="mt-2">{description}</p>
        </div>
        <div className="flex flex-row w-[35%] h-[20px] justify-center items-center mt-1">
          <img className="max-w-full max-h-full" src={Coin} alt="" />
          <span className="text-xs ml-2 font-bold">{price}</span>
        </div>
      </div>
    </div>
  );
}

export default Course;

import React from "react";
import Coin from "../assets/coin-svgrepo-com.svg";
import Bell from "../assets/bell-svgrepo-com.svg";
import elementary from "../assets/elementals-home.png";
import advanced from "../assets/advanced-home-2.jpg";
import Course from "./Course";

function HomePage() {
  return (
    <div className="bg-white w-full h-full items-center">
      <div className="flex flex-row justify-center items-center h-[20%] w-full bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] rounded-bl-3xl rounded-br-3xl p-3">
        <div className="flex flex-col text-start items-start w-full ">
          <h1 className="text-center font-bold text-[#4B4B4B] text-xl">
            Hi, Robert
          </h1>
          <p className="text-center text-base text-[#4B4B4B] ">
            Let's start learning!
          </p>
        </div>
        <div className="flex flex-row flex-shrink-1 w-[50%] h-auto items-center justify-between text-center">
          <div className="flex flex-row max-w-auto max-h-[30%]">
            <img className="w-[20px] h-[25px]" src={Coin} alt="" />
            <span className="text-base font-bold">400</span>
          </div>
          <div className="flex flex-row max-w-auto max-h-[30%]">
            <img className="w-[20px] h-[25px]" src={Bell} alt="" />
            <span className="text-base font-bold">5</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h1>Courses</h1>
        <div className="flex flex-shrink-0 w-full h-auto overflow-x-auto p-3 gap-5 snap-x snap-mandatory">
          <Course
            rating={5.5}
            image={elementary}
            title={"Elementary"}
            description={"For Beginners And Intermediates"}
            price={"450"}
          />
          <Course
            rating={4.9}
            image={advanced}
            title={"Advanced"}
            description={"For advanced"}
            price={"650"}
          />
        </div>
        <h1>Topics for Study</h1>
        <div>
            
        </div>
      </div>
    </div>
  );
}

export default HomePage;

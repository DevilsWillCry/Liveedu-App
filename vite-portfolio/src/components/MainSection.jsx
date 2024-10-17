import React from "react";
import { ReactTyped } from "react-typed";
import mainImage from "../assets/main-image.png";

const textColor = "text-white";
const altTextColor = "text-myColor";

function MainSection() {
  return (
    <div className="flex flex-row justify-center items-center w-screen h-[100vh] bg-[#070707] mt-10 px-14 gap-x-5">
      <div className="sm:text-[5vw] max-sm:text-[6.5vw] w-full lg:w-[60%] max-sm:h-[20vh] max-sm:text-center animate-slide-in-blurred-top">
        <h1 className={`${textColor} font-bold block`}>{"{"}Soy Miguel Angel</h1>
        <span className={`${altTextColor} font-bold`}>
          <ReactTyped
            strings={[
              "Desarrollador Web",
              "Frontend Developer",
              "Backend Developer",
            ]}
            typeSpeed={60}
            backSpeed={50}
            loop
          />
          {"}"}
        </span>
      </div>
      <div className="flex max-sm:hidden items-center justify-center w-[22vw]  h-auto rounded-3xl bg-[#070707] border-2 transition-all animate-slide-in-blurred-top">
        <img
          className="w-[100%] h-[100%] rounded-3xl object-contain drop-shadow-[0_35px_35px_rgba(249,246,247,0.2)] transition-all"
          src={mainImage}
          alt="assets/main-image.png"
        />
      </div>
    </div>
  );
}

export default MainSection;

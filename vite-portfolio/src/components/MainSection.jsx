import React from "react";
import { ReactTyped } from "react-typed";

import mainImage from "../assets/main-image.png";

const textColor = "text-white";
const altTextColor = "text-myColor";

function MainSection() {
  return (
    <div className="flex flex-row justify-center items-center w-screen h-[100vh] bg-slate-950 mt-10 p-10">
      <div className="sm:text-[5vw] max-sm:text-[8vw] w-screen max-sm:h-[30vh] max-sm:text-center">
        <h1 className={`${textColor} font-bold block`}>Soy Miguel Angel</h1>
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
        </span>
      </div>
      <div className="flex max-sm:hidden items-center justify-center w-[30vw]  h-auto rounded-3xl bg-slate-950 border-2 ">
        <img
          className="w-[100%] h-[100%] rounded-3xl object-contain"
          src={mainImage}
          alt="assets/main-image.png"
        />
      </div>
    </div>
  );
}

export default MainSection;

import React from "react";
import WaveText from "./WaveText";

import MyCarousel from "./Carousel";
import { arrayElements } from "../helpers/arrayCarousel.js";

function TecnologiesSection() {
  return (
    <div className="flex flex-col justify-start items-center gap-5 mx-5">
      <div className="flex flex-col absolute lg:top-0 max-sm:-top-[40%] sm:-top-[33%]  lg:left-1/2 -translate-x-1/2 text-center items-center justify-center">
        <MyCarousel arrayElements={arrayElements} />
      </div>
    </div>
  );
}

export default TecnologiesSection;

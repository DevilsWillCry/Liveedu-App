import React from "react";
import {
  Card,
  Typography,
  Carousel,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { arrayElements } from "../helpers/arrayCarousel.js";
import ImageProject1 from "../assets/projects-images/ClashRoyale-project-1.png";
import ImageProject2 from "../assets/projects-images/Calculadora-project-2.png";
import ImageProject3 from "../assets/projects-images/AdoptPet-App-project-3.png";
import WaveText from "./WaveText.jsx";

const arrayShowElements = [
  {
    id: 1,
    lenguages: [
      {
        name: "HTML",
        image: arrayElements.find((element) => element.name === "HTML")?.image,
      },
      {
        name: "CSS",
        image: arrayElements.find((element) => element.name === "CSS")?.image,
      },
      {
        name: "JavaScript",
        image: arrayElements.find((element) => element.name === "JavaScript")
          ?.image,
      },
    ],
    projectName: "Clash Royale SC",
    projectImage: ImageProject1,
    projectLink: "https://github.com/DevilsWillCry/ClashRoyaleChallenge",
  },
  {
    id: 2,
    lenguages: [
      {
        name: "HTML",
        image: arrayElements.find((element) => element.name === "HTML")?.image,
      },
      {
        name: "CSS",
        image: arrayElements.find((element) => element.name === "CSS")?.image,
      },
      {
        name: "JavaScript",
        image: arrayElements.find((element) => element.name === "JavaScript")
          ?.image,
      },
    ],
    projectName: "Calculadora De Propinas",
    projectImage: ImageProject2,
    projectLink: "https://github.com/DevilsWillCry/calculatorChallenge",
  },
  {
    id: 3,
    lenguages: [
      {
        name: "HTML",
        image: arrayElements.find((element) => element.name === "HTML")?.image,
      },
      {
        name: "CSS",
        image: arrayElements.find((element) => element.name === "CSS")?.image,
      },
      {
        name: "JavaScript",
        image: arrayElements.find((element) => element.name === "JavaScript")
          ?.image,
      },
    ],
    projectName: "Diseño App De Adopción",
    projectImage: ImageProject3,
    projectLink: "https://github.com/DevilsWillCry/Adopt-App-Design",
  },
];

function ProjectsSection() {
  return (
    <div className="flex items-center justify-center mt-10 max-sm:mt-14 px-4">
      <Carousel className="rounded-xl lg:w-2/4 max-sm:w-3/4 lg:h-1/2 max-sm:h-[30%] animate-shadowDropCenter bg-[#070707] opacity-95">
        {arrayShowElements.map((item) => (
          <div
            key={item.id}
            className="relative lg:px-10 py-8 rounded-xl bg-[#070707] max-sm:bg-blue-400"
          >
            <Typography className="text-lg sm:text-xl md:text-2xl text-white font-bold transform-gpu mb-5 text-center contrast-150">
              <span>{item.projectName}</span>
            </Typography>
            <CardHeader className="flex flex-col text-center items-center justify-center max-sm:max-w-1/2 max-sm:h-[50%]">
              <img
                className="lg:max-w-[100%] lg:h-auto  object-cover"
                src={item.projectImage}
                alt={item.projectImage}
              />
            </CardHeader>
            <CardBody>
              <ul className="flex flex-wrap gap-3 text-center items-center mb-5">
                {item.lenguages.map((language) => (
                  <li
                    key={language.name}
                    className="flex flex-col text-sm sm:text-base text-white items-center content-center"
                  >
                    <img
                      className="h-[2vw] w-[2vw] sm:h-[3vw] sm:w-[3vw] items-center"
                      src={language.image}
                      alt={language.name}
                    />
                    <span className="text-xs sm:text-sm">{language.name}</span>
                  </li>
                ))}
              </ul>
              <a
                href={item.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black bg-white animate-shadowDropCenter hover:animate-pulse p-2 rounded-2xl hover:text-gray-500 hover:bg-gray-300 transition-all contrast-150"
              >
                Ver Proyecto
              </a>
            </CardBody>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ProjectsSection;

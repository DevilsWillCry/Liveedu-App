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
      {
        name: "Tailwind CSS",
        image: arrayElements.find((element) => element.name === "Tailwind CSS")
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
    <div className="flex items-center justify-center py-10 px-4 lg:px-8 mt-7">
      <Carousel
        className="lg:w-[1000px] lg:max-w-screen bg-gray-900 rounded-xl shadow-lg overflow-hidden h-[45vw] max-sm:w-[300px] max-sm:h-[500px] sm:w-[600px]"
        autoplay={true}
        loop={true}
      >
        {arrayShowElements.map((item) => (
          <div key={item.id} className="flex flex-col items-center p-6 lg:p-10">
            {/* Project Name */}
            <Typography
              variant="h5"
              className="text-center text-white font-semibold text-lg sm:text-xl md:text-2xl mb-10"
            >
              {item.projectName}
            </Typography>

            {/* Project Image */}
            <div className="flex lg:flex-col max-sm:flex-col sm:flex-row sm:w-[80%] lg:items-center sm:items-center max-sm:items-center sm:justify-between ">
              <CardHeader className="max-w-full lg:h-[400px] flex justify-center mb-6 max-sm:h-[150px] sm:h-[180px]">
                <img
                  src={item.projectImage}
                  alt={item.projectName}
                  className="max-w-full sm:max-w-md lg:max-w-lg h-auto rounded-md shadow-md object-cover max-sm:[1vw] max-sm:object-cover sm:w-full"
                />
              </CardHeader>

              {/* Programming Languages */}
              <CardBody className="w-full text-center">
                <ul className="flex flex-wrap justify-center gap-3 mb-6">
                  {item.lenguages.map((language) => (
                    <li
                      key={language.name}
                      className="flex flex-col items-center"
                    >
                      <img
                        src={language.image}
                        alt={language.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                      />
                      <Typography className="text-xs sm:text-sm text-white mt-2">
                        {language.name}
                      </Typography>
                    </li>
                  ))}
                </ul>

                {/* Project Link Button */}
                <a
                  href={item.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 text-sm font-semibold text-gray-900 bg-white rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-md"
                >
                  Ver Proyecto
                </a>
              </CardBody>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ProjectsSection;

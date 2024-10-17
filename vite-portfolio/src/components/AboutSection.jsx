import React from "react";
import { ReactTyped, Typed } from "react-typed";
import imageAbout from "../assets/about-image.jpg";
import WaveText from "./WaveText";

const textColor = "text-white";
const altTextColor = "text-myColor";

function AboutSection() {
  return (
    <div className="absolute flex flex-row justify-between items-center h-[80%] w-[90%] mt-12 z-10 bg-white opacity-95 rounded-xl animate-shadowDropCenter max-sm:flex-col gap-5">
      <div className="h-full w-[80vw] max-sm:w-full  max-sm:absolute max-sm:-z-10 max-sm:opacity-100 max-sm:contrast-150 max-sm:rounded-xl">
        <img
          className="max-w-[100%] h-[100%] object-cover drop-shadow-[0_35px_35px_rgba(249,246,247,0.2)]  transition-all rounded-tl-xl rounded-bl-xl max-sm:max-w-[100%] max-sm:rounded-xl"
          src={imageAbout}
          alt="assets/about-image.jpg"
        />
      </div>

      <div className="items-start w-full h-full px-10 max-sm:px-5 overflow-y-auto mt-3 max-sm:bg-black max-sm:bg-opacity-70 max-sm:rounded-xl">
        <h1 className="text-[3vw] text-center font-extrabold transform-gpu mb-5 text-myColor max-sm:text-[8vw]">
          Sobre Mí
        </h1>
        <p className="text-[1.7vw] text-justify break-words tracking-wide hyphens-auto max-sm:text-[4vw] max-sm:text-white max-sm:tracking-tighter">
          <strong className="inline-block text-myColor">
            ¡Hola!
          </strong>
          <span className="animate-shakeHorizontal inline-block">👋</span>
          , soy <WaveText text={"Miguel Angel"} />, estudiante de Ingeniería
          Electrónica en décimo semestre, apasionado por el desarrollo web.
          Tengo experiencia en <strong className="text-red-600">HTML</strong>,{" "}
          <strong className="text-blue-700">CSS</strong>,{" "}
          <strong className="text-yellow-400">JavaScript</strong>, y tecnologías
          como <strong className="text-blue-400">React</strong> y {" "}
          <strong className="text-purple-700">Redux</strong>, creando interfaces
          modernas y optimizadas. También manejo bases de datos <strong className="text-indigo-500">SQL</strong> y lenguajes
          como <strong className="text-yellow-400">Python</strong> y <strong className="text-red-500">Java</strong>, lo que me permite abordar proyectos full-stack con
          un enfoque en soluciones escalables y eficientes. Siempre en busca de
          mejorar, estoy listo para enfrentar nuevos desafíos y contribuir a
          proyectos innovadores.
        </p>
      </div>
    </div>
  );
}

export default AboutSection;

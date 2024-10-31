import React, { useEffect, useRef } from "react";
import AboutSection from "./components/AboutSection";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";
import TecnologiesSection from "./components/TecnologiesSection";
import ProjectsSection from "./components/ProjectsSection";
import ExpStudSection from "./components/ExpStudSection";
import MyBanner from "./components/MyBanner";
import ContactSection from "./components/ContactSection";

function App() {
  return (
    <main className="w-screen h-auto items-center justify-center font-serif">
      <NavBar />
      <section id="home" className="section transition-all">
        <MainSection />
      </section>
      <section
        id="about"
        className="section relative overflow-hidden bg-myColor flex justify-center items-center  h-screen w-screen transition-all duration-500 -z-10"
      >
        <AboutSection />
      </section>
      <section
        id="technologies"
        className="section relative lg:h-[1000px] max-sm:h-[300px] sm:h-[440px]  w-screen flex flex-col items-center justify-center bg-[#070707]"
      >
        <TecnologiesSection />
      </section>
      <section
        id="projects"
        className="section relative w-screen h-screen sm:h-auto flex items-center justify-center bg-myColor"
      >
        <ProjectsSection />
      </section>
      <section
        id="contact"
        className="section relative w-screen max-sm:h-[100vh] lg:h-[100vh] sm:h-auto flex items-center justify-center bg-[#070707]"
      >
        <ContactSection/> 
      </section>
    </main>
  );
}

export default App;

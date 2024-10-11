import React, { useEffect, useRef } from "react";
import AboutSection from "./components/AboutSection";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";
import NameInput from "./components/NameInput";
import TecnologiesSection from "./components/TecnologiesSection";

function App() {
  return (
    <main className="w-screen h-auto items-center justify-center font-serif">
      <NavBar />
      <section id="home" className="section transition-all">
        <MainSection />
      </section>
      <section id="about" className="section relative overflow-hidden bg-myColor flex justify-center items-center  h-screen w-screen transition-all duration-500 -z-10">
        <AboutSection />
      </section>
      <section id="technologies" className="h-screen w-screen flex flex-col items-center justify-center bg-[#070707]">
        <TecnologiesSection/>
      </section>
    </main>
  );
}

export default App;

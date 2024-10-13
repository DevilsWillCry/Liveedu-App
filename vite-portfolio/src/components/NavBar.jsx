import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoImage from "../assets/logo-image.jpg";
import {
  HomeIcon,
  AcademicCapIcon,
  UserCircleIcon,
  TrophyIcon,
  CommandLineIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

const navigation = [
  {
    name: "Home",
    href: "#home",
    current: true,
    image: <HomeIcon className="text-myColor size-5" />,
  },
  {
    name: "About Me",
    href: "#about",
    image: <UserCircleIcon className="text-myColor size-5" />,
  },
  {
    name: "Technologies",
    href: "#technologies",
    image: <CommandLineIcon className="text-myColor size-5" />,
  },
  {
    name: "Projects",
    href: "#projects",
    image: <TrophyIcon className="text-myColor size-5" />,
  },
  {
    name: "Contact",
    href: "#contact",
    image: <PhoneIcon className="text-myColor size-5" />,
  },
];

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentNavigation, setNavigation] = useState(navigation);

  const handleNavBar = () => {
    console.log("Opening navigation");
    setIsNavOpen(true);
  };

  const handleCloseNavBar = () => {
    console.log("Closing navigation");
    setIsNavOpen(false);
  };

  // Función para manejar el desplazamiento suave y actualizar el estado
  const handleScrollToSection = (e) => {
    const sectionName = e.target.textContent;
    // Actualizar el estado de la navegación para resaltar la sección activa
    setNavigation(
      currentNavigation.map((navItem) =>
        navItem.name === sectionName
          ? { ...navItem, current: true }
          : { ...navItem, current: false }
      )
    );
    setIsNavOpen(false);
  };

  return (
    <div className="flex flex-row  fixed top-0 left-0 w-screen h-auto bg-black max-sm:items-end max-sm:p-3  sm:p-3 sm:items-center max-sm:justify-between z-50">
      {/* Text NavBar in PC resolution*/}
      <div className="bg-white relative rounded-full h-full w-[12%]">
        <img
          className="h-[36px] w-[100px] object-cover rounded-t-full rounded-b-full opacity-80 -z-10"
          src={logoImage}
          alt="logo-image.png"
        />
        <h1 className="text-myColor contrast-150 absolute -top-[-5px] right-[10%] max-sm:hidden">
          DevFolio
        </h1>
      </div>
      {/* Icon to open the navbar (hamburger icon) */}
      <Bars3Icon
        onClick={handleNavBar}
        className={`w-8 max-sm:flex hidden text-white cursor-pointer`}
      />

      {/* Navbar that slides in */}
      <div
        className={`flex justify-between bg-black max-sm:absolute top-0 left-0 w-screen max-sm:p-3 ${
          isNavOpen ? " max-sm:translate-y-0" : " max-sm:-translate-y-full"
        }  transform transition-all sm:justify-end 
        `}
      >
        <div className="flex  max-sm:flex-col gap-y-5 max-sm:mt-5 text-start mr-2 sm:border-2 sm:rounded-full">
          {currentNavigation.map((item) => (
            <div key={item.name} className="flex items-center justify-start">
              <span className="hidden max-sm:inline-block">{item.image}</span>
              <a
                onClick={(e) => handleScrollToSection(e)}
                rel="noopener noreferrer"
                href={item.href}
                className={`text-white mx-2 transition-colors duration-300 hover:text-gray-500 sm:text-[1.8vw] lg:text-[1vw] max-sm:text-[3vw] max-md:text-[2vw] p-1 ${
                  item.current ? "font-bold" : ""
                }`}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>

        {/* Icon to close the navbar (X icon) */}
        <div
          onClick={handleCloseNavBar}
          className="hidden max-sm:flex bg-red-500 h-max mt-3 hover:bg-red-800"
        >
          <XMarkIcon className="w-6 h-6 text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;

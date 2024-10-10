import React, { useState, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "#home", current: true},
  { name: "About Me", href: "#about"},
  { name: "Projects", href: "#projects"},
  { name: "Experience & Studies", href: "#exp-stud"},
  { name: "Contact", href: "#contact"},
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
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-auto flex bg-slate-900 max-sm:justify-end max-sm:items-end max-sm:p-3  sm:p-3 sm:items-center z-50">
      {/* Text NavBar in PC resolution*/}
      <h1 className="text-white max-sm:hidden">DevFolio</h1>
      {/* Icon to open the navbar (hamburger icon) */}
      <Bars3Icon
        onClick={handleNavBar}
        className={`w-8 max-sm:flex hidden text-white cursor-pointer`}
      />

      {/* Navbar that slides in */}
      <div
        className={`flex justify-between bg-slate-900  max-sm:absolute top-0 left-0 w-screen max-sm:p-3 ${
          isNavOpen ? " max-sm:translate-y-0" : " max-sm:-translate-y-full"
        }  transform transition-all sm:justify-end 
        `}
      >
        <div className="flex  max-sm:flex-col gap-y-5 max-sm:mt-5 text-start">
          {currentNavigation.map((item) => (
            <a
              onClick={(e) => handleScrollToSection(e)}
              rel="noopener noreferrer"
              key={item.name}
              href={item.href}
              className={`text-white mx-3 transition-colors duration-300 hover:text-gray-500 ${
                item.current ? "font-bold" : ""
              }`}
            >
              {item.name}
            </a>
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

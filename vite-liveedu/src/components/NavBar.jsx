import React, { memo, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import HomeIcon from "../assets/home-icon.svg";
import TestIcon from "../assets/test-icon.svg";
import StadisticIcon from "../assets/stadistic-icon.svg";
import ProfileIcon from "../assets/profile-icon.svg";


const ArrayIcons = [
  {
    icon: HomeIcon,
    to: "/home",
    label: "Home",
  },
  {
    icon: TestIcon,
    to: "/tests",
    label: "Tests",
  },
  {
    icon: StadisticIcon,
    to: "/stadistics",
    label: "Stadistics",
  },
  {
    icon: ProfileIcon,
    to: "/profile",
    label: "Profile",
  },
];

function NavBar() {
  const [activeIcon, setActiveIcon] = useState(0); // Estado para almacenar el icono presionado

  const handleToggleMenu = (index) => {
    setActiveIcon(index !== activeIcon ? index: index);
  };

  return (
    <nav className="fixed -bottom-2 right-0 bg-white rounded-tr-2xl rounded-tl-2xl shadow-2xl border-2 p-4 w-full z-20">
      <ul className="flex flex-row justify-around text-black transition-all transform-gpu items-center">
        {ArrayIcons.map((item, index) => (
          <li className="items-center" key={index}>
            <Link to={item.to}>
              <span
                className={`relative before:absolute before:-top-[16.5px] before:block before:bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] before:-inset-1 before:w-[30px] before:h-[45px] before:-z-10 before:rounded-bl-lg before:rounded-br-lg ${
                  activeIcon !== index ? "hidden" : ""
                }`}
              ></span>
              <img
                onClick={() => handleToggleMenu(index)}
                className="w-full h-full object-contain"
                src={item.icon}
                alt={item.icon}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NavbarLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default memo(NavbarLayout);

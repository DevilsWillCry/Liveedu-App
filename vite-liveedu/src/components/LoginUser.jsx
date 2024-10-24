import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import PasswordInput from "./PassWordInput";

import getUsers from "../services/users/getUsers";
import { usersURL } from "../services/routes";

import countrys from "../db/country-codes.json";

import { ArrowDownIcon } from "@heroicons/react/24/solid";

import Swal from "sweetalert2";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

function LoginUser() {
  // Definición de estados para cada campo
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [prefix, setPrefix] = useState(countrys[0].phone);
  const [imageCountry, setImageCountry] = useState(countrys[0].image);
  const [phoneLengthCountry, setPhoneLengthCountry] = useState(
    countrys[0].phoneLength
  );
  const [userState, setUser] = useState({});
  const [changePage, setChangePage] = useState(false);

  const navigate = useNavigate();

  console.log("phone:", prefix + phone);
  console.log("password:", password);
  console.log("Prefijo:", prefix);
  console.log("Imagen del país:", imageCountry);
  console.log("Longitud del número de teléfono:", phoneLengthCountry);
  console.log("phone length:", phone.length);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para validar los datos del backend
    const users = await getUsers(usersURL);

    if (phone.length != phoneLengthCountry) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The phone number does not match the length of your country " + phoneLengthCountry,
      });
      return;
    }
    const user = users.find(
      (u) => u.phone === prefix + phone && u.password === password
    );
    if (user) {
      setUser(user);
      setChangePage(true);
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect password or email",
      });
      setChangePage(false);
    }
  };

  // Este useEffect se ejecuta cada vez que se actualiza el estado de userState
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userState));
    if (changePage) {
      Swal.fire({
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
      navigate("/home");
      }, 1500);
    }
  }, [userState]);

  const handleCountry = (element) => {
    setPrefix(
      element.phone && element.phone.length > 0 ? element.phone[0] : "N/A"
    );
    setImageCountry(element.image);

    setPhoneLengthCountry(
      element.phone && element.phone.length > 0 ? element.phoneLength : 0
    );
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center mt-[20%]">
      <div className="flex flex-col text-star p-3 mr-20 mb-5">
        <h1 className="font-bold text-3xl">Welcome back!</h1>
        <p className="text-base">
          Sign in to an existing account using your phone number
        </p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col items-center justify-center w-full my-5 gap-y-3"
      >
        <div className="relative rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <Menu>
            <MenuHandler>
              <div className="text-black flex flex-row justify-center gap-1 p-1 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] rounded-xl shadow-2xl absolute max-w-[100%] h-[100%] -top-1/2 -translate-y-1  left-0 cursor-pointer z-0">
                <img className="w-[30px] h-[30px]" src={imageCountry} alt="" />
                {prefix}
                <ArrowDownIcon className="w-[20px] h-[25px] align-middle text-black" />
              </div>
            </MenuHandler>
            <MenuList className="w-auto h-[50%] scroll-smooth overflow-y-auto">
              {countrys.map((element, index) => (
                <MenuItem
                  key={index}
                  className="flex flex-row"
                  onClick={() => handleCountry(element)}
                >
                  <div className="flex flex-row w-[25%]">
                    <img
                      className="w-[20px] h-[20px]"
                      src={element.image}
                      alt={element.name + ".jpg"}
                    />
                    {element.phone && element.phone.length > 0
                      ? element.phone[0]
                      : "N/A"}
                  </div>
                  {element.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <input
            className="relative w-full rounded-xl p-3 focus:outline-none z-20"
            type="number"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className=" rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%] mb-[60%]">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <MyButton text={"Login"} />
      </form>
      <div>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <span className="text-blue-400">
            <Link to="/register">Sign up now</Link>{" "}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginUser;

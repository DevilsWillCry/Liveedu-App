import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import PasswordInput from "./PassWordInput";

import getUsers from "../services/users/getUsers";
import postUsers from "../services/users/postUsers";
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

function RegisterUser() {
  const navigate = useNavigate();
  // Definición de estados para cada campo
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [prefix, setPrefix] = useState(countrys[0].phone);
  const [imageCountry, setImageCountry] = useState(countrys[0].image);
  const [phoneLengthCountry, setPhoneLengthCountry] = useState(
    countrys[0].phoneLength
  );

  console.log("Name: ", name);
  console.log("email:", email);
  console.log("phone:", prefix + phone);
  console.log("password:", password);
  console.log("Prefijo:", prefix);
  console.log("Imagen del país:", imageCountry);
  console.log("Longitud del número de teléfono:", phoneLengthCountry);
  console.log("phone length:", phone.length);


  const createUserData = () => {
    return {
      id: crypto.randomUUID(),
      name,
      email,
      phone: prefix + phone,
      password,
      coins: 400,
      purchasedCourses: [],
    };
  };

  const userPostData = async () =>{
    try {
      const users = await getUsers(usersURL);
      const userExist = users.some((user) => user.email === email ||  user.phone === (prefix + phone));
      if (userExist) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The email already exists or the phone is already in use",
        });
        return;
      } else {
        const userData = createUserData()
        await postUsers(usersURL, userData);
        Swal.fire({
          icon: "success",
          title: "Account created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        //* : Redirección a la página de inicio de sesión o al menú principal cuando la cuenta se crea correctamente.
        setTimeout(() => {
          navigate("/home"); //TODO ----> sujeto a cambios, navigate("/verification-account") <------- TODO//
        }, 1600);
      }
    } catch (error) {
      console.error("Error al buscar el usuario en la base de datos:", error);
    }
  };

  const sendVerification = async (e) => {
    e.preventDefault();

    if (phone.length != phoneLengthCountry) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "length must be equal to " + phoneLengthCountry,
      });
      return;
    }

    await userPostData(); //TODO Enviar los datos al backend para crear la cuenta

    /* 
    try {
      const response = await fetch("http://localhost:3001/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: prefix + phone }),
      });

      const data = await response.json();
      console.log(data);
      navigate("/verification-account");
    } catch (error) {
      console.error("Error al enviar la petición de verificación:", error);
    }
      */
  };

  const handleCountry = (element) => {
    setPrefix(
      element.phone && element.phone.length > 0 ? element.phone[0] : "N/A"
    );
    setImageCountry(element.image);

    setPhoneLengthCountry(
      element.phone && element.phone.length > 0 ? element.phoneLength : 0
    );
  };

  useEffect(() =>{
    localStorage.setItem("userData", JSON.stringify(createUserData()));
  }, [name, email, phone, password]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center mt-[20%]">
      <div className="flex flex-col text-star p-3 mr-20">
        <h1 className="font-bold text-2xl">Create New Account</h1>
        <p className="text-base">
          Create a new account by filling in all the fields or log in to an
          existing account
        </p>
      </div>
      {/* Envuelve los inputs en un formulario */}
      <form
        onSubmit={sendVerification}
        className="flex flex-col items-center justify-center w-full my-5 gap-y-3"
      >
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
            type="text"
            placeholder="John Doe"
            value={name} // Enlazar el estado
            onChange={(e) => setName(e.target.value)} // Actualizar el estado
            required
          />
        </div>
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
            type="email"
            placeholder="name@example.com"
            value={email} // Enlazar el estado
            onChange={(e) => setEmail(e.target.value)} // Actualizar el estado
            required
          />
        </div>
        <div className="relative rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%] mt-6">
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
            className="relative w-full rounded-xl p-3 focus:outline-none z-10"
            type="number"
            placeholder="Phone number"
            value={phone} // Enlazar el estado
            onChange={(e) => setPhone(e.target.value)} // Actualizar el estado
            required
          />
        </div>
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%] mb-[20%]">
          <PasswordInput
            value={password} // Enlazar el estado
            onChange={(e) => setPassword(e.target.value)} // Actualizar el estado
          />
        </div>
        <MyButton type="submit" text={"Create"} />
      </form>
      <div>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <span className="text-blue-400">
            <Link to="/login">Sign in</Link>{" "}
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterUser;

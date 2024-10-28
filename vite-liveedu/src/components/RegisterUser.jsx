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
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";

function RegisterUser() {
  const navigate = useNavigate();
  const [id, setId] = useState(crypto.randomUUID()); // Genera el ID una sola vez
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [prefix, setPrefix] = useState(countrys[0].phone);
  const [nameCountry, setNameCountry] = useState(countrys[0].name);
  const [imageCountry, setImageCountry] = useState(countrys[0].image);
  const [phoneLengthCountry, setPhoneLengthCountry] = useState(countrys[0].phoneLength);

  const createUserData = () => {
    return {
      id, 
      name,
      email,
      phone: prefix + phone,
      country: nameCountry,
      password,
      coins: 1000,
      purchasedCourses: [],
    };
  };

  const userPostData = async () => {
    try {
      const users = await getUsers(usersURL);
      const userExist = users.some(
        (user) => user.email === email || user.phone === prefix + phone
      );
      if (userExist) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The email already exists or the phone is already in use",
        });
        return;
      } else {
        const userData = createUserData();
        await postUsers(usersURL, userData);
        Swal.fire({
          icon: "success",
          title: "Account created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/home");
        }, 1600);
      }
    } catch (error) {
      console.error("Error al buscar el usuario en la base de datos:", error);
    }
  };

  const sendVerification = async (e) => {
    e.preventDefault();

    if (phone.length !== phoneLengthCountry) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "length must be equal to " + phoneLengthCountry,
      });
      return;
    }

    await userPostData();
  };

  const handleCountry = (element) => {
    setNameCountry(element.name);
    setPrefix(element.phone && element.phone.length > 0 ? element.phone[0] : "N/A");
    setImageCountry(element.image);
    setPhoneLengthCountry(element.phone && element.phone.length > 0 ? element.phoneLength : 0);
  };

  useEffect(() => {
    // Guarda los datos con el ID generado
    localStorage.setItem("userData", JSON.stringify(createUserData()));
  }, [id, name, email, phone, password]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center mt-[20%]">
      <div className="flex flex-col text-star p-3 mr-20">
        <h1 className="font-bold text-2xl">Create New Account</h1>
        <p className="text-base">
          Create a new account by filling in all the fields or log in to an
          existing account
        </p>
      </div>
      <form
        onSubmit={sendVerification}
        className="flex flex-col items-center justify-center w-full my-5 gap-y-3"
      >
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%] mb-[20%]">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

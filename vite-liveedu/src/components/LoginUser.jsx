import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import PasswordInput from "./PassWordInput";

import getUsers  from "../services/users/getUsers"

import { usersURL} from "../services/routes"

function LoginUser() {
  // Definición de estados para cada campo
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  console.log("Nombre:", phone);
  console.log("Email:", password);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para validar los datos y enviarlos al backend
    const users = await getUsers(usersURL);
    const user = users.find((u) => u.phone === phone && u.password === password);
    // Aquí debes implementar el código para validar los datos y enviarlos al backend
    if (user) {
      // Si el usuario existe, redireccionar a la página principal
      // En este caso, la página principal es la raíz ("/")
      alert("Logged in successfully");
      navigate("/home")
    } else {
      // Si el usuario no existe, mostrar un mensaje de error
      alert("Invalid phone number or password");
    }
  };
  return (
    <div className="flex flex-col w-full h-full items-center justify-center mt-[20%]">
      <div className="flex flex-col text-star p-3 mr-20">
        <h1 className="font-bold text-3xl">Welcome back!</h1>
        <p className="text-base">
          Sign in to an existing account using your phone number
        </p>
      </div>
      <form
        onSubmit={(e) =>{handleSubmit(e)}}
        className="flex flex-col items-center justify-center w-full my-5 gap-y-3"
      >
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
            type="number"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%] mb-[60%]">
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

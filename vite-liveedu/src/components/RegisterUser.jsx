import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import PasswordInput from "./PassWordInput";

import getUsers  from "../services/users/getUsers"
import postUsers  from "../services/users/postUsers"
import { usersURL} from "../services/routes"


function RegisterUser() {
  const navigate = useNavigate();
  // Definición de estados para cada campo
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  console.log(name, email, phone, password)

  const sendVerification = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      phone,
      password,
    }
    //Verificar si existe en la base de datos JSON
    try {
      const users = await getUsers(usersURL);
      console.log(users)
      const userExist = users.some((user) => user.email === email && user.phone === phone);
      if (userExist) {
        alert("El correo electrónico ya está registrado");
        return;
      }
      else{
        await postUsers(usersURL, userData);
        alert("Cuenta creada exitosamente!");
        navigate("/verification-account");
      }
    } catch (error) {
      console.error("Error al buscar usuarios en la base de datos:", error); 
    }

    try {
      const response = await fetch("http://localhost:3001/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: "+573017815945" }),
      });
  
      const data = await response.json();
      console.log(data);
      navigate("/verification-account");
      
    } catch (error) {
      console.error("Error al enviar la petición de verificación:", error);
    }
  };

  return(
    <div className="flex flex-col w-full h-full items-center justify-center mt-[20%]">
      <div className="flex flex-col text-star p-3 mr-20">
        <h1 className="font-bold text-2xl">Create New Account</h1>
        <p className="text-base">
          Create a new account by filling in all the fields or log in to an
          existing account
        </p>
      </div>
      {/* Envuelve los inputs en un formulario */}
      <form onSubmit={sendVerification} className="flex flex-col items-center justify-center w-full my-5 gap-y-3">
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

        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
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
        <MyButton type="submit" text={"Create"} /> {/* Cambia el tipo a "submit" */}
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

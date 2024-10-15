import React, { useRef, useState } from "react";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import CheckImage from "../assets/check-mark-button-svgrepo-com.svg"
import WrongCheckImage from "../assets/freepicdownloader.com_-rounded-cross-vector-medium.svg"

import MyButton from "./MyButton";

import { useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function VerificationCode() {
  // Crear referencias para cada input
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);


  // Comprobar el código de verificación
  const checkVerification = async (e, number) => {
    e.preventDefault();
    const code = inputRefs.current.map((input) => input.value).join("");

    if (code.length == 4) {
      const response = await fetch("http://localhost:3001/verify-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, number: "+573017815945" }),
      });

      const data = await response.json();
      console.log(data.status);
      if (data.status == "approved") {
        setOpen(!open)
        setCheck(true)
        setTimeout(() => {
          navigate("/home");
        }, "3000");
      } else {
        setOpen(!open)
        setCheck(false)
      }
    }
  };

  // Función que maneja el cambio en el input y enfoca el siguiente
  const handleInputChange = (e, index) => {
    if (e.target.value.length === 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    } else {
      e.target.value = "";
    }
  };

  // Función que resetea los inputs al perder el foco
  const handleResetInput = (e) => {
    if (e.target.value) {
      e.target.value = "";
    }
  };

  const handleOpen = () => setOpen(!open);

  return (
    <div className="flex flex-col justify-star items-center h-full w-full p-3">
      <div className="w-full mb-14">
        <ArrowLeftIcon className=" transition-all w-[20px] h-[20px] hover:scale-125 hover:-translate-x-2" />
      </div>

      <div className="w-full mb-14">
        <h1 className="text-2xl font-bold mb-3">Phone Verification</h1>
        <p className="text-base">
          Enter the four-digit code from SMS. SMS not received{" "}
          <span>Send again?</span>
        </p>
      </div>
      <div className="grid grid-cols-4 w-full gap-x-3 mb-10">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC]"
          >
            <input
              className="w-full rounded-xl p-3 focus:outline-none text-center text-3xl font-bold"
              type="number"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)}
              onFocus={handleResetInput}
            />
          </div>
        ))}
      </div>
      <MyButton onClick={checkVerification} text={"Verify Code"}></MyButton>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className={` ${check ? "text-green-500": "text-red-400"}`}>Verification Successful</DialogHeader>
        <DialogBody className="flex justify-center">
          <img className="w-[50%] h-[50%]" src={ check ? CheckImage: WrongCheckImage } alt="Check Mark" />
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default VerificationCode;

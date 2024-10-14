import React, { useState } from "react";
import EyeOpen from "../assets/eye-svgrepo-com.svg";
import EyeClosed from "../assets/eye-closed-svgrepo-com.svg";


function PasswordInput({}) {
  const [showPassword, setShowPassword] = useState(false);

  const HandleImgPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative">
      <input
        className="w-full rounded-xl focus:outline-none p-3"
        type="text"
        placeholder="Password"
      />
      <img
        onClick={HandleImgPassword}
        className="absolute w-7 h-7 -top-0 right-0  -translate-x-2 translate-y-1/2 object-cover cursor-pointer"
        src={showPassword ? EyeOpen : EyeClosed}
        alt=""
      />
    </div>
  );
}

export default PasswordInput;

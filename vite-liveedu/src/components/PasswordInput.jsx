import React, { useState } from "react";
import EyeOpen from "../assets/eye-svgrepo-com.svg";
import EyeClosed from "../assets/eye-closed-svgrepo-com.svg";


function PasswordInput({onChange}) {
  const [showPassword, setShowPassword] = useState(false);

  const HandleImgPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="relative">
      <input
        onChange={onChange}
        className="w-full rounded-xl focus:outline-none p-3"
        type={showPassword ? "text" : "password" }
        placeholder="Password"
        required
      />
      <img
        onClick={HandleImgPassword}
        className="absolute w-8 h-6 -top-0 right-0  -translate-x-2 translate-y-1/2 object-cover cursor-pointer "
        src={showPassword ? EyeClosed :  EyeOpen}
        alt=""
      />
    </div>
  );
}

export default PasswordInput;

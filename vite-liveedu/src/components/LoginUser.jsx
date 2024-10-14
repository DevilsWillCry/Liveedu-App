import React, { useState } from "react";
import { Link } from "react-router-dom";

import MyButton from "./MyButton";
import PasswordInput from "./PassWordInput";


function LoginUser() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center mt-[20%]">
      <div className="flex flex-col text-star p-3 mr-20">
        <h1 className="font-bold text-3xl">Welcome back!</h1>
        <p className="text-base">
          Sign in to an existing account using your phone number
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full my-5 gap-y-3">
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
            type="text"
            placeholder="Phone number"
          />
        </div>
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%] mb-[60%]">
          <PasswordInput/>
        </div>
        <MyButton text={"Login"} />
      </div>
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

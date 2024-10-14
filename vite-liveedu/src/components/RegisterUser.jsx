import React from "react";
import MyButton from "./MyButton";
import { Link } from "react-router-dom";
import PasswordInput from "./PassWordInput";

function RegisterUser() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center mt-[20%]">
      <div className="flex flex-col text-star p-3 mr-20">
        <h1 className="font-bold text-2xl">Create New Account</h1>
        <p className="text-base">
          Create a new account by filling in all the filed or log in to an existing account
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full my-5 gap-y-3">
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%]">
          <input
            className="w-full rounded-xl p-3 focus:outline-none"
            type="text"
            placeholder="Phone number"
          />
        </div>
        <div className="rounded-xl p-[0.15rem] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%] mb-[20%]">
            <PasswordInput/>
        </div>
        <MyButton text={"Create"} />
      </div>
      <div>
        <p className="text-center text-sm">
          Already have an account? <span  className='text-blue-400'><Link to="/login">Sign in</Link> </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterUser;

import React, { useEffect, useState } from "react";

import Coin from "../assets/coin-svgrepo-com.svg";
import Bell from "../assets/bell-svgrepo-com.svg";

function FooterName({ text }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUser(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);



  return (
    <div className="flex flex-row justify-center items-center h-[20%] w-full bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] rounded-bl-3xl rounded-br-3xl p-3">
      <div className="flex flex-col text-start items-start w-full ">
        <h1 className="text-center font-bold text-[#4B4B4B] text-xl">
          Hi, {user.name}
        </h1>
        <p className="text-start text-sm text-[#4B4B4B] ">
          {text}
        </p>
      </div>
      <div className="flex flex-row flex-shrink-1 w-[50%] h-auto items-center justify-center text-center gap-x-5">
        <div className="flex flex-row max-w-auto max-h-[30%]">
          <img className="w-[20px] h-[25px]" src={Coin} alt="" />
          <span className="text-base font-bold">{user.coins}</span>
        </div>
        <div className="flex flex-row max-w-auto max-h-[30%]">
          <img className="w-[20px] h-[25px]" src={Bell} alt="" />
          <span className="text-base font-bold">5</span>
        </div>
      </div>
    </div>
  );
}


export default FooterName;

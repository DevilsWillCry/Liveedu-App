import React from "react";

function MyButton({onClick,text }) {
  return (
    <button
      onClick={onClick ? onClick : undefined}
      className= "right-arrow bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] w-[95%] p-2 rounded-2xl transform-gpu transition-all hover:shadow-2xl hover:scale-y-105 hover:contrast-125"
    >
      {text}
    </button>
  );
}

export default MyButton;

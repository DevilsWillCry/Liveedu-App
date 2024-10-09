import React from "react";
import { ReactTyped,Typed } from "react-typed";


const textColor = "text-white";
const altTextColor = "text-myColor";



function AboutSection() {
  return (
    <div className="h-screen w-screen py-12 px-3 mt-12">
      <h1 className="text-6xl text-center font-bold">About</h1>
      <p className="text-2xl text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in enim et
        arcu aliquet mollis. Donec ut enim a sapien interdum vulputate. Donec
        auctor, justo vel dictum hendrerit, erat nisi gravida ipsum, at
        condimentum ipsum libero ut velit.
      </p>
      <button className="w-32 h-12 bg-blue-500 text-white font-bold rounded-md">
        Learn More
      </button>
    </div>
  );
}

export default AboutSection;

import React from "react";

const WaveText = (props) => {
  const text = props.text; // Texto que quieres animar

  return (
    <>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={`inline-block font-bold animate-waveAndColorChange delay-${
            index * 100
          }`}
          style={{ animationDelay: `${index * 100}ms` }} // Aplicar retraso a cada letra
        >
          {letter}
        </span>
      ))}
    </>
  );
};

export default WaveText;

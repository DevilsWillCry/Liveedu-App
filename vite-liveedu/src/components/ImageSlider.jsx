import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? images.length : prevIndex + 1
    );
  };

  useEffect(() => {
    if (currentIndex === images.length) {
      navigate("login");
    }
  }, [currentIndex]);

  const ArrayText = [
    {
      id: 0,
      title: "Explore new courses",
      description:
        "Study and watch all our new courses and there are many of them",
    },
    {
      id: 1,
      title: "See your goals",
      description:
        "Learn and learn new things every day and get rewards be on top",
    },
    {
      id: 2,
      title: "Move on the next course",
      description:
        "Don't stop at one, start learning the next and make progress.",
    }
  ];

  return (
    <div className="slider-container flex flex-col  items-center justify-between relative w-full max-w-[600px] m-auto text-center h-[90%]">
      {/* Mostrar la imagen actual */}
      <div className="slider flex flex-col items-center justify-center p-2 mt-[10%] transition-all">
        <img
          onClick={nextSlide}
          className="w-64 h-60 block mb-3 object-fill"
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
        />
        <div className="items-start text-start w-[95%] mt-[20%]">
          <h1 className="text-black text-bold text-2xl">
            {ArrayText[currentIndex]?.title}
          </h1>
          <p className="text-[#4B4B4B] text-[15px]">
            {ArrayText[currentIndex]?.description}
          </p>
        </div>
        <div className="flex flex-row gap-3 p-3 mt-[10%]">
          {ArrayText.map((item, index) => (
            <div
              key={item.id}
              className={`w-3 h-3 rounded-full bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] transition-all ${
                currentIndex === index ? "w-8" : "w-3"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Botón de navegación derecha */}
      <MyButton onClick={nextSlide} text={"Next"} />
    </div>
  );
};

export default ImageSlider;

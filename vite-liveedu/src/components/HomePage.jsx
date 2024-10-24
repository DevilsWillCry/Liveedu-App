import React, { useEffect, useState } from "react";
import Coin from "../assets/coin-svgrepo-com.svg";
import Bell from "../assets/bell-svgrepo-com.svg";

import Course from "./Course";

import { Spinner } from "@material-tailwind/react";

import { coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";

import { Link } from 'react-router-dom';
function HomePage() {
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUser(JSON.parse(localStorage.getItem("userData")));
    }
    coursesData();
  }, []);

  const coursesData = async () => {
    try {
      const courses = await getCourses(coursesURL);
      setCourses(courses);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full items-center">
      <div className="flex flex-row justify-center items-center h-[20%] w-full bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] rounded-bl-3xl rounded-br-3xl p-3">
        <div className="flex flex-col text-start items-start w-full ">
          <h1 className="text-center font-bold text-[#4B4B4B] text-xl">
            Hi, {user.name}
          </h1>
          <p className="text-center text-base text-[#4B4B4B] ">
            Let's start learning!
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
      <div className="p-3">
        <h1>Courses</h1>
        <div className="flex justify-evenly flex-shrink-0 w-full h-auto overflow-x-auto p-3 gap-5 snap-x snap-mandatory">
          {courses.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`}>
            <Course
              rating={course.rating}
              image={course.image}
              title={course.name}
              description={course.description}
              price={course.price}
            />
            </Link>
          ))}
        </div>
        <h1>Topics for Study</h1>
        <div></div>
      </div>
    </div>
  );
}

export default HomePage;

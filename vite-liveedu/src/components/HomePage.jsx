import React, { useEffect, useState } from "react";

import Course from "./Course";

import { Spinner } from "@material-tailwind/react";

import { coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";

import { Link } from "react-router-dom";
import FooterName from "./FooterName";

import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
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
    <div className="bg-white w-full h-full items-center overflow-y-auto scroll-auto mb-10">
      <FooterName text={"Let's start learning"} />
      <div className="p-3">
        <h1>Courses</h1>
        <div className="flex justify-evenly flex-shrink-0 w-full h-auto overflow-x-auto p-3 gap-5 snap-x snap-mandatory">
          {courses.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`}>
              <Course
                isPurchased={user.purchasedCourses.some(courses => courses.id === course.id)}
                rating={course.rating}
                image={course.image}
                title={course.name}
                description={course.description}
                price={course.price}
              />
            </Link>
          ))}
        </div>
        <h1 className="p-1 mt-3">Topics for Study</h1>
        <div className="flex flex-col p-1 gap-y-3">
          {courses.map((course) => (
            user.purchasedCourses.some(courses => courses.id === course.id) ? 
            <Link key={course.id} to={`/course/${course.id}`}>
            <div className="relative flex flex-row  justify-between  w-full p-2 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] rounded-xl items-center">
              <h2 className="text-[#4B4B4B] font-bold">{course.name}</h2>
              <ChevronDoubleRightIcon className="w-[30px] h-[30px] animate-bounce-horizontal" />
            </div>
            </Link>:
              ("")
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Coin from "../assets/coin-svgrepo-com.svg";

import { coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";

import { Spinner } from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import MyButton from "./MyButton";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(null);

  const coursesData = async () => {
    try {
      const courses = await getCourses(coursesURL);
      setLoading(false);
      return courses;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    const courseData = coursesData().then((courses) => {
      const courseFound = courses.find((c) => c.id === id);
      setCourse(courseFound);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  function backToPage (){
    navigate("/home");
  }

  return (
    <div className="flex flex-col w-full h-full items-center mb-2">
        <div className="w-full px-3 mt-2">
          <ArrowLeftIcon onClick={backToPage} className="transition-all w-[20px] h-[20px] hover:scale-125 hover:-translate-x-2" />
        </div>
      <div className="flex flex-col justify-center items-start p-3 w-full">
        <img
          className="w-full max-sm:h-[200px] sm:h-[100px] object-cover rounded-2xl mb-3"
          src={course.image}
          alt={course.image}
        />
        <div className="flex flex-row justify-between w-full gap-5">
          <div className="text-[#4B4B4B]">
            <h1 className="text-2xl font-bold">{course.name}</h1>
            <p className="text-xs">{course.description}</p>
          </div>
          <div className="flex flex-row p-3 gap-x-3">
            <img className="w-[20px] h-[25px]" src={Coin} alt="" />
            <span className="font-bold">{course.price}</span>
          </div>
        </div>
      </div>
      {/* TODO: Implement Course Content */}
      <div className="overflow-auto scroll-auto w-full h-full">
        {course.AllCourses.map((courses, index) => (
          <div className="p-1 mr-3 ml-2" key={index}>
            <Link key={course.id} to={`/course/${course.id}/theme/${courses.id}`}>
            <h1 className="w-full bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] opacity-90  saturate-[0.7] rounded-lg p-2">
                {courses.title + " " + course.level} 
            </h1>
            </Link>
          </div>
        ))}
      </div>
      <MyButton text={"Buy Now"} />
    </div>
  );
}


export default CourseDetail;

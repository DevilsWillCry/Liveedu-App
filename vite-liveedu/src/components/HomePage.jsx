import React, { useEffect, useState } from "react";

import Course from "./Course";

import { CheckIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";

import { coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";

import { Link } from "react-router-dom";
import FooterName from "./FooterName";
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
        <h1>Topics for Study</h1>
        <div></div>
      </div>
    </div>
  );
}

export default HomePage;

import React, { useEffect, useState } from "react";
import FooterName from "./FooterName";
import { coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";
import { Button, Spinner } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

function TestsCourses() {
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null); // Estado para el ID expandido

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
    <div className="flex flex-col w-full h-full">
      <FooterName text={"Let's take on topic"} />
      <h1 className="text-[#4B4B4B] p-2 border-b-2 text-base font-bold">
        Topics quizzes
      </h1>
      <div className="flex flex-col gap-5 p-3">
        {user.purchasedCourses && user.purchasedCourses.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't purchased any course yet.
          </p>
        ) : (
          courses.map((course) => (
            <div className="text-center" key={course.id}>
              <h1 className="font-bold text-[#4B4B4B] mb-3">{course.name} Quizzes</h1>
              {user.purchasedCourses.some(
                (purchased) => purchased.id === course.id
              ) &&
                course.AllCourses.map((theme) => (
                  <Menu
                    open={expanded == `${course.id}-${theme.id}`}
                    handler={() =>
                      setExpanded(
                        expanded == `${course.id}-${theme.id}`
                          ? null
                          : `${course.id}-${theme.id}`
                      )
                    }
                    offset={15}
                    key={course.id / theme.id}
                  >
                    <MenuHandler>
                      <div className="flex flex-row items-center justify-center text-center bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] p-1 rounded-xl shadow-lg mb-5 text-[#4B4B4B] transition-all">
                        <h1 className="w-full">
                          {theme.title} {course.level}
                        </h1>
                        {expanded == `${course.id}-${theme.id}` ? (
                          <ChevronDownIcon className="w-[30px] h-[30px] rotate-180 transition-all" />
                        ) : (
                          <ChevronDownIcon className="w-[30px] h-[30px] transition-all" />
                        )}
                      </div>
                    </MenuHandler>
                    <MenuList className="relative flex flex-col items-center max-h-[300px] overflow-y-auto p-0">
                      <div className="relative">
                        <ChevronDownIcon className="absolute top-0 left-[60%] w-[30px] h-[30px] transition-all animate-bounce" />
                        <h1 className="text-center border-b-2 text-base font-bold">
                          Summary
                        </h1>
                        {expanded == `${course.id}-${theme.id}` &&
                          theme.themes.map((topic, index) => (
                            <MenuItem className="border-b-2" key={index}>
                              <span className="font-bold">
                                Lesson {index + 1}
                              </span>
                              : {topic.name}
                            </MenuItem>
                          ))}
                      </div>
                      <MenuItem className="sticky bottom-0 bg-white">
                        <Link to={`/quiz/${course.id}/theme/${theme.id}`}>
                          <Button className="bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] text-[#4B4B4B] w-full z-30">
                            Start Quiz!
                          </Button>
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TestsCourses;

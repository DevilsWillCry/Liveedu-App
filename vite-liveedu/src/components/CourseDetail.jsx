import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Coin from "../assets/coin-svgrepo-com.svg";

import { usersURL, coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";
import patchUsers from "../services/users/patchUsers";
import getUsers from "../services/users/getUsers";

import { Spinner } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/solid";

import MyButton from "./MyButton";

function CourseDetail() {
  const { id } = useParams();
  
  const navigate = useNavigate(null);


  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState({});
  const [course, setCourse] = useState(null);
  const [isChangedAccount, setisChangedAccount] = useState(false);
  const [dataToChange, setdataToChange] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUser(JSON.parse(localStorage.getItem("userData")));
    }

    const updateUser = async () => {
      if (isChangedAccount) {
        console.log("YEAAAH");
        await patchUsers(`${usersURL}/${user.id}`, dataToChange);
        setisChangedAccount(false);
      }
    };
    updateUser();
  }, [isChangedAccount]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [users, courses] = await Promise.all([
          getUsers(usersURL),
          getCourses(coursesURL),
        ]);

        setAllUsers(users);
        const courseFound = courses.find((c) => c.id === id);        
        setCourse(courseFound);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isChangedAccount, usersURL, coursesURL]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  function backToPage() {
    navigate("/home");
  }

  function handlePurchasedCourse() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (user.coins >= course.price) {
      Swal.fire({
        title: `<h1 style='font-size: 1.5rem;'> Are you want to purchased course ${course.name}? :D </h1> `,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#bfc3fc",
        cancelButtonColor: "#ef5350",
        confirmButtonText: "<span style='color: #4b4b4b;'>Yes, I want it!</span>",
        cancelButtonText: "<span style='color: #4b4b4b;'>No, cancel</span>",
      }).then((result) => {
        if (result.isConfirmed) {
          const updateCoins = user.coins - course.price;
          const updatePurchasedCourses = {
            id,
            title: course.name,
            price: 350,
            purchasedAt: formattedDate,
          };

          const updatedUser = {
            ...user,
            coins: updateCoins,
            purchasedCourses: [
              ...user.purchasedCourses,
              updatePurchasedCourses,
            ],
            purchasedAt: formattedDate,
          };

          localStorage.setItem("userData", JSON.stringify(updatedUser));
          setdataToChange({
            coins: updateCoins,
            purchasedCourses: [
              ...user.purchasedCourses,
              updatePurchasedCourses,
            ],
          });
          setisChangedAccount(true);
          Swal.fire({
            icon: "success",
            title: "Purchase successful!",
            showConfirmButton: false,
            timer: 1500
          }
          );
          setTimeout(() => {
            navigate("/home");
          })
        }
      });
    } else {
      Swal.fire(
        "Purchase failed!",
        "You don't have founds, buy more coins!",
        "warning"
      );
    }
  }

  return (
    <div className="flex flex-col w-full h-full items-center mb-2">
      <div className="w-full px-3 mt-2">
        <ArrowLeftIcon
          onClick={backToPage}
          className="transition-all w-[20px] h-[20px] hover:scale-125 hover:-translate-x-2"
        />
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
          {user.purchasedCourses.some((courses) => courses.id === id) ? (
            <div className="flex flex-row gap-x-3 items-start w-[30px] h-[30px] bg-green-400 rounded-full p-1 mr-2">
              <CheckIcon />
            </div>
          ) : (
            <div className="flex flex-row gap-x-3 items-start mr-1">
              <img className="w-[20px] h-[25px]" src={Coin} alt="" />
              <span className="font-bold">{course.price}</span>
            </div>
          )}
        </div>
      </div>
      {/* TODO: Implement Course Content */}
      <div className="overflow-auto scroll-auto w-full h-full">
        {course.AllCourses.map((courses, index) => (
          <div className="p-1 mr-3 ml-2" key={index}>
            <Link
              key={course.id}
              to={`/course/${course.id}/theme/${courses.id}`}
            >
              <h1 className="w-full bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] opacity-90  saturate-[0.7] rounded-lg p-2">
                {courses.title + " " + course.level}
              </h1>
            </Link>
          </div>
        ))}
      </div>
      {user.purchasedCourses.some((courses) => courses.id === id) ? null : (
        <MyButton onClick={handlePurchasedCourse} text={"Buy Now"} />
      )}
    </div>
  );
}

export default CourseDetail;

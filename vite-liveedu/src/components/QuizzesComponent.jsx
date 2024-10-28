import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";

import { usersURL } from "../services/routes";
import patchUsers from "../services/users/patchUsers";

import { Spinner } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";

import LetterA from "../assets/letter-uppercase-a-svgrepo-com.svg";
import LetterB from "../assets/letter-uppercase-b-svgrepo-com.svg";
import LetterC from "../assets/letter-uppercase-c-svgrepo-com.svg";
import LetterD from "../assets/letter-uppercase-d-svgrepo-com.svg";

import Coin from "../assets/coin-svgrepo-com.svg";

import ThreeStartImage from "../assets/ThreeStartsImage.png";
import TwoStartImage from "../assets/TwoStartsImage.png";
import OneStartImage from "../assets/OneStartImage.png";

import MyButton from "./MyButton";
import { img } from "framer-motion/client";

function QuizzesComponent() {
  const { id, themeId } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [course, setCourse] = useState(null);
  const [QuizzesTheme, setQuizzes] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [dataToChange, setdataToChange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const Letters = [LetterA, LetterB, LetterC, LetterD];

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
    if (localStorage.getItem("userData")) {
      setUser(JSON.parse(localStorage.getItem("userData")));
    }
    coursesData().then((courses) => {
      const courseFound = courses.find((c) => c.id === id);
      setCourse(courseFound);
      if (courseFound) {
        const quizTheme = courseFound.AllCourses.find(
          (q) => q.id === themeId
        ).quizzes;
        setQuizzes(quizTheme);
      }
    });
  }, []);

  useEffect(() => {
    const updateUser = async () => {
      if (isQuizFinished) {
        const coins = user.coins + Math.round(score * 1.5);
        const newUserData = { ...user, coins };
        await patchUsers(`${usersURL}/${user.id}`, {
          coins,
        });
        localStorage.setItem("userData", JSON.stringify(newUserData));
      }
    };
    updateUser();
  }, [isCorrect, score]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      return Swal.fire({
        title: "Wait buddy!",
        text: "Select any option to continue",
        icon: "warning",
        confirmButtonText: "You right",
      });
    }

    const currentQuestion = QuizzesTheme[currentQuestionIndex];
    setCorrectAnswer(currentQuestion.correctAnswer);
    setIsTransitioning(true);

    if (selectedAnswer === QuizzesTheme[currentQuestionIndex].correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
      setIsIncorrect(false);
    } else {
      setIsCorrect(false);
      setIsIncorrect(true);
    }
    setTimeout(() => {
      setIsCorrect(false);
      setIsIncorrect(false);
      if (currentQuestionIndex < QuizzesTheme.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsTransitioning(false);
      } else {
        setIsQuizFinished(true);
      }
    }, 2000);
  };

  if (isQuizFinished) {
    let displayImage;
    let message;
    if (score >= 1 && score <= 5) {
      displayImage = OneStartImage;
      message = "Just one star! Keep practicing to improve.";
    } else if (score > 5 && score <= 8) {
      displayImage = TwoStartImage;
      message = (
        <div className="flex flex-row items-center gap-x-1 animate-autoShow">
          <span>
            {" "}
            Well done! Two stars!, You've earned{" "}
            <span className="animate-bounce inline-block">
              +{Math.round(score * 1.5)}
            </span>
          </span>
          <img src={Coin} alt="Success" className="w-5 h-5 animate-bounce" />
        </div>
      );
    } else if (score > 8) {
      displayImage = ThreeStartImage;
      message = (
        <div className="flex flex-row items-center gap-x-1 animate-autoShow bg-red-400">
          <span>
            {" "}
            Excellent! Three stars!, You've earned{" "}
            <span className="animate-bounce inline-block">
              +{Math.round(score * 1.5)}
            </span>
            <img
              src={Coin}
              alt="Success"
              className=" w-5 h-5 animate-bounce bg-blue-400 inline-block"
            />
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 w-screen">
        <ArrowLeftIcon
          className="absolute top-0 left-2 transition-all w-[25px] h-[25px] hover:scale-125 hover:-translate-x-2 animate-wiggle"
          onClick={() => navigate("/tests")}
        />
        <motion.img
          src={displayImage}
          alt="Quiz Result"
          className="w-screen h-48 object-contain drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Quiz Finished!
        </motion.h1>
        <motion.h2
          className="text-2xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your score: {score}/{QuizzesTheme.length}
        </motion.h2>
        <motion.p
          className="text-lg mb-4 italic text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {message} {/* Mensaje adicional basado en el puntaje */}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ArrowLeftIcon
        className="absolute top-0 left-0 transition-all w-[25px] h-[25px] hover:scale-125 hover:-translate-x-2"
        onClick={() => navigate("/tests")}
      />
      <h1>Quizzes for {course?.name}</h1>
      {/* Render quiz components here */}
      {QuizzesTheme.length > 0 ? (
        <div
          className="flex flex-col justify-center w-full p-5"
          key={QuizzesTheme[currentQuestionIndex].id}
        >
          <h2 className="max-sm:text-[5vw] font-bold">
            {QuizzesTheme[currentQuestionIndex].question}
          </h2>
          <ul>
            {QuizzesTheme[currentQuestionIndex].options.map((option, index) => (
              <li className="py-3" key={option.id}>
                <button
                  className="flex flex-row gap-x-1"
                  onClick={() => setSelectedAnswer(option.id)}
                  disabled={isTransitioning}
                >
                  <img
                    className={`max-w-full h-[35px] max-sm:h-[10vw] rounded-sm 
                    ${
                      isCorrect && selectedAnswer === option.id
                        ? "bg-green-200"
                        : isIncorrect && selectedAnswer === option.id
                        ? "bg-red-400"
                        : isIncorrect && correctAnswer === option.id
                        ? "bg-green-200"
                        : selectedAnswer === option.id
                        ? "bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC]"
                        : ""
                    }
                    `}
                    src={Letters[index]}
                    alt={Letters}
                  />
                  <span
                    className={`flex flex-col h-[35px] max-sm:h-[11vw] justify-center items-center text-start rounded-xl p-2 
                    ${
                      isCorrect && selectedAnswer === option.id
                        ? "transition-all animate-bounce"
                        : isIncorrect === true && selectedAnswer === option.id
                        ? "transition-all animate-wiggle"
                        : ""
                    }
                      `}
                  >
                    {option.answer}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <MyButton text={"Next"} onClick={handleNextQuestion} />
          </div>
        </div>
      ) : (
        <p>No quizzes found for this theme.</p>
      )}
    </div>
  );
}

export default QuizzesComponent;

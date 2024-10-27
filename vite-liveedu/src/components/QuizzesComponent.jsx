import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";

import { Spinner } from "@material-tailwind/react";
import Swal from 'sweetalert2'
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

import LetterA from "../assets/letter-uppercase-a-svgrepo-com.svg";
import LetterB from "../assets/letter-uppercase-b-svgrepo-com.svg";
import LetterC from "../assets/letter-uppercase-c-svgrepo-com.svg";
import LetterD from "../assets/letter-uppercase-d-svgrepo-com.svg";

import MyButton from "./MyButton";

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
  const [correctAnswer, setCorrectAnswer] = useState(null); // Nuevo estado para la respuesta
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const Letters = [LetterA, LetterB, LetterC, LetterD];

  // Fetch quiz data from API based on id and theme
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const handleNextQuestion = () => {

    if (selectedAnswer === null) {
      return (Swal.fire({
        title: 'Wait buddy!',
        text: 'Select any option to continue',
        icon: 'warning',
        confirmButtonText: 'You right'
      })
    ); // Si no hay respuesta seleccionada, no avanza a la siguiente pregunta
    }

    const currentQuestion = QuizzesTheme[currentQuestionIndex];
    setCorrectAnswer(currentQuestion.correctAnswer);
    setIsTransitioning(true)

    if (selectedAnswer === QuizzesTheme[currentQuestionIndex].correctAnswer) {
      setIsCorrect(true);
      setIsIncorrect(false);
    } else {
      setIsCorrect(false);
      setIsIncorrect(true);
    }
    setTimeout(() => {
      setIsCorrect(false);
      setIsIncorrect(false);
      if (currentQuestionIndex < QuizzesTheme.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Reinicia la respuesta seleccionada
        setSelectedAnswer(null); // Reinicia la respuesta seleccionada
        setIsTransitioning(false)

      } else {
        alert("You've completed the quiz!");
        setIsQuizFinished(true);
      }
    }, 2000);
    // Avanza a la siguiente pregunta si no es la última
  };

  if (isQuizFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Quiz finished!</h1>
        <h2>Your score: {score}/{QuizzesTheme.length}</h2>
        <MyButton text="Back to Home" onClick={() => navigate("/home")} />
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

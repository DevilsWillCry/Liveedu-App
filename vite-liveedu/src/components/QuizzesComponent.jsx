import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";

import { Spinner } from "@material-tailwind/react";
import { list } from "postcss";

import LetterA from "../assets/letter-uppercase-a-svgrepo-com.svg";
import LetterB from "../assets/letter-uppercase-b-svgrepo-com.svg";
import LetterC from "../assets/letter-uppercase-c-svgrepo-com.svg";
import LetterD from "../assets/letter-uppercase-d-svgrepo-com.svg";
import MyButton from "./MyButton";

function QuizzesComponent() {
  const { id, themeId } = useParams();
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

  console.log("id: ", id, " theme: ", themeId);

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
    const currentQuestion = QuizzesTheme[currentQuestionIndex];
    setCorrectAnswer(currentQuestion.correctAnswer);

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
      } else {
        alert("You've completed the quiz!");
      }
    }, 2000);
    // Avanza a la siguiente pregunta si no es la última
  };


  console.log(
    "Correct Answer! ",
    isCorrect,
    "Incorrect Answer :c ",
    isIncorrect
  );
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
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

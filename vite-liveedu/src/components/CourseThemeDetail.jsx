import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { coursesURL } from "../services/routes";
import getCourses from "../services/courses/getCourses";

import { Spinner } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import {
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";

function CourseThemeDetail() {
  const { id, themeId } = useParams();
  const navigate = useNavigate();

  const [themes, setThemes] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [openIndex, setOpenIndex] = useState(null); // Estado para almacenar el índice del diálogo abierto

  const handleOpen = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Cerrar el diálogo si se hace clic en el mismo
    } else {
      setOpenIndex(index); // Abrir el diálogo con el índice actual
    }
  };

  const fetchTheme = async () => {
    try {
      const course = await getCourses(coursesURL + "/" + id);
      setLoading(false);
      return course;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheme().then((courses) => {
      const course = courses.AllCourses.find((t) => t.id === themeId);
      setImage(course.image);
      setThemes(course.themes);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  function backToPage() {
    navigate(`/course/${id}`);
  }

  return (
    <div className="w-full overflow-auto scroll-auto h-full p-5 animate-bottom-fade">
      <div className="w-auto fixed top-0 left-0 bg-white rounded-2xl p-2">
        <ArrowLeftIcon
          onClick={backToPage}
          className="transition-all w-[20px] h-[20px] hover:scale-125 hover:-translate-x-2"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-start mb-12 mt-5">
        {themes.map((theme, index) => (
          <div
            className="w-full flex flex-row justify-between items-center text-[#4B4B4B] bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] p-3 mb-3 rounded-xl shadow-2xl"
            key={index}
          >
            <div className="w-full flex flex-row items-center justify-start gap-x-2">
              <img
                className="w-[30px] h-[30px] object-contain"
                src={image}
                alt={image}
              />
              <div>
                <h1 className="text-sm font-bold">Lesson {index + 1}</h1>
                <p className="text-xs">{theme.name}</p>
              </div>
            </div>
            <div
              className={`flex flex-col font-extrabold  w-10 h-9 justify-center items-center p-2 ml-2 ${
                id == 1 ? "bg-blue-300" : "bg-red-200"
              }  rounded-full`}
            >
              <PlayIcon
                onClick={() => handleOpen(index)}
                variant="gradient"
                className="w-[15px] h-[15px]"
              />
              <Dialog
                open={openIndex === index}
                handler={() => handleOpen(index)}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0.9, y: -100 },
                }}
              >
                <DialogHeader className="text-[#4B4B4B] font-bold ">
                  {theme.name}
                </DialogHeader>
                <DialogBody className="text-[#4B4B4B]">
                  {theme.description}
                </DialogBody>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseThemeDetail;

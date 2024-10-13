import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";

import { HomeIcon } from "@heroicons/react/24/outline";

const ArrayExperienceElements = [
  {
    id: 1,
    title:
      "Desarrollo de Software para el Seguimiento de Asesorías de Ejercicio",
    date: "Febrero 2024 - Agosto 2024",
    description:
      "Desarrollé una aplicación de escritorio para un cliente, con el fin de gestionar y realizar un seguimiento efectivo de las asesorías de ejercicio utilizando Python, empleando la API de Google Sheets para la gestión y almacenamiento de datos.",
  },
  {
    id: 2,
    title: "Aplicación para el Filtrado y Visualización de Señales de Audio",
    date: "Julio 2023- Diciembre 2023",
    description:
      "Desarrollé este software para un cliente el cual le permite la grabación, procesamiento y análisis de señales de audio mediante técnicas avanzadas de filtrado digital. Desarrollado en Python utilizando PyQt5 para la interfaz gráfica, el software incorpora funciones para aplicar filtros pasa-altas, pasa-bajas, pasa-bandas y rechaza-bandas a las señales de audio. Además, incluye herramientas para visualizar tanto la señal original como las versiones filtradas y sus representaciones en el dominio de la frecuencia, facilitando así el análisis detallado de la información acústica. La aplicación es adecuada para investigadores y técnicos que necesitan procesar y analizar señales de audio con precisión.",
  },
  {
    id: 3,
    title: "Mantenimiento, Bodega y administración",
    date: "ebrero 2019 - Marzo 2020",
    description:
      "Realicé mantenimiento preventivo para las máquinas de las tres plantas, asegurando un rendimiento óptimo y reduciendo el tiempo de inactividad no planificado. Utilicé software de gestión de mantenimiento computarizado (CMMS) para programar y realizar un seguimiento de las tareas de mantenimiento. Desarrollé e implementé procedimientos para la gestión y organización de la documentación administrativa relacionada con el mantenimiento. Utilicé herramientas digitales para optimizar el almacenamiento y la recuperación de información, mejorando la eficiencia y asegurando el cumplimiento de los estándares de la empresa.",
  },
];

const ArrayStudieElements = [
  {
    id: 1,
    title: "Ingeniería Electrónica",
    institution: "Universidad Santiago de Cali",
    date: "Febrero 2020 - Actual",
    description:
      "Pregrado en Ingeniería Electrónica, Actualmente estudiando decimó semestre en la Universidad Santiago de Cali",
  },
  {
    id: 2,
    title:
      "Certificación de Bases de Datos Generalidades y Sistemas de Gestión",
    institution: "Servicio Nacional de Aprendizaje (SENA).",
    date: "Junio 2024 - Julio 2024",
    description:
      "Obtuve una certificación en Bases de Datos a través de un curso impartido por el SENA, donde adquirí conocimientos fundamentales sobre las bases de datos y su gestión, incluyendo conceptos clave, diseño de bases de datos, y el uso de sistemas de gestión de bases de datos (DBMS).",
  },
  {
    id: 3,
    title: "Certificación en Python Básico",
    institution: "HackerRank.",
    date: "Enero 2024 - Febrero 2024",
    description:
      "Obtuve una certificación en Python básico a través de HackerRank, donde desarrollé habilidades fundamentales en programación utilizando Python. Durante el curso, aprendí conceptos esenciales como estructuras de control de flujo, manipulación de datos, funciones y manejo de errores. Esta certificación valida mi capacidad para escribir scripts y desarrollar soluciones básicas usando Python.",
  },
  {
    id: 4,
    title: "Certificación en Metodología de la Programación de Sistemas Informáticos",
    institution: "Servicio Nacional de Aprendizaje (SENA).",
    date: "Julio 2023 - Agosto 2023",
    description:
      "Obtuve una certificación en Metodología de la Programación de Sistemas Informáticos a través de un curso impartido por el SENA, donde aprendí principios fundamentales de programación, diseño de algoritmos y estructuración de sistemas informáticos eficientes.",
  },
  {
    id: 5,
    title: "Certificación en Fundamentals of Accelerated Data Science",
    institution: "NVIDIA.",
    date: "8 de enero de 2022 - 18 de febrero de 2022",
    description:
      "Obtuve una certificación de NVIDIA en \"Fundamentals of Accelerated Data Science\", donde adquirí conocimientos sobre técnicas avanzadas de ciencia de datos utilizando aceleración por GPU, incluyendo procesamiento de datos, análisis y modelado con herramientas de aprendizaje automático.",
  },
  {
    id: 6,
    title: "Tecnología en Automatización Industrial",
    institution: "Servicio Nacional de Aprendizaje (SENA).",
    date: "Julio 2017 - Enero 2019",
    description:
      "Realicé una Tecnología en Automatización Industrial en el Servicio Nacional de Aprendizaje Centro de Electricidad y Automatización Industrial.",
  },
];

function ExpStudSection() {
  return (
    <div className="grid grid-cols-2 gap-x-24 mt-20">
      <div className="w-[32rem] mx-20">
        <Typography variant="h1" className="mb-5 animate-slide-in-blurred-top">
            Experiencia
        </Typography>
        <Timeline>
          {ArrayExperienceElements.map((element) => (
            <TimelineItem key={element.id}>
              <TimelineConnector className="h-3" />
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none text-myColor hover:scale-125 transition-all transform-gpu hover:bg-white hover:rounded-2xl hover:shadow-2xl hover:p-3 z-10 mt-3 mb-3" 
                >
                  {element.title}
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography variant="small" className="font-bold">
                  {element.date}
                </Typography>
                <Typography className="hover:scale-125 transition-all transform-gpu hover:bg-white hover:rounded-2xl hover:shadow-2xl hover:p-3 z-40 mt-3 mb-3">{element.description}</Typography>
              </TimelineBody>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <div className="w-[32rem] mx-20">
        <Typography variant="h1" className="mb-5 animate-slide-in-blurred-top">
            Estudios
        </Typography>
        <Timeline>
          {ArrayStudieElements.map((element) => (
            <TimelineItem key={element.id}>
              <TimelineConnector className="h-3" />
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none text-myColor hover:scale-125 transition-all transform-gpu hover:bg-white hover:rounded-2xl hover:shadow-2xl hover:p-3 z-30 mt-3 mb-3"
                >
                  {element.title}
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography variant="small" className="font-bold">
                  {element.date}
                </Typography>
                <Typography className="hover:scale-125 transition-all transform-gpu hover:bg-white hover:rounded-2xl hover:shadow-2xl hover:p-3 z-40 mt-3 mb-3">{element.description}</Typography>
              </TimelineBody>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}

export default ExpStudSection;

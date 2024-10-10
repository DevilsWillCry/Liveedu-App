import React from "react";
import { ReactTyped, Typed } from "react-typed";

const textColor = "text-white";
const altTextColor = "text-myColor";

function AboutSection() {
  return (
    <div className="h-screen w-screen py-12 px-3 mt-12">
      <h1 className="text-6xl text-center font-bold">Sobre Mí</h1>
      <p className="text-2xl text-center">
        <strong>¡Hola!</strong> Soy <strong>Miguel Ángel</strong>, estudiante de
        Ingeniería Electrónica en decimo semestre y apasionado por la
        programación web. Cuento con experiencia en <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, y
        tecnologías avanzadas como
        <strong> React</strong>, <strong>Redux</strong> y{" "}
        <strong>JSON-SERVER</strong>. Me encanta desarrollar interfaces
        dinámicas y optimizadas, creando experiencias de usuario atractivas y
        funcionales. Además, tengo un sólido manejo de bases de datos SQL y
        lenguajes como Python y Java, lo que me permite trabajar en proyectos de
        desarrollo full-stack, integrando eficientemente la lógica de servidor
        con el frontend. Mi enfoque es crear soluciones escalables y eficientes,
        utilizando frameworks y tecnologías modernas para optimizar el
        rendimiento y la gestión de datos. Soy una persona curiosa y siempre en
        busca de mejorar mis habilidades a través de nuevos retos, cursos en
        línea y colaboraciones. Me motiva seguir aprendiendo sobre las últimas
        tendencias en tecnología y programación, y estoy listo para contribuir
        en proyectos innovadores.
      </p>
    </div>
  );
}

export default AboutSection;

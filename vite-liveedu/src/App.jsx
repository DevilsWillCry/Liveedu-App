import { Routes, Route, Outlet, Link } from "react-router-dom";
import React from "react";
import ImageSlider from "./components/ImageSlider";

import Slider1 from "./assets/slider-1.png";
import Slider2 from "./assets/slider-2.png";
import Slider3 from "./assets/slider-3.png";

import LoginUser from "./components/LoginUser";
import RegisterUser from "./components/RegisterUser";
import VerificationCode from "./components/VerificationCode";
import HomePage from "./components/HomePage";
import NavbarLayout from "./components/NavBar";
import TestsCourses from "./components/TestsCourses";
import Profile from "./components/Profile";
import Stadistics from "./components/Stadistics";


function App() {
  const images = [Slider1, Slider2, Slider3];


  return (
    <main className="flex flex-col h-screen items-center justify-center font-Inter">
      <Routes>
        <Route path="/" element={<ImageSlider images={images} />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/verification-account" element={<VerificationCode />} />
        <Route element={<NavbarLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/tests" element={<TestsCourses />} />
          <Route path="/stadistics" element={<Stadistics />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </main>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
export default App;

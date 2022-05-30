import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Box} from "@mui/material";

import Home from "./pages/Home";
import MainNavBar from "./components/MainNavBar";
import CoursesPage from "./pages/CoursesPage";
import AboutUsPage from "./pages/AboutUsPage";
import Footer from "./components/Footer";

const MainPages = () => {
  return (
    <>
      <MainNavBar/>
      <Box>
        <Routes>
          <Route path='/about' exact element={<AboutUsPage/>}/>
          <Route path='/courses' exact element={<CoursesPage/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Box>
      <Footer/>
    </>
  );
};

export default MainPages;
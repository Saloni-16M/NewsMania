import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HeadlinesShow from "./components/smallcomponents/HeadlinesShow";
import Notes from "./components/Notes";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Navbar from "./components/smallcomponents/Navbar";
const App = () => {
  //  Directly check localStorage for token on initial load
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (<>
    <Navbar></Navbar>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={isLoggedIn ? <Notes /> : <Navigate to="/login" />} />
        <Route path="/newspaper/:id" element={<HeadlinesShow />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;

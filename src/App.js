import React , {useEffect } from 'react';
import './App.css'
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from "../src/components/neha/Home";
import Login from './components/Login';
import Register from './components/Register';
import Result_M from './components/mayank/Result_M';
import Congrats from './components/Congrats.js';

import Instructions from './components/Instructions';
import Quiz from './components/Quiz';

import Analytics from "./components/Admin/Analytics";
import AdminQuestions from "./components/Admin/AdminQuestions";
import AdminUsers from "./components/Admin/AdminUsers";

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        {/* <Navbar2 /> */}
        <Toaster toastOptions={{ duration: 4000 }} />
        <Routes>
        {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/test/instructions" element={<Instructions/>} />
          <Route path="/test/start" element={<Quiz/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/test/result" element={<Result_M/>} />
          <Route path="/test/submit" element={<Congrats/>} />

          {/* Admin */}
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/questions" element={<AdminQuestions />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

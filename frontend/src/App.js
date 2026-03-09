import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadScan from "./pages/UploadScan";
import About from "./pages/About";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/upload" element={<UploadScan />} />

        <Route path="/about" element={<About />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
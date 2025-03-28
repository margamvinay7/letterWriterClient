import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import LetterEditor from "./pages/LetterEditor";
import Letters from "./pages/Letters";
import Navbar from "./components/Navbar";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  console.log("env", import.meta.env.VITE_FIREBASE);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/letter"
          element={
            <ProtectedRoute>
              <LetterEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Letters />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

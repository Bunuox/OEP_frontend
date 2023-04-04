import React from "react";
import { useStudentAuth } from "../context/AuthStudentContext";
import { Navigate } from "react-router-dom";

function StudentPrivateRoute({ children }) {
  //If student is logged in redirect to student pages
  //If not, redirect to login screen

  const { user } = useStudentAuth();

  if (!user) {
    return <Navigate to="login" />;
  }
  return children;
}

export default StudentPrivateRoute;

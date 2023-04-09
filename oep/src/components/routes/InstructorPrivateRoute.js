import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { InstructorContext } from "../context/AuthContext";

function InstructorPrivateRoute({ children }) {
  //If instructor is logged in redirect to instructor pages
  //If not, redirect to login screen

  const { instructor } = useContext(InstructorContext);

  if (!instructor) {
    return <Navigate to="login" />;
  }
  return children;
}

export default InstructorPrivateRoute;

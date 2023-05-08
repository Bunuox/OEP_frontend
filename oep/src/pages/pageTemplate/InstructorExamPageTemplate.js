import React from "react";
import { Outlet } from "react-router-dom";

function InstructorExamPageTemplate({ children }) {
  return (
    <>
      <Outlet />
    </>
  );
}

export default InstructorExamPageTemplate;

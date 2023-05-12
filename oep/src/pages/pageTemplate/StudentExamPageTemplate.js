import React from "react";
import { Outlet } from "react-router-dom";

function StudentExamPageTemplate({ children }) {
  return (
    <>
      <Outlet />
    </>
  );
}

export default StudentExamPageTemplate;

import React from "react";
import { Outlet } from "react-router-dom";

function InstructorResultsPageTemplate({ children }) {
  return (
    <>
      <Outlet />
    </>
  );
}

export default InstructorResultsPageTemplate;

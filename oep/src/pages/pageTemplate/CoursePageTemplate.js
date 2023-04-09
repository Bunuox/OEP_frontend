import React from "react";
import { Outlet } from "react-router-dom";

function CoursePageTemplate({ children }) {
  return <Outlet />;
}

export default CoursePageTemplate;

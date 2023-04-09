import React from "react";
import StudentPageTemplate from "../../pages/pageTemplate/StudentPageTemplate";
import StudentLoginPage from "../../pages/login/StudentLoginPage";
import RegisterPage from "../../pages/register/RegisterPage";
import Student from "../../pages/student";
import StudentMainPage from "../../pages/student/StudentMainPage";
import StudentExamsPage from "../../pages/student/StudentExamsPage";
import Page404 from "../../pages/Page404";
import StudentPrivateRoute from "./StudentPrivateRoute";
import InstructorLoginPage from "../../pages/login/InstructorLoginPage";
import InstructorPageTemplate from "../../pages/pageTemplate/InstructorPageTemplate";
import InstructorPrivateRoute from "./InstructorPrivateRoute";
import Instructor from "../../pages/instructor";

const routes = [
  {
    path: "/student/login",
    element: <StudentLoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/instructor",
    element: <InstructorPageTemplate/>,
    instructorAuth: true,
    children: [
      {
        index:true,
        element: <Instructor/>
      }
    ]
  },
  {
    path: "/student",
    element: <StudentPageTemplate />,
    auth: true,
    children: [
      {
        index: true,
        element: <Student />,
        auth: true,
      },
      {
        path: "main",
        element: <StudentMainPage />,
        auth: true,
      },
      {
        path: "exams",
        element: <StudentExamsPage />,
        auth: true,
      },
    ],
  },
  {
    path: "instructor/login",
    element: <InstructorLoginPage />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

const authMap = (routes) =>
  routes.map((route) => {
    if (route.auth) {
      route.element = (
        <StudentPrivateRoute>{route.element}</StudentPrivateRoute>
      );
    }
    if(route.instructorAuth) {
      route.element = (
        <InstructorPrivateRoute>{route.element}</InstructorPrivateRoute>
      )
    }
    if (route.children) {
      route.children = authMap(route.children);
    }
    return route;
  });

export default authMap(routes);

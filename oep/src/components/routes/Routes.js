import React from "react";
import StudentPageTemplate from "../../pages/pageTemplate/StudentPageTemplate";
import LoginPage from "../../pages/login/LoginPage";
import RegisterPage from "../../pages/register/RegisterPage";
import Student from "../../pages/student";
import StudentMainPage from "../../pages/student/StudentMainPage";
import StudentExamsPage from "../../pages/student/StudentExamsPage";
import Page404 from "../../pages/Page404";
import StudentPrivateRoute from "./StudentPrivateRoute";

const routes = [
  {
    path: "/student/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
    if (route.children) {
      route.children = authMap(route.children);
    }
    return route;
  });

export default authMap(routes);

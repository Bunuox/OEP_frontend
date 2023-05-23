import React from "react";
import StudentPageTemplate from "../../pages/pageTemplate/StudentPageTemplate";
import StudentLoginPage from "../../pages/login/StudentLoginPage";
import RegisterPage from "../../pages/register/RegisterPage";
import Student from "../../pages/student";
import StudentExamsPage from "../../pages/student/Exams/StudentExamsPage";
import Page404 from "../../pages/Page404";
import StudentPrivateRoute from "./StudentPrivateRoute";
import InstructorLoginPage from "../../pages/login/InstructorLoginPage";
import InstructorPageTemplate from "../../pages/pageTemplate/InstructorPageTemplate";
import InstructorPrivateRoute from "./InstructorPrivateRoute";
import Instructor from "../../pages/instructor";
import Courses from "../../pages/instructor/Course/Courses";
import StudentCoursePage from "../../pages/student/Course/Courses";
import InstructorExams from "../../pages/instructor/Exams/Exams";
import InstructorExamDetails from "../../pages/instructor/Exams/ExamDetails";
import InstructorExamPageTemplate from "../../pages/pageTemplate/InstructorExamPageTemplate";
import StudentExamPageTemplate from "../../pages/pageTemplate/StudentExamPageTemplate";
import StudentExamDetails from "../../pages/student/Exams/ExamDetails";
import StudentFaceIdentificationPage from "../../pages/student/Exams/FaceIdentification/FaceIdentification";
import StudentExamResults from "../../pages/student/ExamResults";

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
    element: <InstructorPageTemplate />,
    instructorAuth: true,
    children: [
      {
        index: true,
        element: <Instructor />,
      },
      {
        path: "courses",
        element: <Courses />,
        instructorAuth: true,
      },
      {
        path: "exams",
        element: <InstructorExamPageTemplate />,
        instructorAuth: true,
        children: [
          {
            index: true,
            element: <InstructorExams />,
          },
          {
            path: ":id",
            element: <InstructorExamDetails />,
          },
        ],
      },
    ],
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
        path: "examResults",
        element: <StudentExamResults />,
        auth: true,
      },
      {
        path: "exams",
        element: <StudentExamPageTemplate />,
        auth: true,
        children: [
          {
            index: true,
            element: <StudentExamsPage />,
          },
          {
            path: ":id",
            element: <StudentExamDetails />,
          },
          {
            path: "faceIdentification/:id",
            element: <StudentFaceIdentificationPage />,
          },
        ],
      },
      {
        path: "courses",
        element: <StudentCoursePage />,
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
    if (route.instructorAuth) {
      route.element = (
        <InstructorPrivateRoute>{route.element}</InstructorPrivateRoute>
      );
    }
    if (route.children) {
      route.children = authMap(route.children);
    }
    return route;
  });

export default authMap(routes);

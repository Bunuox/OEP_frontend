import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentMainPage from "./pages/student/StudentMainPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import StudentExamsPage from "./pages/student/StudentExamsPage";
import StudentPageTemplate from "./pages/pageTemplate/StudentPageTemplate";
import Student from "./pages/student";
import Page404 from "./pages/Page404";

const App = () => {
  return (
    <Routes>
      <Route path="/student" element={<StudentPageTemplate />}>
        <Route index={true} element={<Student />} />
        <Route path="main" element={<StudentMainPage />} />
        <Route path="exams" element={<StudentExamsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Page404></Page404>} />
    </Routes>
  );
};

export default App;

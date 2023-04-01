import React from "react";
import Container from "react-bootstrap/esm/Container";
import StudentNavbar from "../../components/navbar/StudentNavbar";
import "./studentPageTemplate.css";
import { Outlet } from "react-router-dom";

function StudentPageTemplate({ children }) {
  return (
    <Container fluid>
      <StudentNavbar />
      <Container fluid id="bodyContainer">
        <Outlet />
      </Container>
    </Container>
  );
}

export default StudentPageTemplate;

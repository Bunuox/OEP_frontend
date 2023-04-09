import React from "react";
import Container from "react-bootstrap/esm/Container";
import "./studentPageTemplate.css";
import { Outlet } from "react-router-dom";
import InstructorNavbar from "../../components/navbar/InstructorNavbar";

function InstructorPageTemplate({ children }) {
  return (
    <Container fluid>
      <InstructorNavbar />
      <Container fluid id="bodyContainer">
        <Outlet />
      </Container>
    </Container>
  );
}

export default InstructorPageTemplate;

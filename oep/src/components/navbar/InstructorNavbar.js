import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import InstructorOffCanvas from "../offcanvas/InstructorOffcanvas"
import { InstructorContext } from "../context/AuthStudentContext";

function InstructorNavbar() {
  const { setInstructor } = useContext(InstructorContext);
  const handleLogout = () => {
    setInstructor(false);
  };

  return (
    <Navbar bg="dark" expand="xl">
      <Container>
        <Nav>
          <InstructorOffCanvas />
          <Nav></Nav>
        </Nav>
        <Nav className="justify-content-end">
          <Image width="50" roundedCircle="true" src="./img1.jpeg"></Image>
          <NavDropdown
            title="Bünyamin"
            id="basic-nav-dropdown"
            className="justify-content-end"
          >
            <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>
              Çıkış yap
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default InstructorNavbar;

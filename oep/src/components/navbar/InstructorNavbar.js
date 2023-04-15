import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import InstructorOffCanvas from "../offcanvas/InstructorOffcanvas";
import { InstructorContext } from "../context/AuthContext";
import "./navbar.css";

function InstructorNavbar() {
  const { setInstructor } = useContext(InstructorContext);
  const handleLogout = () => {
    setInstructor(false);
  };

  return (
    <Navbar className="NavBar" text={"white"}>
      <Container>
        <Nav>
          <InstructorOffCanvas />
        </Nav>
        <Nav className="justify-content-end">
          <Image width="50" roundedCircle="true" src="/img1.jpeg"></Image>
          <NavDropdown
            className="image-dropdown"
            title="Bünyamin"
            id="basic-nav-dropdown"
          >
            <p>Action</p>
            <p onClick={handleLogout}>Çıkış yap</p>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default InstructorNavbar;

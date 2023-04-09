import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import StudentOffcanvas from "../offcanvas/StudentOffcanvas";
import { Context } from "../context/AuthContext";

function StudentNavbar() {
  const { setUser } = useContext(Context);
  const handleLogout = () => {
    setUser(false);
  };

  return (
    <Navbar bg="light" expand="xl">
      <Container>
        <Nav>
          <StudentOffcanvas />
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

export default StudentNavbar;

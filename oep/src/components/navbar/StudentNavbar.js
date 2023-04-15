import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import StudentOffcanvas from "../offcanvas/StudentOffcanvas";
import { Context } from "../context/AuthContext";
import "./navbar.css";

function StudentNavbar() {
  const { user, setUser } = useContext(Context);
  const handleLogout = () => {
    setUser(false);
  };

  return (
    <Navbar className="studentNavBar" expand="xl">
      <Container>
        <Nav>
          <StudentOffcanvas />
        </Nav>
        <Nav className="justify-content-end">
          <Image width="50" roundedCircle="true" src="/img1.jpeg"></Image>
          <NavDropdown
            title={user.firstName}
            id="basic-nav-dropdown"
            className="justify-content-end"
          >
            <p className="nav-p">Action</p>
            <p className="nav-p" onClick={handleLogout}>
              Çıkış Yap
            </p>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default StudentNavbar;

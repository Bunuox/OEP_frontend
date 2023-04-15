import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";

function StudentOffcanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="outline-light" onClick={handleShow}>
        Menü
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menü</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup.Item className="offcanvasItem-secondary">
            <a href="/student">Anasayfa</a>
          </ListGroup.Item>
          <ListGroup.Item className="offcanvasItem-secondary">
            <a href="/student/courses">Derslerim</a>
          </ListGroup.Item>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default StudentOffcanvas;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import "./offcanvas.css";

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
          <ListGroup.Item className="offcanvasItem">
            <a href="/instructor">Anasayfa</a>
          </ListGroup.Item>
          <ListGroup.Item className="offcanvasItem">
            <a href="/instructor/courses">Derslerim</a>
          </ListGroup.Item>
          <ListGroup.Item className="offcanvasItem">
            <a href="/instructor/exams">Sınavlarım</a>
          </ListGroup.Item>
          <ListGroup.Item className="offcanvasItem">
            <a href="/instructor/exams">Sınav Sonuçları</a>
          </ListGroup.Item>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default StudentOffcanvas;

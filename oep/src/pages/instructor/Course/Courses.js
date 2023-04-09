import React, { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./courses.css";
import CourseCard from "./CourseCard";

function Courses() {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveHandle = async (e) => {
    e.preventDefault();
    console.log(description);
    try {
      let res = await fetch("http://localhost:8081/course/createCourse", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          description: description,
        }),
      });
      if (res.status === 200) {
        console.log("başarılı");
        handleClose();
        setShowAlert(true);
      } else {
        console.log("başarısız");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <CourseCard
        courseTitle="Title"
        courseId="4"
        courseDescription="Özel bir ders"
      ></CourseCard>
      <Button variant="primary" onClick={handleShow}>
        Ders aç
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ders aç</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="creaCourseForm">
              <Form.Label className="form-label">Ders adı</Form.Label>
              <Form.Control
                rows={6}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveHandle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Alert show={showAlert} variant="success" class="alert">
        <Alert.Heading class="alert-heading">Başarılı</Alert.Heading>
        <p>Ders başarıyla açıldı.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)} variant="outline-success">
            Kapat
          </Button>
        </div>
      </Alert>
    </Container>
  );
}

export default Courses;

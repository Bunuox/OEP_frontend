import React, { useContext, useState, useEffect } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./courses.css";
import CourseCard from "./CourseCard";
import { InstructorContext } from "../../../components/context/AuthContext";

function Courses() {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { instructor } = useContext(InstructorContext);
  const [courses, setCourses] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function fetchTeach() {
    let res = await fetch(
      "http://localhost:8081/instructor/instructorCourses",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          instructorId: instructor.instructorId,
        }),
      }
    );
    let resJson = await res.json();
    if (res.status === 200) {
      console.log(resJson);
      setCourses(resJson);
    }
  }

  useEffect(() => {
    fetchTeach();
  }, []);

  const saveHandle = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8081/course/createCourse", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          courseName: courseName,
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Course tablosuna başarıyla kayıt eklendi.");
        handleClose();
        setShowAlert(true);

        //Create Teach for course and instructor
        let res2 = await fetch("http://localhost:8081/teach/createTeach", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            instructorId: instructor.instructorId,
            courseId: resJson.courseId,
          }),
        });

        if (res2.status === 200) {
          console.log("Teach tablosuna başarıyla kayıt eklendi.");
          window.location.reload(false);
        } else {
          console.log("Teach tablosuna ekleme yaparken hata ile karşılaşıldı.");
        }
      } else {
        console.log("Course tablosuna ekleme yaparken hata ile karşılaşıldı.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      {courses && <CourseCard courses={courses} />}
      <Button style={{ backgroundColor: "#507cff" }} onClick={handleShow}>
        Ders aç
      </Button>

      <Modal show={show} onHide={handleClose} size="xs">
        <Modal.Header closeButton>
          <Modal.Title>Ders aç</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="createCourse.courseName">
              <Form.Label className="form-label">Ders adı</Form.Label>
              <Form.Control
                type="text"
                rows={3}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="createCourse.courseDescription"
            >
              <Form.Label className="form-label">Dersin Açıklaması</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={100}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button style={{ backgroundColor: "#507cff" }} onClick={saveHandle}>
            Dersi Oluştur
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

import React, { useContext, useState, useEffect } from "react";
import {
  Alert,
  Button,
  Container,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import StudentCourseCard from "./StudentCourseCard";
import { Context } from "../../../components/context/AuthContext";
import StudentCourseTable from "./StudentCourseTable";

function StudentCoursePage() {
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [courses, setCourses] = useState([]);
  const [foundCourse, setFoundCourse] = useState();
  const { user } = useContext(Context);

  const handleClose = () => {
    setShow(false);
    setFoundCourse();
  };
  const handleShow = () => setShow(true);

  async function fetchTeach() {
    let res = await fetch("http://localhost:8081/student/studentCourses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        studentId: user.studentId,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      setCourses(resJson);
    }
  }

  useEffect(() => {
    fetchTeach();
  }, []);

  const findCourse = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8081/course/findCourse", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseId,
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        setFoundCourse(resJson);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const takeCourse = async (e) => {
    try {
      let res = await fetch("http://localhost:8081/take/createTake", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          courseId: foundCourse.courseId,
          studentId: user.studentId,
        }),
      });

      if (res.status === 200) {
        setShowPopup(false);
        setShow(false);
        setShowAlert(true);
        window.location.reload(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      {courses && <StudentCourseCard courses={courses} />}
      <Button
        style={{ backgroundColor: "#ff4e46", border: "none" }}
        onClick={handleShow}
      >
        Ders seç
      </Button>

      <Modal show={show} onHide={handleClose} size="xs">
        <Modal.Header closeButton>
          <Modal.Title>Ders seç</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="createCourse.courseId">
              <Form.Label className="form-label">Ders ID</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Ders ID"
                  onChange={(e) => setCourseId(e.target.value)}
                />
                <Button
                  variant="outline-danger"
                  id="button-addon2"
                  onClick={findCourse}
                >
                  Dersi ara
                </Button>
              </InputGroup>
            </Form.Group>
            <FormGroup>
              {foundCourse && <StudentCourseTable foundCourse={foundCourse} />}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button
            style={{ backgroundColor: "#ff4e46", border: "none" }}
            {...(foundCourse && {
              onClick: () => {
                setShowPopup(true);
              },
            })}
          >
            Dersi Seç
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Body>
          {foundCourse && (
            <p>
              "ID: {foundCourse.courseId}" "{foundCourse.courseName}" kursunu
              almak istiyor musun?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowPopup(false);
            }}
          >
            Kapat
          </Button>
          <Button
            variant="outline-success"
            onClick={() => {
              takeCourse();
            }}
          >
            Onayla
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert show={showAlert} variant="success" class="alert">
        <Alert.Heading class="alert-heading">Başarılı</Alert.Heading>
        <p>Ders başarıyla alındı.</p>
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

export default StudentCoursePage;

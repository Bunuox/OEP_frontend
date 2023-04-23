import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Container,
  FormGroup,
  InputGroup,
  Alert,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import StudentCourseCard from "./StudentCourseCard";
import { Context } from "../../../components/context/AuthContext";
import StudentCourseTable from "./StudentCourseTable";
import CustomAlert from "../../../components/alert/CustomAlert";

function StudentCoursePage() {
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeading, setAlertHeading] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const [courseId, setCourseId] = useState("");
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
      setAlertHeading("Hata");
      setAlertMessage("Kurs aranırken bir hatayla karşılaşıldı.");
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
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
        setAlertHeading("success");
        setAlertMessage("ders başarıyla alındı");
        setAlertVariant("success");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        !showAlert && window.location.reload(false);
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
      <div>
        {showAlert && (
          <CustomAlert
            heading={alertHeading}
            message={alertMessage}
            variant={alertVariant}
          />
        )}
      </div>
    </Container>
  );
}

export default StudentCoursePage;
